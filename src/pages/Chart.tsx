import { useState, Fragment, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import {
  AgCartesianChartOptions,
  AgCartesianAxisOptions,
} from "ag-charts-community";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface DataItem {
  store: string;
  week: number;
  sku: string;
  gmDollars: number;
  salesDollars: number;
}

const dummyData: DataItem[] = [
  { store: "Store A", week: 1, sku: "SKU1", gmDollars: 100, salesDollars: 500 },
  { store: "Store A", week: 1, sku: "SKU2", gmDollars: 50, salesDollars: 250 },
  { store: "Store A", week: 2, sku: "SKU1", gmDollars: 120, salesDollars: 600 },
  { store: "Store B", week: 1, sku: "SKU1", gmDollars: 80, salesDollars: 400 },
  { store: "Store B", week: 2, sku: "SKU2", gmDollars: 90, salesDollars: 450 },
  { store: "Store C", week: 1, sku: "SKU1", gmDollars: 130, salesDollars: 650 },
  { store: "Store C", week: 2, sku: "SKU2", gmDollars: 140, salesDollars: 700 },
];

const Chart = () => {
  const [selectedStore, setSelectedStore] = useState<string>("Store A");
  const [chartOptions, setChartOptions] = useState<AgCartesianChartOptions>({});

  useEffect(() => {
    const processData = () => {
      const storeData = dummyData.filter(
        (item) => item.store === selectedStore
      );

      const aggregatedData = storeData.reduce((acc: any, item: any) => {
        const weekExists = acc.find(
          (weekData: any) => weekData.week === item.week
        );
        if (weekExists) {
          weekExists.gmDollars += item.gmDollars;
          weekExists.salesDollars += item.salesDollars;
        } else {
          acc.push({
            week: item.week,
            gmDollars: item.gmDollars,
            salesDollars: item.salesDollars,
          });
        }
        return acc;
      }, []);

      const chartData = aggregatedData.map((item: any) => ({
        week: item.week,
        gmDollars: item.gmDollars,
        gmPercent: (item.gmDollars / item.salesDollars) * 100,
      }));

      setChartOptions({
        data: chartData,
        title: {
          text: `GM Dollars and GM % for ${selectedStore}`,
        },
        axes: [
          {
            type: "category",
            position: "bottom",
            title: {
              text: "Week",
            },
          },
          {
            type: "number",
            position: "left",
            title: {
              text: "GM Dollars",
            },
          },
          {
            type: "number",
            position: "right",
            title: {
              text: "GM %",
            },
          },
        ] as AgCartesianAxisOptions[],
        series: [
          {
            type: "bar",
            xKey: "week",
            yKey: "gmDollars",
            yName: "GM Dollars",
          },
          {
            type: "line",
            xKey: "week",
            yKey: "gmPercent",
            yName: "GM %",
          },
        ],
      });
    };

    processData();
  }, [selectedStore]);

  const handleStoreChange = (event: any) => {
    setSelectedStore(event.target.value);
  };

  const stores = Array.from(new Set(dummyData.map((item) => item.store)));

  return (
    <Fragment>
      <FormControl fullWidth>
        <InputLabel id="store-select-label">Select Store</InputLabel>
        <Select
          labelId="store-select-label"
          id="store-select"
          value={selectedStore}
          label="Select Store"
          onChange={handleStoreChange}
        >
          {stores.map((store) => (
            <MenuItem key={store} value={store}>
              {store}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ height: "500px" }}>
        <AgCharts options={chartOptions} />
      </div>
    </Fragment>
  );
};

export default Chart;
