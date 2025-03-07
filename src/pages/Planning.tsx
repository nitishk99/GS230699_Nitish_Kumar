import * as React from 'react';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DataGrid from '../components/DataGrid';
import firestore from "../config/FireBase";
import { SkuStyles } from "./SkuStyles";

const Planning = () => {

    const columns: any[] = [
        { field: "sku", width: 100 },
        { field: "store", width: 100 },
        {
            headerName: "Feb",
            children: [
                {
                    headerName: "week 1",
                    children: [
                        { field: "one", width: 100 },
                        { field: "two", width: 100 },
                        { field: "three", width: 100 },
                        { field: "four", width: 100 },
                    ],
                },
                {
                    headerName: "week 2",
                    children: [
                        { field: "one", width: 100 },
                        { field: "two", width: 100 },
                        { field: "three", width: 100 },
                        { field: "four", width: 100 },
                    ],
                },
                {
                    headerName: "week 3",
                    children: [
                        { field: "one", width: 100 },
                        { field: "two", width: 100 },
                        { field: "three", width: 100 },
                        { field: "four", width: 100 },
                    ],
                },
                {
                    headerName: "week 4",
                    children: [
                        { field: "one", width: 100 },
                        { field: "two", width: 100 },
                        { field: "three", width: 100 },
                        { field: "four", width: 100 },
                    ],
                },
            ],
        },
    ]


    return (
        <Box sx={SkuStyles.container}>
            <DataGrid rows={[]} columns={columns} />
        </Box>
    );
};

export default Planning;