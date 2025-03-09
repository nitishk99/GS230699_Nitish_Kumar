import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddNewData from "../components/AddNewData";
import DataGrid from "../components/DataGrid";
import firestore from "../config/FireBase";
import { SkuStyles } from "./SkuStyles";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { setSkus } from "../redux/slice/skuSlice";
import { RootState } from "../redux/store";

interface SkuRow {
  id: string;
  sku: string;
  price: string;
  cost: string;
}

const cellStyle = {
  display: "flex",
  alignItems: "center",
};

const Sku = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Get skus from the Redux store
  const skus = useSelector((state: RootState) => state.skus.skus);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(firestore, "sku", id));
    const updatedSkus = skus.filter((sku) => sku.id !== id);
    dispatch(setSkus(updatedSkus));
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
    const updatedSkus = [...skus, newEntry];
    dispatch(setSkus(updatedSkus));
    handleClose();
  };

  const columns: any[] = [
    {
      field: "actions",
      headerName: "",
      cellRenderer: (params: any) => (
        <IconButton
          onClick={() => handleDelete(params.data.id)}
          sx={{ color: "#BCBCBC", padding: 0, margin: 0 }}
        >
          <DeleteOutlineOutlinedIcon color="action" />
        </IconButton>
      ),
      width: 50,
      cellStyle: cellStyle,
    },

    { field: "sku", headerName: "SKU", width: 140, cellStyle: cellStyle },
    { field: "price", headerName: "Price", width: 140, cellStyle: cellStyle },
    { field: "cost", headerName: "Cost", width: 140, cellStyle: cellStyle },
  ];

  const fields = [
    { name: "sku", label: "SKU", type: "text" },
    { name: "price", label: "Price", type: "text" },
    { name: "cost", label: "Cost", type: "text" },
  ];

  return (
    <Box sx={SkuStyles.container}>
      <Box sx={SkuStyles.datagridContainer}>
        <DataGrid rows={skus} columns={columns} />
      </Box>
      <Box sx={SkuStyles.buttonContainer}>
        <Button variant="contained" sx={SkuStyles.button} onClick={handleOpen}>
          New SKU
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

export default Sku;
