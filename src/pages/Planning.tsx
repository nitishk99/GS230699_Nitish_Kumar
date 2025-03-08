import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import DataGrid from '../components/DataGrid';
import { SkuStyles } from "./SkuStyles";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchSkus } from '../redux/thunks/skuThunks';
import { fetchStores } from '../redux/thunks/storeThunks';

const Planning = () => {
    interface PlanningData {
        id: string;
        sku: string;
        store: string;
        price: string;
        cost: string;
        city: string;
        state: string;
        [key: string]: any;
    }

    const [rows, setRows] = useState<PlanningData[]>([]);
    const [columns, setColumns] = useState<any[]>([]);

    const dispatch: AppDispatch = useDispatch();

    // Get the Redux store data
    const skus = useSelector((state: RootState) => state.skus.skus);
    const stores = useSelector((state: RootState) => state.stores.stores);

    useEffect(() => {
        console.log("Stores from Redux:", stores);
        console.log("SKUs from Redux:", skus);
    }, [stores, skus]);

    useEffect(() => {
        dispatch(fetchSkus());
        dispatch(fetchStores());
    }, [dispatch]);

    useEffect(() => {
        if (skus.length > 0 && stores.length > 0) {
            const mappedRows: PlanningData[] = [];
            stores.forEach((store: { id: any; store: any; city: any; state: any; }) => {
                skus.forEach((sku: { id: any; sku: any; price: any; cost: any; }) => {
                    mappedRows.push({
                        id: `${store.id}-${sku.id}`,
                        store: store.store,
                        sku: sku.sku,
                        price: sku.price,
                        cost: sku.cost,
                        city: store.city,
                        state: store.state,
                    });
                });
            });
            setRows(mappedRows);
        }
    }, [skus, stores]);

    useEffect(() => {
        setColumns(mergeColumns);
    }, []);

    const generateWeekColumns = (weekNumber: number) => [
        { field: `salesUnitsWeek${weekNumber}`, headerName: "Sales Units", editable: true, width: 100 },
        { field: `salesDollarsWeek${weekNumber}`, headerName: "Sales Dollars", valueGetter: (params: { data: { [x: string]: number; price: number; }; }) => params.data[`salesUnitsWeek${weekNumber}`] * params.data.price, valueFormatter: (params: { value: number; }) => `$${params.value.toFixed(2)}`, width: 100 },
        { field: `gmDollarsWeek${weekNumber}`, headerName: "GM Dollars", valueGetter: (params: { data: { [x: string]: number; price: number; cost: number; }; }) => (params.data[`salesUnitsWeek${weekNumber}`] * params.data.price) - (params.data[`salesUnitsWeek${weekNumber}`] * params.data.cost), valueFormatter: (params: { value: number; }) => `$${params.value.toFixed(2)}`, width: 100 },
        {
            field: `gmPercentWeek${weekNumber}`,
            headerName: "GM %",
            valueGetter: (params: { data: { [x: string]: number; price: number; cost: number; }; }) => {
                const salesDollars = params.data[`salesUnitsWeek${weekNumber}`] * params.data.price;
                const gmDollars = salesDollars - (params.data[`salesUnitsWeek${weekNumber}`] * params.data.cost);
                return salesDollars ? (gmDollars / salesDollars) * 100 : 0;
            },
            valueFormatter: (params: { value: number; }) => `${params.value.toFixed(2)}%`,
            cellStyle: (params: { value: any; }) => {
                const value = params.value;
                if (value >= 40) {
                    return { backgroundColor: 'green', color: 'white' };
                } else if (value >= 10) {
                    return { backgroundColor: 'yellow', color: 'black' };
                } else if (value > 5) {
                    return { backgroundColor: 'orange', color: 'black' };
                } else {
                    return { backgroundColor: 'red', color: 'white' };
                }
            },
            width: 100
        },
    ];

    const generateMonthColumns = (monthName: string) => ({
        headerName: monthName,
        children: [
            { headerName: "Week 1", children: generateWeekColumns(1) },
            { headerName: "Week 2", children: generateWeekColumns(2) },
            { headerName: "Week 3", children: generateWeekColumns(3) },
            { headerName: "Week 4", children: generateWeekColumns(4) },
        ],
    });

    const mergeColumns = [
        { field: "store", headerName: "Store", width: 100 },
        { field: "sku", headerName: "SKU", width: 100 },
        generateMonthColumns("Feb"),
        generateMonthColumns("Mar"),
        generateMonthColumns("Apr"),
        generateMonthColumns("May"),
        generateMonthColumns("Jun"),
        generateMonthColumns("Jul"),
        generateMonthColumns("Aug"),
        generateMonthColumns("Sep"),
        generateMonthColumns("Oct"),
        generateMonthColumns("Nov"),
        generateMonthColumns("Dec"),
        generateMonthColumns("Jan"),
    ];

    return (
        <Box sx={SkuStyles.container}>
            <DataGrid rows={rows} columns={columns} />
        </Box>
    );
};

export default Planning;