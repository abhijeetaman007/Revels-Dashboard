// const Tshirt = require("../../models/Tshirt");
// const User = require("../../models/User");

// const buyTshirtAtom = async (req, res) => {
//   try {
//     const {
//       xs,
//       s,
//       m,
//       l,
//       xl,
//       xxl,
//       xxxl,
//       userID,
//       clientcode,
//       name,
//       email,
//       phone,
//       ru,
//       login,
//       pass,
//       ttype,
//       prodid,
//       txncur,
//     } = req.body;

//     const tshirt = await Tshirt.findOne({ userID }, { tshirt: 1 });
//     let amt = xs + s + m + l + xl + xxl + xxxl;

//     let ids = await Transaction.find({}, { orderId: 1, _id: 0 })
//       .sort({ orderId: -1 })
//       .limit(1);
//     let orderId = 10001;
//     if (ids[0]) {
//       orderId = ids[0].orderId + 1;
//     }

//     let transid = orderId;

//     var cc = clientcode;
//     var final = new Buffer(cc).toString("base64");
//     var url = ru == "" ? null : ru;
//     var udf1 = name == "" ? null : name;
//     var udf2 = email == "" ? null : email;
//     var udf3 = phone == "" ? null : phone;
//     var udf4 = xs == "" ? null : xs;
//     var udf5 = s == "" ? null : s;
//     var udf6 = m == "" ? null : m;
//     var udf7 = l == "" ? null : l;
//     var udf8 = xl == "" ? null : xl;
//     var udf9 = xxl == "" ? null : xsl;
//     var udf10 = xxxl == "" ? null : xsxl;
//     var key = process.env.key;
//     var req_enc_key = process.env.req_enc_key;
//     var req_salt = process.env.req_salt;
//     // var key = "KEY123657234";
//     // var req_enc_key = "8E41C78439831010F81F61C344B7BFC7";
//     // var req_salt = "8E41C78439831010F81F61C344B7BFC7";
//     var sign = login + pass + ttype + prodid + transid + amt + txncur;

//     function sig(sign, key) {
//       return crypto
//         .createHmac("sha512", key)
//         .update(new Buffer(sign, "utf-8"))
//         .digest("hex");
//     }
//     var signature = sig(sign, key);

//     var text =
//       "login=" +
//       data.login +
//       "&pass=" +
//       data.pass +
//       "&ttype=" +
//       data.ttype +
//       "&prodid=" +
//       data.prodid +
//       "&amt=" +
//       data.amt +
//       "&txncurr=" +
//       data.txncur +
//       "&txnscamt=" +
//       data.txnamt +
//       "&clientcode=" +
//       encodeURIComponent(final) +
//       "&txnid=" +
//       data.transid +
//       "&date=" +
//       data.datepick +
//       "&custacc=" +
//       data.custacc +
//       "&udf1=" +
//       udf1 +
//       "&udf2=" +
//       udf2 +
//       "&udf3=" +
//       udf3 +
//       "&udf4=" +
//       udf4 +
//       "&udf5=" +
//       udf5 +
//       "&udf6=" +
//       udf6 +
//       "&udf7=" +
//       udf7 +
//       "&udf8=" +
//       udf8 +
//       "&udf9=" +
//       udf9 +
//       "&udf10=" +
//       udf10 +
//       "&ru=" +
//       url +
//       "&signature=" +
//       signature +
//       "";

//     const algorithm = "aes-256-cbc";
//     const password = Buffer.from(req_enc_key, "utf8");
//     const salt = Buffer.from(req_salt, "utf8");
//     const iv = Buffer.from(
//       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
//       "utf8"
//     );

//     const encrypt = (text) => {
//       var derivedKey = crypto.pbkdf2Sync(password, salt, 65536, 32, "sha1");
//       const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);
//       let encrypted = cipher.update(text);
//       encrypted = Buffer.concat([encrypted, cipher.final()]);
//       return `${encrypted.toString("hex")}`;
//     };

//     var encdata = encrypt(text);

//     var options = {
//       host: "https://payment.atomtech.in",
//       path: "/paynetz/epi/fts?login=" + data.login + "&encdata=" + encdata + "",
//     };
//     url = options["host"] + options["path"];
//     resp.json({ url: url });
//   } catch (err) {
//     console.log(err);
//     return res.send({ success: false, msg: "Internal Server Error" });
//   }
// };

// const buyTshirtResponse = async (req, res) => {
//   try {
//     var udf4 = xs == "" ? null : xs;
//     var udf5 = s == "" ? null : s;
//     var udf6 = m == "" ? null : m;
//     var udf7 = l == "" ? null : l;
//     var udf8 = xl == "" ? null : xl;
//     var udf9 = xxl == "" ? null : xsl;
//     var udf10 = xxxl == "" ? null : xsxl;
//     const { xs, s, m, l, xl, xxl, xxxl, userID } = req.body;
//     const tshirt = await Tshirt.findOne({ userID }, { tshirt: 1 });
//     tshirt.sale.xs.pending = tshirt.sale.xs.pending + xs;
//     tshirt.sale.s.pending = tshirt.sale.s.pending + s;
//     tshirt.sale.m.pending = tshirt.sale.m.pending + m;
//     tshirt.sale.l.pending = tshirt.sale.l.pending + l;
//     tshirt.sale.xl.pending = tshirt.sale.xl.pending + xl;
//     tshirt.sale.xxl.pending = tshirt.sale.xxl.pending + xxl;
//     tshirt.sale.xsxl.pending = tshirt.sale.xsxl.pending + xxsl;

//     const newTshirt = await Tshirt.findOneAndUpdate(
//       { userID },
//       { $set: { sale: tshirt.sale } }
//     );
//     return res.send({
//       success: false,
//       msg: "Tshirt Purchased Successfully",
//       data: newTshirt,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.send({ success: false, msg: "Internal Server Error" });
//   }
// };

// const sellTshirt = async (req, res) => {
//   try {
//     const { small, medium, large, userID } = req.body;
//     const oldUser = await User.findOne({ userID }, { tshirt: 1 });
//     if (small) oldUser.tshirt.small = oldUser.tshirt.small + small;
//     if (medium) oldUser.tshirt.medium = oldUser.tshirt.medium + medium;
//     if (large) oldUser.tshirt.large = oldUser.tshirt.large + large;

//     const user = await User.findOneAndUpdate(
//       { userID },
//       { $set: { tshirt: oldUser.tshirt } }
//     );
//     return res.send({
//       success: false,
//       msg: "Tshirt Purchased Successfully",
//       data: user,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.send({ success: false, msg: "Internal Server Error" });
//   }
// };

// module.exports = { buyTshirt, sellTshirt };
