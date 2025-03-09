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
}

const DataGrid = ({ rows, columns }: DataGridProps) => {
    const defaultColDef = useMemo(() => {
        return {
            initialWidth: 200,
            wrapHeaderText: true,
            
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
            />
        </Box>
    );
};

export default DataGrid;