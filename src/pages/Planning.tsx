import * as React from 'react';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DataGrid from '../components/DataGrid';
import firestore from "../config/FireBase";
import { SkuStyles } from "./SkuStyles";

const Planning = () => {

    const columns: GridColDef[] = [
        { field: 'store', headerName: 'Store', width: 90 },
        { field: 'sku', headerName: 'SKU', width: 90 },
        {
            field: 'firstNameWeek1',
            headerName: 'First name (Week 1)',
            width: 150,
        },
        {
            field: 'lastNameWeek1',
            headerName: 'Last name (Week 1)',
            width: 150,
        },
        {
            field: 'threeWeek1',
            headerName: 'Three (Week 1)',
            width: 150,
        },
        {
            field: 'fourWeek1',
            headerName: 'Four (Week 1)',
            type: 'number',
            width: 110,
        },
        {
            field: 'firstNameWeek2',
            headerName: 'First name (Week 2)',
            width: 150,
        },
        {
            field: 'lastNameWeek2',
            headerName: 'Last name (Week 2)',
            width: 150,
        },
        {
            field: 'threeWeek2',
            headerName: 'Three (Week 2)',
            width: 150,
        },
        {
            field: 'fourWeek2',
            headerName: 'Four (Week 2)',
            type: 'number',
            width: 110,
        },
        {
            field: 'firstNameWeek3',
            headerName: 'First name (Week 3)',
            width: 150,
        },
        {
            field: 'lastNameWeek3',
            headerName: 'Last name (Week 3)',
            width: 150,
        },
        {
            field: 'threeWeek3',
            headerName: 'Three (Week 3)',
            width: 150,
        },
        {
            field: 'fourWeek3',
            headerName: 'Four (Week 3)',
            type: 'number',
            width: 110,
        },
        {
            field: 'firstNameWeek4',
            headerName: 'First name (Week 4)',
            width: 150,
        },
        {
            field: 'lastNameWeek4',
            headerName: 'Last name (Week 4)',
            width: 150,
        },
        {
            field: 'threeWeek4',
            headerName: 'Three (Week 4)',
            width: 150,
        },
        {
            field: 'fourWeek4',
            headerName: 'Four (Week 4)',
            type: 'number',
            width: 110,
        },
    ];

    const rows = [
        { id: 1, lastNameWeek1: 'Snow', firstNameWeek1: 'Jon', threeWeek1: 'Value', fourWeek1: 14 },
        { id: 2, lastNameWeek2: 'Lannister', firstNameWeek2: 'Cersei', threeWeek2: 'Value', fourWeek2: 31 },
        { id: 3, lastNameWeek3: 'Lannister', firstNameWeek3: 'Jaime', threeWeek3: 'Value', fourWeek3: 31 },
        { id: 4, lastNameWeek4: 'Stark', firstNameWeek4: 'Arya', threeWeek4: 'Value', fourWeek4: 11 },
        // Add more rows as needed
    ];

    const columnGroupingModel: GridColumnGroupingModel = [
        {
            groupId: 'Feb',
            children: [
                {
                    groupId: 'Week 1',
                    children: [{ field: 'lastNameWeek1' }, { field: 'firstNameWeek1' }, { field: 'threeWeek1' }, { field: 'fourWeek1' }],
                },
                {
                    groupId: 'Week 2',
                    children: [{ field: 'lastNameWeek2' }, { field: 'firstNameWeek2' }, { field: 'threeWeek2' }, { field: 'fourWeek2' }],
                },
                {
                    groupId: 'Week 3',
                    children: [{ field: 'lastNameWeek3' }, { field: 'firstNameWeek3' }, { field: 'threeWeek3' }, { field: 'fourWeek3' }],
                },
                {
                    groupId: 'Week 4',
                    children: [{ field: 'lastNameWeek4' }, { field: 'firstNameWeek4' }, { field: 'threeWeek4' }, { field: 'fourWeek4' }],
                },
            ],
        },
    ];

    return (
        <Box sx={SkuStyles.container}>
           {/* // <DataGrid rows={rows} columns={columns} columnGroupingModel={columnGroupingModel} /> */}
        </Box>
    );
};

export default Planning;