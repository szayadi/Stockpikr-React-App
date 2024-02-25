import * as XLSX from 'xlsx';

const exportToExcel = <T>(rows: T[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default exportToExcel;
