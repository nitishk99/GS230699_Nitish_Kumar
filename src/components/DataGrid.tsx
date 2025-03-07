import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  ClientSideRowModelModule,
} from "ag-grid-community";

interface DataGridProps {
  rows: any[];
  columns: any[];
}

const DataGrid = ({ rows, columns }: DataGridProps) => {

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  return (

    <AgGridReact
      columnDefs={columns}
      modules={[ClientSideRowModelModule]}
      rowData={rows}
      defaultColDef={defaultColDef}

    />

  );
};

export default DataGrid;