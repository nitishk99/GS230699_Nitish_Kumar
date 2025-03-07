import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GridColDef } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import AddNewData from "../components/AddNewData";
import DataGrid from "../components/DataGrid";
import firestore from "../config/FireBase";
import { StoreStyles } from "./StoreStyles";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

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
        const fetchStoreData = async () => {
            const querySnapshot = await getDocs(collection(firestore, "stores"));
            const stores = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    store: data.store,
                    city: data.city,
                    state: data.state,
                } as StoreRow;
            });
            setRows(stores);
        };

        fetchStoreData();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(firestore, "stores", id.toString()));
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddStore = async (newRow: StoreRow) => {
        const docRef = await addDoc(collection(firestore, "stores"), newRow);
        const newEntry = { ...newRow, id: docRef.id };
        setRows([...rows, newEntry]);
        handleClose();
    };

    const columns: any[] = [

        {
            field: "actions",
            headerName: "",
            cellRenderer: (params: any) => (<IconButton onClick={() => handleDelete(params.data.id)} sx={{ color: '#BCBCBC', padding: 0, margin: 0 }}>
                <DeleteOutlineOutlinedIcon color="action" />
            </IconButton>
            ),
            width: 40
        },
        {
            field: "sno",
            headerName: "S.No",
            valueGetter: (params: any) => params.node.rowIndex + 1,
            width: 60,
        },
        { field: "store", headerName: "Store", width: 140 },
        { field: "city", headerName: "City", width: 140 },
        { field: "state", headerName: "State", width: 140 },

    ];

    const fields = [
        { name: "store", label: "Store", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "state", label: "State", type: "text" },
    ];

    return (
        <Box sx={StoreStyles.container}>
            <Box sx={StoreStyles.datagridContainer}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </Box>
            <Box sx={StoreStyles.buttonContainer}>
                <Button
                    variant="contained"
                    sx={StoreStyles.button}
                    onClick={handleOpen}
                >
                    New Store
                </Button>
            </Box>
            <AddNewData
                open={open}
                handleClose={handleClose}
                handleAdd={handleAddStore}
                fields={fields}
            />
        </Box>
    );
};

export default Store;