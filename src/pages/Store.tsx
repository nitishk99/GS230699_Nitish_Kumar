import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddNewStore from '../components/AddNewStore';

const initialRows = [
    { id: 1, store: 'Store 1', city: 'City 1', state: 'State 1' },
    { id: 2, store: 'Store 2', city: 'City 2', state: 'State 2' },
    { id: 3, store: 'Store 3', city: 'City 3', state: 'State 3' },
    { id: 4, store: 'Store 4', city: 'City 4', state: 'State 4' },
    { id: 5, store: 'Store 5', city: 'City 5', state: 'State 5' },
];

const Store = () => {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);

    const handleDelete = (id: GridRowId) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (newRow: { id: string; store: string; city: string; state: string }) => {
        const newEntry = { ...newRow, id: parseInt(newRow.id) };
        setRows([...rows, newEntry]);
        handleClose();
    };

    const columns: GridColDef[] = [
        {
            field: 'delete',
            headerName: '',
            width: 110,
            renderCell: (params) => (
                <DeleteOutlineOutlinedIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(params.id)}
                />
            ),
        },
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'store', headerName: 'Store', width: 150, editable: true },
        { field: 'city', headerName: 'City', width: 150, editable: true },
        { field: 'state', headerName: 'State', width: 150, editable: true },
    ];

    return (
        <Box sx={{
            backgroundColor: 'white',
            margin: '20px',
            height: '85vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ flexGrow: 1 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 9,
                            },
                        },
                    }}
                    pageSizeOptions={[9]}
                    disableRowSelectionOnClick
                />
            </Box>
            <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    New Store
                </Button>
            </Box>
            <AddNewStore open={open} handleClose={handleClose} handleAdd={handleAdd} />
        </Box>
    );
};

export default Store;