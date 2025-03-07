import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid';

interface DataGridProps {
    rows: any[];
    columns: GridColDef[];
    pageSize?: number;
    pageSizeOptions?: number[];
}

const DataGrid = ({ rows, columns, pageSize = 8, pageSizeOptions = [5, 10, 50, 100] }: DataGridProps) => {
    return (
        <MuiDataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: pageSize,
                    },
                },
            }}
            pageSizeOptions={pageSizeOptions}
            disableRowSelectionOnClick
        />
    );
};

export default DataGrid;