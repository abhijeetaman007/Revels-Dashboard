const AWS = require("aws-sdk");
const sendEmailNotif = async (email, mailSubject, body) => {
  try {
    const ses = new AWS.SES({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.REGION,
    });
    const sesParams = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data: body,
          },
          Text: {
            Charset: "UTF-8",
            Data: mailSubject,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: mailSubject,
        },
      },
      Source: '"System Admin" <sysadmin@revelsmit.in>',
      ReplyToAddresses: ["sysadrevels22@gmail.com"],
    };
    const notify = await ses.sendEmail(sesParams).promise();
    console.log(email);
    return {
      success: true,
      message: notify,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

module.exports = {
  sendEmailNotif: sendEmailNotif,
};
