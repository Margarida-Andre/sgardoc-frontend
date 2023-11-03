import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { CButton } from "@coreui/react";
import { TiExport } from "react-icons/ti";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <CButton
      type="button"
      color="primary"
      className="my-2 my-sm-0"
      style={{
        marginRight: "0.6rem",
        displayFlex: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      <TiExport size={20} />
      <span>Exportar CSV</span>
    </CButton>
  );
};
