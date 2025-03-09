import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import DataGrid from "../components/DataGrid";
import { SkuStyles } from "./SkuStyles";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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

const cellStyle = {
  display: "flex",
  alignItems: "center",
  color: "#555555",
};

const headerStyle = {
  color: "grey",
  textAlign: "center",
  borderRight: "1px solid #e0e0e0",
};

const Planning = () => {
  const [rows, setRows] = useState<PlanningData[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  // Get the SKU and Stores data from Redux store data
  const skus = useSelector((state: RootState) => state.skus.skus);
  const stores = useSelector((state: RootState) => state.stores.stores);

  // Create rows
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

  // Define month names
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

  // Create columns for each week of a month
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
        width: 140,
        type: "number",
        valueParser: (params: { newValue: any }) => Number(params.newValue),
        cellStyle: cellStyle,
        headerStyle: headerStyle,
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
          `$ ${params.value?.toFixed(2)}`,
        width: 140,
        cellStyle: cellStyle,
        headerStyle: headerStyle,
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
          `$ ${params.value?.toFixed(2)}`,
        width: 140,
        cellStyle: cellStyle,
        headerStyle: headerStyle,
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
          `${params.value?.toFixed(2)} %`,
        cellStyle: (params: { value: any }) => {
          const value = params.value;
          if (value >= 40) {
            return { backgroundColor: "#3CB043", ...cellStyle };
          } else if (value >= 10) {
            return { backgroundColor: "#FDD128", ...cellStyle };
          } else if (value > 5) {
            return { backgroundColor: "#F98129", ...cellStyle };
          } else if (value >= 0) {
            return { backgroundColor: "#FF817E", ...cellStyle };
          }
        },
        width: 140,
        headerStyle: headerStyle,
      },
    ];
  };

  // Create columns for each month
  const generateMonthColumns = (monthName: string) => ({
    headerName: monthName,
    headerStyle: headerStyle,
    children: [
      {
        headerName: "Week 1",
        headerStyle: headerStyle,
        children: generateWeekColumns(1, monthName),
      },
      {
        headerName: "Week 2",
        headerStyle: headerStyle,
        children: generateWeekColumns(2, monthName),
      },
      {
        headerName: "Week 3",
        headerStyle: headerStyle,
        children: generateWeekColumns(3, monthName),
      },
      {
        headerName: "Week 4",
        headerStyle: headerStyle,
        children: generateWeekColumns(4, monthName),
      },
    ],
  });

  // Merge columns
  const mergeColumns = [
    {
      field: "store",
      headerName: "Store",
      width: 140,
      cellStyle: cellStyle,
      headerStyle: headerStyle,
    },
    {
      field: "sku",
      headerName: "SKU",
      width: 140,
      cellStyle: cellStyle,
      headerStyle: headerStyle,
    },
    ...monthNames.map((monthName) => generateMonthColumns(monthName)),
  ];

  return (
    <Box sx={SkuStyles.container}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};

export default Planning;
