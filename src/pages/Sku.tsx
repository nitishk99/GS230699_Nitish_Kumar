import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddNewData from "../components/AddNewData";
import DataGrid from "../components/DataGrid";
import firestore from "../config/FireBase";
import { SkuStyles } from "./SkuStyles";
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

const Store = () => {
    const [rows, setRows] = useState<SkuRow[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchStoreData = async () => {
            const querySnapshot = await getDocs(collection(firestore, "sku"));
            const stores = querySnapshot.docs.map((doc, index) => {
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

        fetchStoreData();
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

    const handleAddSku = async (newRow: SkuRow) => {
        const docRef = await addDoc(collection(firestore, "sku"), newRow);
        const newEntry = { ...newRow, id: docRef.id };
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
        {
            field: "id",
            headerName: "S.No",
            width: 90,
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
        <Box sx={SkuStyles.container}>
            <Box sx={SkuStyles.datagridContainer}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </Box>
            <Box sx={SkuStyles.buttonContainer}>
                <Button
                    variant="contained"
                    sx={SkuStyles.button}
                    onClick={handleOpen}
                >
                    New Store
                </Button>
            </Box>
            <AddNewData
                open={open}
                handleClose={handleClose}
                handleAdd={handleAddSku}
                fields={fields}
            />
        </Box>
    );
};

export default Store;