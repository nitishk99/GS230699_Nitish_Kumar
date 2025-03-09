import { useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    AllCommunityModule, ModuleRegistry
} from "ag-grid-community";
import Box from '@mui/material/Box';

ModuleRegistry.registerModules([
    AllCommunityModule
]);

interface DataGridProps {
    rows: any[];
    columns: any[];
    onGridReady?: (params: any) => void;
    onCellValueChanged?: (params: any) => void;
}

const DataGrid = ({ rows, columns, onGridReady, onCellValueChanged }: DataGridProps) => {
    const defaultColDef = useMemo(() => {
        return {
            initialWidth: 200,
            wrapHeaderText: true,
            sortable: true,
            resizable: true,
            filter: true,
        };
    }, []);

    const gridOptions = useMemo(() => ({
        getRowId: (params: any) => params.data.id,
    }), []);

    return (
        <Box style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                columnDefs={columns}
                rowData={rows}
                defaultColDef={defaultColDef}
                headerHeight={50}
                rowSelection='single'
                animateRows={true}
                getRowId={gridOptions.getRowId}
                onGridReady={onGridReady}
                onCellValueChanged={onCellValueChanged}
            />
        </Box>
    );
};

export default DataGrid;