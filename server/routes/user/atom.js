var crypto = require("crypto");
const DelegateCard = require("../../models/DelegateCard");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const tshirts = [
  "62589320a24c0a3bf6e756f3",
  "62589369a24c0a3bf6e756f7",
  "62589372a24c0a3bf6e756fb",
  "6258937aa24c0a3bf6e756ff",
  "625893c6a24c0a3bf6e75704",
  "625893cfa24c0a3bf6e75708",
  "625893d7a24c0a3bf6e7570c",
];
const requestAtom = async (req, resp) => {
  try {
    if (tshirts.includes(data.udf4)) {
      const tshirt = await DelegateCard.findOne({ _id: data.udf4 });
      if (tshirt.maxCount < 1)
        return resp.status(200).send({ success: false, msg: "Sold Out" });
    }
    var data = req.body;
    let ids = await Transaction.find({}, { orderId: 1, _id: 0 })
      .sort({ orderId: -1 })
      .limit(1);
    let orderId = 10001;
    if (ids[0]) {
      orderId = ids[0].orderId + 1;
    }

    data.transid = orderId;

    console.log(data);
    var cc = req.body.clientcode;
    var final = new Buffer(cc).toString("base64");
    var url = data.ru == "" ? null : data.ru;
    var udf1 = data.udf1 == "" ? null : data.udf1;
    var udf2 = data.udf2 == "" ? null : data.udf2;
    var udf3 = data.udf3 == "" ? null : data.udf3;
    var udf4 = data.udf4 == "" ? null : data.udf4;
    var udf5 = data.udf5 == "" ? null : data.udf5;
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
      "&udf5=" +
      udf5 +
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
    const tshirts = [];
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

    // console.log("Response");
    // console.log(data);
    // // resp.json(data);

    let newTransaction = new Transaction({
      user: data.udf5,
      delegateCard: data.udf4,
      name: "atom_" + data.mmp_txn.toString(),
      transactionData: data,
      orderId: parseInt(data.mer_txn),
      amount: data.amt,
      isPaymentConfirmed: data.f_code == "Ok" ? true : false,
    });
    await newTransaction.save();
    if (data.f_code == "Ok" || data.amt == "0.00") {
      if (data.udf4 != "62526614385b39119957225a") {
        await User.updateOne(
          { email: data.udf2 },
          {
            $pull: { pendingDelegateCards: data.udf4 },
          }
        );
        let user = await User.findOneAndUpdate(
          { email: data.udf2 },
          {
            $addToSet: { delegateCards: data.udf4 },
          }
        );
        console.log(user);
      } else {
        await User.updateOne(
          { email: data.udf2 },
          {
            $pull: {
              pendingDelegateCards: data.udf4,
              delegateCards: "624603fe950a69cc464ff72c",
            },
          }
        );
        let user = await User.findOneAndUpdate(
          { email: data.udf2 },
          {
            $addToSet: { delegateCards: "62460435950a69cc464ff730" },
          }
        );
        console.log(user);
      }
    }
    if (data.f_code == "Ok" || data.amt == "0.00") {
      if (tshirts.includes(data.udf4)) {
        const tshirt = await DelegateCard.findOne({ _id: data.udf4 });
        await DelegateCard.updateOne(
          { _id: data.udf4 },
          { $set: { maxCount: tshirt.maxCount - 1 } }
        );
      }
      return resp.redirect("http://revelsmit.in/success");
    }
    if (data.f_code == "F") return resp.redirect("https://revelsmit.in/failed");
    if (data.f_code == "C")
      return resp.redirect("https://revelsmit.in/cancelled");
    else return resp.redirect("https://revelsmit.in/dashboard/delegatecard");
  } catch (error) {
    return resp.status(500).send({ success: false, msg: error.toString() });
  }
};

const requestAtomFaculty = async (req, resp) => {
  try {
    console.log(req.body);
    const { amt, name, email, mobileNumber } = req.body;
    const data = {
      login: "332432",
      pass: "d59be440",
      ttype: "NBFundTransfer",
      prodid: "REVEL",
      amt: amt.toString() + ".00",
      txncur: "INR",
      txnamt: amt.toString() + ".00",
      clientcode: "Akash",
      datepick: Date.now(),
      custacc: "100000036600",
      udf1: name,
      udf2: email,
      udf3: mobileNumber,
      udf4: "624b37324fda25e0e4990ed2",
      ru: "https://revelsmit.in/api/Response/faculty",
      delegateCardID: "624b37324fda25e0e4990ed2",
    };
    let ids = await Transaction.find({}, { orderId: 1, _id: 0 })
      .sort({ orderId: -1 })
      .limit(1);
    let orderId = 10001;
    if (ids[0]) {
      orderId = ids[0].orderId + 1;
    }

    data.transid = orderId;

    console.log(data);
    var cc = data.clientcode;
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
    url = options["host"] + options["path"];
    resp.redirect(url);
  } catch (error) {
    console.log(error);
    return resp
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const responseAtomFaculty = async (req, res) => {
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

    // console.log("Response");
    // console.log(data);
    // // resp.json(data);

    let newTransaction = new Transaction({
      user: null,
      delegateCard: data.udf4,
      name: "faculty_atom_" + data.mmp_txn.toString(),
      transactionData: data,
      orderId: parseInt(data.mer_txn),
      amount: data.amt,
      isPaymentConfirmed: data.f_code == "Ok" ? true : false,
    });
    await newTransaction.save();
    if (data.f_code == "Ok" || data.amt == "0.00") {
      return res.json({ success: true, msg: "Success", data: data });
    }
    if (data.f_code == "F") {
      return res.json({ success: false, message: "Failed", data: data });
    }
    if (data.f_code == "C") {
      return res.json({ success: false, msg: "Cancelled", data: data });
    }
    // if (data.f_code == "Ok" || data.amt == "0.00") {
    //   if (data.udf4 != "62526614385b39119957225a") {
    //     await User.updateOne(
    //       { email: data.udf2 },
    //       {
    //         $pull: { pendingDelegateCards: data.udf4 },
    //       }
    //     );
    //     let user = await User.findOneAndUpdate(
    //       { email: data.udf2 },
    //       {
    //         $addToSet: { delegateCards: data.udf4 },
    //       }
    //     );
    //     console.log(user);
    //   } else {
    //     await User.updateOne(
    //       { email: data.udf2 },
    //       {
    //         $pull: {
    //           pendingDelegateCards: data.udf4,
    //           delegateCards: "624603fe950a69cc464ff72c",
    //         },
    //       }
    //     );
    //     let user = await User.findOneAndUpdate(
    //       { email: data.udf2 },
    //       {
    //         $addToSet: { delegateCards: "62460435950a69cc464ff730" },
    //       }
    //     );
    //     console.log(user);
    //   }
    // }
    // if (data.f_code == "Ok" || data.amt == "0.00")
    //   return resp.redirect("http://revelsmit.in/success");
    // if (data.f_code == "F") return resp.redirect("https://revelsmit.in/failed");
    // if (data.f_code == "C")
    //   return resp.redirect("https://revelsmit.in/cancelled");
    // else return resp.redirect("https://revelsmit.in/dashboard/delegatecard");
  } catch (error) {
    return resp.status(500).send({ success: false, msg: error.toString() });
  }
};

module.exports = {
  requestAtom,
  responseAtom,
  responseAtomFaculty,
  requestAtomFaculty,
};
