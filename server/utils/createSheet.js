const xl = require("excel4node");
const createSheet = async (response, name, id, max, delCard) => {
  // console.log(response);
  return new Promise(async (resolve) => {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet("Sheet");
    const headingColumnNames = ["eventID", "eventName", "teamID"];
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });
    for (var i = 0; i < max; i++) {
      const row = i + 1;
      ws.cell(1, headingColumnIndex++).string("userID_" + row);
      ws.cell(1, headingColumnIndex++).string("name_" + row);
      ws.cell(1, headingColumnIndex++).string("college_" + row);
      if (delCard != null)
        ws.cell(1, headingColumnIndex++).string("status_" + row);
    }

    let rowIndex = 2;
    response.forEach((resp) => {
      let columnIndex = 1;
      ws.cell(rowIndex, columnIndex++).string(name.toString());
      ws.cell(rowIndex, columnIndex++).string(id.toString());
      ws.cell(rowIndex, columnIndex++).string(resp.teamID.toString());
      resp.members.forEach((member) => {
        ws.cell(rowIndex, columnIndex++).string(member.user.userID.toString());
        ws.cell(rowIndex, columnIndex++).string(member.user.name.toString());
        ws.cell(rowIndex, columnIndex++).string(member.user.college.toString());
        if (delCard != null) {
          var x = member.user.delegateCards.includes(delCard)
            ? 1
            : member.user.pendingDelegateCards.includes(delCard)
            ? 2
            : 0;
          ws.cell(rowIndex, columnIndex++).string(
            x == 1 ? "Purchased" : x == 2 ? "Payment Pending" : "Not Purchased"
          );
        }
      });
      rowIndex++;
    });
    resolve(wb);
  });
};
module.exports = createSheet;
