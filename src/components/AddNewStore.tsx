import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AddNewStoreStyles } from "./AddNewStoreStyles";

interface AddNewStoreProps {
    open: boolean;
    handleClose: () => void;
    handleAdd: (newRow: {
        id: string;
        store: string;
        city: string;
        state: string;
    }) => void;
}

const AddNewStore: React.FC<AddNewStoreProps> = ({
    open,
    handleClose,
    handleAdd,
}) => {
    const [newRow, setNewRow] = useState({
        id: "",
        store: "",
        city: "",
        state: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRow((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        handleAdd(newRow);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Store</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the details of the new store.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="ID"
                    name="id"
                    value={newRow.id}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Store"
                    name="store"
                    value={newRow.store}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="City"
                    name="city"
                    value={newRow.city}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="State"
                    name="state"
                    value={newRow.state}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    sx={AddNewStoreStyles.button}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={AddNewStoreStyles.button}
                    onClick={handleSubmit}
                >
                    Add Store
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddNewStore;
