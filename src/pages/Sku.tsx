import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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

interface SkuRow {
    id: string;
    sku: string;
    price: string;
    cost: string;
}

const Sku = () => {
    const [rows, setRows] = useState<SkuRow[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchSkuData = async () => {
            const querySnapshot = await getDocs(collection(firestore, "sku"));
            const stores = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: data.id,
                    sku: data.sku,
                    price: data.price,
                    cost: data.cost,
                } as SkuRow;
            });
            setRows(stores);
        };

        fetchSkuData();
    }, []);

    const handleDelete = async (id: GridRowId) => {
        await deleteDoc(doc(firestore, "sku", id.toString()));
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddStore = async (newRow: {
        id: string;
        sku: string;
        price: string;
        cost: string;
    }) => {
        const docRef = await addDoc(collection(firestore, "sku"), newRow);
        const newEntry: SkuRow = { ...newRow, id: docRef.id };
        setRows([...rows, newEntry]);
        handleClose();
    };

    const columns: GridColDef[] = [
        {
            field: "delete",
            headerName: "",
            width: 110,
            renderCell: (params) => (
                <DeleteOutlineOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(params.id)}
                />
            ),
        },
        { field: "sku", headerName: "SKU", width: 150, editable: true },
        { field: "price", headerName: "Price", width: 150, editable: true },
        { field: "cost", headerName: "Cost", width: 150, editable: true },
    ];

    const fields = [
        { name: "sku", label: "SKU", type: "text" },
        { name: "price", label: "Price", type: "text" },
        { name: "cost", label: "Cost", type: "text" },
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
                    New SKU
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

export default Sku;