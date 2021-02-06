import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "slot1", headerName: "slot1", width: 130, sortable: false },
  { field: "slot2", headerName: "slot2", width: 130, sortable: false },
  { field: "slot3", headerName: "slot3", width: 130, sortable: false },
  { field: "time", headerName: "Time", width: 130 },
];

const ResultsTable = ({ results }) => {
  const rows = results.map((result, index) => ({
    id: index + 1,
    slot1: result.slots[0],
    slot2: result.slots[1],
    slot3: result.slots[2],
    time: result.time,
  }));
  return (
    <div style={{ height: 400, width: "50%", margin: "4em auto" }}>
      <DataGrid rows={rows} columns={columns} hideFooter />
    </div>
  );
};

export default ResultsTable;
