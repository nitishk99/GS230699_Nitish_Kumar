import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import DataGrid from "../components/DataGrid";
import { SkuStyles } from "./SkuStyles";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Planning = () => {
  interface PlanningData {
    id: string;
    storeId: string;
    sku: string;
    store: string;
    price: string;
    cost: string;
    city: string;
    state: string;
    [key: string]: string | number | undefined;
  }

  const [rows, setRows] = useState<PlanningData[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  // Get the Redux store data
  const skus = useSelector((state: RootState) => state.skus.skus);
  const stores = useSelector((state: RootState) => state.stores.stores);

  useEffect(() => {
    if (skus.length > 0 && stores.length > 0) {
      const mappedRows: PlanningData[] = [];
      stores.forEach(
        (store: { id: any; store: any; city: any; state: any }) => {
          skus.forEach((sku: { id: any; sku: any; price: any; cost: any }) => {
            mappedRows.push({
              id: `${store.id}-${sku.id}`,
              store: store.store,
              storeId: store.id,
              sku: sku.sku,
              price: sku.price,
              cost: sku.cost,
              city: store.city,
              state: store.state,
            });
          });
        }
      );
      setRows(mappedRows);
    }
  }, [skus, stores]);

  useEffect(() => {
    setColumns(mergeColumns);
    // eslint-disable-next-line
  }, []);

  const monthNames = [
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
  ];

  const generateWeekColumns = (weekNumber: number, monthName: string) => {
    const salesUnitsField = `salesUnitsWeek${weekNumber}${monthName}`;
    const salesDollarsField = `salesDollarsWeek${weekNumber}${monthName}`;
    const gmDollarsField = `gmDollarsWeek${weekNumber}${monthName}`;
    const gmPercentField = `gmPercentWeek${weekNumber}${monthName}`;

    return [
      {
        field: salesUnitsField,
        headerName: "Sales Units",
        editable: true,
        width: 100,
        type: "number",
        valueParser: (params: { newValue: any }) => Number(params.newValue),
      },
      {
        field: salesDollarsField,
        headerName: "Sales Dollars",
        valueGetter: (params: { data: PlanningData }) => {
          const salesUnits = Number(params.data[salesUnitsField]) || 0;
          const price = Number(params.data.price) || 0;
          return salesUnits * price;
        },
        valueFormatter: (params: { value: number }) =>
          `$${params.value?.toFixed(2)}`,
        width: 100,
      },
      {
        field: gmDollarsField,
        headerName: "GM Dollars",
        valueGetter: (params: { data: PlanningData }) => {
          const salesUnits = Number(params.data[salesUnitsField]) || 0;
          const price = Number(params.data.price) || 0;
          const cost = Number(params.data.cost) || 0;
          const salesDollars = salesUnits * price;
          return salesDollars - salesUnits * cost;
        },
        valueFormatter: (params: { value: number }) =>
          `$${params.value?.toFixed(2)}`,
        width: 100,
      },
      {
        field: gmPercentField,
        headerName: "GM %",
        valueGetter: (params: { data: PlanningData }) => {
          const salesUnits = Number(params.data[salesUnitsField]) || 0;
          const price = Number(params.data.price) || 0;
          const cost = Number(params.data.cost) || 0;
          const salesDollars = salesUnits * price;
          const gmDollars = salesDollars - salesUnits * cost;
          return salesDollars ? (gmDollars / salesDollars) * 100 : 0;
        },
        valueFormatter: (params: { value: number }) =>
          `${params.value?.toFixed(2)}%`,
        cellStyle: (params: { value: any }) => {
          const value = params.value;
          if (value >= 40) {
            return { backgroundColor: "#3CB043", color: "black" };
          } else if (value >= 10) {
            return { backgroundColor: "#FDD128", color: "black" };
          } else if (value > 5) {
            return { backgroundColor: "#F98129", color: "black" };
          } else if (value >= 0) {
            return { backgroundColor: "#FF817E", color: "black" };
          }
        },
        width: 100,
      },
    ];
  };

  const generateMonthColumns = (monthName: string) => ({
    headerName: monthName,
    children: [
      { headerName: "Week 1", children: generateWeekColumns(1, monthName) },
      { headerName: "Week 2", children: generateWeekColumns(2, monthName) },
      { headerName: "Week 3", children: generateWeekColumns(3, monthName) },
      { headerName: "Week 4", children: generateWeekColumns(4, monthName) },
    ],
  });

  const mergeColumns = [
    { field: "store", headerName: "Store", width: 100 },
    { field: "sku", headerName: "SKU", width: 100 },
    ...monthNames.map((monthName) => generateMonthColumns(monthName)),
  ];

  return (
    <Box sx={SkuStyles.container}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};

export default Planning;
