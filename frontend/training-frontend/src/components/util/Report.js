import ExcelJS from "exceljs";
import FileSaver from "file-saver";

function makeReport(name, columns, data) {
  const blobType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(name);
  sheet.columns = columns.map((c) => ({
    header: c.Header,
    key: c.accessor,
  }));
  for (let i = 0; i < data.length; ++i) {
    let row = {};
    let dataChunk = data[i];
    for (let j = 0; j < columns.length; ++j) {
      let key = columns[j].accessor;
      row[key] = dataChunk[key];
    }
    sheet.addRow(row);
  }
  const excelFileName = name + Date.now().toString() + ".xlsx";
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: blobType });
    FileSaver.saveAs(blob, excelFileName);
  });
}
export default makeReport;
