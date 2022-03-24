const AWS = require("aws-sdk");
const sendEmailNotif = async (email, mailSubject, body, textBody) => {
  try {
    const ses = new AWS.SES({
      accessKeyId: process.env.AWS_ACCESS_KEY_1,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_1,
      region: process.env.REGION_1,
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
            Data: textBody,
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
const sendENotif = async (email, mailSubject, textBody) => {
  try {
    const ses = new AWS.SES({
      accessKeyId: process.env.AWS_ACCESS_KEY_1,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_1,
      region: process.env.REGION_1,
    });
    const sesParams = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: textBody,
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
  sendENotif: sendENotif,
};
