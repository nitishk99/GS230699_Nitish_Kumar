import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddNewStore from '../components/AddNewStore';
import firestore from '../config/FireBase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

interface StoreRow {
    id: string;
    store: string;
    city: string;
    state: string;
}

const Store = () => {
    const [rows, setRows] = useState<StoreRow[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(firestore, "stores"));
            const stores = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { id: doc.id, store: data.store, city: data.city, state: data.state } as StoreRow;
            });
            setRows(stores);
        };

        fetchData();
    }, []);

    const handleDelete = async (id: GridRowId) => {
        await deleteDoc(doc(firestore, "stores", id.toString()));
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddStore = async (newRow: { id: string; store: string; city: string; state: string }) => {
        const docRef = await addDoc(collection(firestore, "stores"), newRow);
        const newEntry = { ...newRow, id: docRef.id };
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
                                pageSize: 6,
                            },
                        },
                    }}
                    pageSizeOptions={[6]}
                    disableRowSelectionOnClick
                />
            </Box>
            <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#F1ACA5', '&:hover': { backgroundColor: '#F1ACA5' }, color: 'black' }}
                    onClick={handleOpen}
                >
                    New Store
                </Button>
            </Box>
            <AddNewStore open={open} handleClose={handleClose} handleAdd={handleAddStore} />
        </Box>
    );
};

export default Store;