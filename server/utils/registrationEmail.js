const constructTemplate = (name, status, body) => {
  var message = `<html>

  <head>
      <style>
          .banner-color {
              background-color: #6B778D;
              ;
          }
  
          .title-color {
              color: #00A8CC;
              ;
          }
  
          @media screen and (min-width: 500px) {
              .banner-color {
                  background-color: #6B778D;
                  ;
              }
  
              .title-color {
                  color: #00A8CC;
                  ;
              }
          }
      </style>
  </head>
  
  <body>
      <div style="background-color:#ececec;padding:10px;margin:0 auto;font-weight:200;width:100%!important">
          <table align="center" border="0" cellspacing="0" cellpadding="0"
              style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
              <tbody>
                  <tr>
                      <td align="center">
                          <center style="width:100%">
                              <table bgcolor="#1a1a1a" border="0" cellspacing="0" cellpadding="0"
                                  style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif"
                                  width="512">
                                  <tbody>
                                      <tr>
                                          <td bgcolor="#F3F3F3" width="100%"
                                              style="background-color:#1a1a1a;padding:12px;border-bottom:0px solid #46B5D1">
                                              <table border="0" cellspacing="0" cellpadding="0"
                                                  style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important"
                                                  width="100%">
                                                  <tbody>
                                                      <tr>
                                                          <td align="left" valign="middle" width="50%"><span
                                                                  style="font-weight: bold;margin:0;color:#00A8CC;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">REVELS'22</span>
                                                          </td>
                                                          <td valign="middle" width="50%" align="right"
                                                              style="padding:0 0 0 10px"><span
                                                                  style="margin:0;color:#fff;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px"
                                                                  id="date">${Date()
                                                                    .toString()
                                                                    .substring(
                                                                      0,
                                                                      24
                                                                    )}</span>
                                                          </td>
                                                          <td width="1">&nbsp;</td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="left">
                                              <table border="0" cellspacing="0" cellpadding="0"
                                                  style="font-weight:200;font-family:Helvetica,Arial,sans-serif"
                                                  width="100%">
                                                  <tbody>
                                                      <tr>
                                                          <td width="100%">
                                                              <table border="0" cellspacing="0" cellpadding="0"
                                                                  style="font-weight:200;font-family:Helvetica,Arial,sans-serif"
                                                                  width="100%">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td align="center" bgcolor="#8BC34A"
                                                                              style="padding:20px 48px;color:#ffffff"
                                                                              class="banner-color">
                                                                              <table border="0" cellspacing="0"
                                                                                  cellpadding="0"
                                                                                  style="font-weight:200;font-family:Helvetica,Arial,sans-serif"
                                                                                  width="100%">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td align="center" width="100%">
                                                                                              <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;font-family:Helvetica,Arial,sans-serif"
                                                                                                  ;line-height:24px">
                                                                                                  ${status}
                                                                                              </h1>
                                                                                          </td>
                                                                                      </tr>
                                                                                  </tbody>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td align="center"
                                                                              style="padding:20px 0 10px 0">
                                                                              <table border="0" cellspacing="0"
                                                                                  cellpadding="0"
                                                                                  style="font-weight:200;font-family:Helvetica,Arial,sans-serif"
                                                                                  width="100%">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td align="center" width="100%"
                                                                                              style="padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;">
                                                                                              <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;"
                                                                                                  class="title-color">Hi
                                                                                                  ${name},</h3>
                                                                                              <p
                                                                                                  style="margin: 20px 0 30px 0;font-size: 15px;text-align: center;color: #fff;">
                                                                                                  ${body}
                                                                                              </p>
                                                                                              <div
                                                                                                  style="font-weight: 200; text-align: center; margin: 25px;">
                                                                                                  <a style="padding:0.6em 1em;border-radius:600px;color:#ffffff;font-size:14px;text-decoration:none;font-weight:bold"
                                                                                                      href="https://www.instagram.com/revelsmit/"
                                                                                                      class="button-color"><img
                                                                                                          style="width:30px; height:30px;"
                                                                                                          src="https://www.edigitalagency.com.au/wp-content/uploads/new-instagram-logo-white-border-icon-png-large.png"></a><a
                                                                                                      style="padding:0.6em 1em;border-radius:600px;color:#ffffff;font-size:14px;text-decoration:none;font-weight:bold"
                                                                                                      href="https://twitter.com/revelsmit"
                                                                                                      class="button-color"><img
                                                                                                          style="width:30px; height:30px;"
                                                                                                          src="https://www.iconsdb.com/icons/preview/white/twitter-xxl.png"></a>
                                                                                              </div>
                                                                                              <br>
  
                                                                                          </td>
                                                                                      </tr>
                                                                                  </tbody>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                      </tr>
                                                                      <tr>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="left">
                                              <table bgcolor="#1a1a1a" border="0" cellspacing="0" cellpadding="0"
                                                  style="padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif"
                                                  width="100%">
                                                  <tbody>
                                                      <tr>
                                                          <td align="center" width="100%">
                                                              <table border="0" cellspacing="0" cellpadding="0"
                                                                  style="font-weight:200;font-family:Helvetica,Arial,sans-serif"
                                                                  width="100%">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td align="center" valign="middle" width="100%"
                                                                              style="border-top:1px solid #00A8CC;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px">
                                                                              <img style="width:100%;height:100px;object-fit:contain;background: #1a1a1a"
                                                                                  src="https://firebasestorage.googleapis.com/v0/b/filmgenie-c89c6.appspot.com/o/sc.png?alt=media&token=78375e21-1467-4b8c-b1a8-a9e62dca4ca8">
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td align="center" width="100%">
                                                              <table border="0" cellspacing="0" cellpadding="0"
                                                                  style="font-weight:200;font-family:Helvetica,Arial,sans-serif"
                                                                  width="100%">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td align="center" style="padding:0 0 8px 0"
                                                                              width="100%"></td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </center>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  
  </body>
  
  </html>`;

  return message;
};

module.exports = constructTemplate;
