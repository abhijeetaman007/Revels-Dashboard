var crypto = require("crypto");
const User = require("../../models/User");

const requestAtom = (req, resp) => {
  try {
    var data = req.body;
    console.log(data);
    var cc = req.body.clientcode;
    var final = new Buffer(cc).toString("base64");
    var url = data.ru == "" ? null : data.ru;
    var udf1 = data.udf1 == "" ? null : data.udf1;
    var udf2 = data.udf2 == "" ? null : data.udf2;
    var udf3 = data.udf3 == "" ? null : data.udf3;
    var udf4 = data.udf4 == "" ? null : data.udf4;
    var key = process.env.key;
    var req_enc_key = process.env.req_enc_key;
    var req_salt = process.env.req_salt;
    // var key = "KEY123657234";
    // var req_enc_key = "8E41C78439831010F81F61C344B7BFC7";
    // var req_salt = "8E41C78439831010F81F61C344B7BFC7";
    var sign =
      data.login +
      data.pass +
      data.ttype +
      data.prodid +
      data.transid +
      data.amt +
      data.txncur;

    function sig(sign, key) {
      return crypto
        .createHmac("sha512", key)
        .update(new Buffer(sign, "utf-8"))
        .digest("hex");
    }
    var signature = sig(sign, key);

    var text =
      "login=" +
      data.login +
      "&pass=" +
      data.pass +
      "&ttype=" +
      data.ttype +
      "&prodid=" +
      data.prodid +
      "&amt=" +
      data.amt +
      "&txncurr=" +
      data.txncur +
      "&txnscamt=" +
      data.txnamt +
      "&clientcode=" +
      encodeURIComponent(final) +
      "&txnid=" +
      data.transid +
      "&date=" +
      data.datepick +
      "&custacc=" +
      data.custacc +
      "&udf1=" +
      udf1 +
      "&udf2=" +
      udf2 +
      "&udf3=" +
      udf3 +
      "&udf4=" +
      udf4 +
      "&ru=" +
      url +
      "&signature=" +
      signature +
      "";

    const algorithm = "aes-256-cbc";
    const password = Buffer.from(req_enc_key, "utf8");
    const salt = Buffer.from(req_salt, "utf8");
    const iv = Buffer.from(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "utf8"
    );

    const encrypt = (text) => {
      var derivedKey = crypto.pbkdf2Sync(password, salt, 65536, 32, "sha1");
      const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return `${encrypted.toString("hex")}`;
    };

    var encdata = encrypt(text);

    var options = {
      host: "https://payment.atomtech.in",
      path: "/paynetz/epi/fts?login=" + data.login + "&encdata=" + encdata + "",
    };
    console.log(options["host"] + "/paynetz/epi/fts?" + text);
    url = options["host"] + options["path"];
    resp.json({ url: url });
  } catch (error) {
    console.log(error);
    return resp
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const responseAtom = async (req, resp) => {
  try {
    var res_enc_key = process.env.res_enc_key;
    var res_salt = process.env.res_salt;
    // var res_enc_key = "8E41C78439831010F81F61C344B7BFC7";
    // var res_salt = "8E41C78439831010F81F61C344B7BFC7";
    const algorithm = "aes-256-cbc";
    const password = Buffer.from(res_enc_key, "utf8");
    const salt = Buffer.from(res_salt, "utf8");
    const iv = Buffer.from(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "utf8"
    );
    const decrypt = (text) => {
      const encryptedText = Buffer.from(text, "hex");
      var derivedKey = crypto.pbkdf2Sync(password, salt, 65536, 32, "sha1");
      const decipher = crypto.createDecipheriv(algorithm, derivedKey, iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    };
    var decrypted_data = decrypt(req.body.encdata);
    var arr = decrypted_data.split("&").map(function (val) {
      return val;
    });
    var data = {};
    for (var i = 0; i < arr.length; i++) {
      var val = arr[i].split("=");
      data[val[0]] = val[1];
    }

    console.log("Response");
    console.log(data);
    // resp.json(data);
    if (data.desc == "SUCCESS" || data.amt == "0.00") {
      await User.updateOne(
        { email: data.udf2 },
        {
          $pull: { delegateCards: data.udf4 },
        }
      );
      let user = await User.findOneAndUpdate(
        { email: data.udf2 },
        {
          $addToSet: { delegateCards: data.udf4 },
        }
      );
      console.log(user);
    }
    if (data.desc == "SUCCESS" || data.amt == "0.00")
      return resp.redirect("https://revelsmit.in/dashboard/delegatecard/");
    if (data.desc == "FAILED")
      return resp.redirect("https://revelsmit.in/dashboard/delegatecard/");
    if (data.desc == "TRANSACTION IS CANCELLED BY USER ON PAYMENT PAGE.")
      return resp.redirect("https://revelsmit.in/dashboard/delegatecard/");
    else return resp.redirect("https://revelsmit.in/dashboard/delegatecard");
  } catch (error) {
    return resp.status(500).send({ success: false, msg: error.toString() });
  }
};

module.exports = { requestAtom, responseAtom };
