const User = require("../../models/User");

const day1Bands = async (req, res) => {
  try {
    let { token } = req.params;
    console.log(token);
    if (token.length >= 20) {
      let user = await User.exists(
        { token: token, delegateCards: "624b37324fda25e0e4990ed2" },
        { password: 0, passwordResetToken: 0, token: 0 }
      ).populate("role delegateCards");
      if (!user)
        return res.status(200).send({
          success: false,
          msg: "User not found or proshow pass not purchased",
        });
      const alreadyRedeemed = await User.exists({
        token: token,
        delegateCards: "624b37324fda25e0e4990ed2",
        day1: true,
      });
      if (alreadyRedeemed)
        return res.send({ success: true, data: {}, msg: "Already Reedemed" });
      user = await User.findOneAndUpdate(
        {
          token: token,
          delegateCards: "624b37324fda25e0e4990ed2",
        },
        { $set: { day1: true } },
        { new: true }
      );
      return res.send({ success: true, data: user });
    } else {
      console.log("vig token");
      console.log(token);
      let userID = "",
        userToken = "",
        flag = 0;
      for (let i = 0; i < token.length; i++) {
        if (flag == 0 && token[i] == "_") {
          flag = 1;
          continue;
        }
        if (flag == 1) userToken = userToken + token[i];
        else userID = userID + token[i];
      }
      console.log("user", userID);
      console.log("token", userToken);
      userID = Number(userID);
      let user = await User.exists({
        userID: userID,
        delegateCards: "624b37324fda25e0e4990ed2",
      });
      if (!user)
        return res.status(200).send({
          msg: "User not found or proshow pass not purchased",
          success: false,
        });
      if (user.token.slice(-10) != userToken)
        return res.status(400).send({ success: false, msg: "Invalid QR Code" });
      const alreadyRedeemed = await User.exists({
        token: token,
        delegateCards: "624b37324fda25e0e4990ed2",
        day1: true,
      });
      if (alreadyRedeemed)
        return res.send({ success: true, data: {}, msg: "Already Reedemed" });
      user = await User.findOneAndUpdate(
        {
          userID: userID,
          delegateCards: "624b37324fda25e0e4990ed2",
        },
        { $set: { day1: true } },
        { new: true }
      );
      return res.status(200).send({ success: true, data: user });
    }
  } catch (err) {
    console.log(err.toString());
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

const day2Bands = async (req, res) => {
  try {
    let { token } = req.params;
    console.log(token);
    if (token.length >= 20) {
      let user = await User.findOne(
        { token: token, delegateCards: "624b37324fda25e0e4990ed2" },
        { password: 0, passwordResetToken: 0, token: 0 }
      ).populate("role delegateCards");
      if (!user)
        return res.status(200).send({
          success: false,
          msg: "User not found or proshow pass not purchased",
        });
      const alreadyRedeemed = await User.exists({
        token: token,
        delegateCards: "624b37324fda25e0e4990ed2",
        day1: true,
      });
      if (alreadyRedeemed)
        return res.send({ success: true, data: {}, msg: "Already Reedemed" });
      return res.send({ success: true, data: user });
    } else {
      console.log("vig token");
      console.log(token);
      let userID = "",
        userToken = "",
        flag = 0;
      for (let i = 0; i < token.length; i++) {
        if (flag == 0 && token[i] == "_") {
          flag = 1;
          continue;
        }
        if (flag == 1) userToken = userToken + token[i];
        else userID = userID + token[i];
      }
      console.log("user", userID);
      console.log("token", userToken);
      userID = Number(userID);
      let user = await User.findOne(
        { userID: userID, delegateCards: "624b37324fda25e0e4990ed2" },
        { password: 0, passwordResetToken: 0 }
      ).populate("role delegateCards");
      if (!user)
        return res.status(200).send({
          msg: "User not found or proshow pass not purchased",
          success: false,
        });
      if (user.token.slice(-10) != userToken)
        return res.status(400).send({ success: false, msg: "Invalid QR Code" });
      const alreadyRedeemed = await User.exists({
        userID: userID,
        delegateCards: "624b37324fda25e0e4990ed2",
        day1: true,
      });
      if (alreadyRedeemed)
        return res.send({ success: true, data: {}, msg: "Already Reedemed" });
      return res.status(200).send({ success: true, data: user });
    }
  } catch (err) {
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { day1Bands, day2Bands };
