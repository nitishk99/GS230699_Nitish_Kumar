import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import AddNewData from "../components/AddNewData";
import DataGrid from "../components/DataGrid";
import firestore from "../config/FireBase";
import { StoreStyles } from "./StoreStyles";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setStores } from "../redux/slice/storeSclice";
import { RootState } from "../redux/store";

interface StoreRow {
  id: string;
  store: string;
  city: string;
  state: string;
}

const cellStyle = {
  display: "flex",
  alignItems: "center",
  color: "#555555",
};

const Store = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Get stores from the Redux store
  const stores = useSelector((state: RootState) => state.stores.stores);

  // Deleting a store
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(firestore, "stores", id.toString()));
    const updatedStores = stores.filter((store:any) => store.id !== id);
    dispatch(setStores(updatedStores));
  };

  // Opening the add store dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Closing the add store dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Adding a new store
  const handleAddStore = async (newRow: StoreRow) => {
    const docRef = await addDoc(collection(firestore, "stores"), newRow);
    const newEntry = { ...newRow, id: docRef.id };
    const updatedStores = [...stores, newEntry];
    dispatch(setStores(updatedStores));
    handleClose();
  };

  // Create columns 
  const columns: any[] = [
    {
      field: "actions",
      headerName: "",
      cellRenderer: (params: any) => (
        <IconButton onClick={() => handleDelete(params.data.id)}>
          <DeleteOutlineOutlinedIcon color="action" />
        </IconButton>
      ),
      width: 50,
      editable: false,
    },
    {
      field: "sno",
      headerName: "S.No",
      valueGetter: (params: any) => params.node.rowIndex + 1,
      width: 70,
      cellStyle: cellStyle,
    },
    { field: "store", headerName: "Store", width: 140, cellStyle: cellStyle },
    { field: "city", headerName: "City", width: 140, cellStyle: cellStyle },
    { field: "state", headerName: "State", width: 140, cellStyle: cellStyle },
  ];

  // Create fields for the add store form
  const fields = [
    { name: "store", label: "Store", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "state", label: "State", type: "text" },
  ];

  return (
    <Box sx={StoreStyles.container}>
      <Box sx={StoreStyles.datagridContainer}>
        <DataGrid rows={stores} columns={columns} />
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
