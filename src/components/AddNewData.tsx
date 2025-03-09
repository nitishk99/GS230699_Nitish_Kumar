import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AddNewDatatyles } from "./AddNewDatatyles";

interface Field {
  name: string;
  label: string;
  type: string;
}

interface AddNewDataProps {
  open: boolean;
  handleClose: () => void;
  handleAdd: (newRow: any) => void;
  fields: Field[];
}

const AddNewData: React.FC<AddNewDataProps> = ({
  open,
  handleClose,
  handleAdd,
  fields,
}) => {
  const [newRow, setNewRow] = useState<{ [key: string]: any }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    handleAdd(newRow);
    setNewRow({});
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Data</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the details.</DialogContentText>
        {fields.map((field) => (
          <TextField
            key={field.name}
            margin="dense"
            label={field.label}
            name={field.name}
            type={field.type}
            value={newRow[field.name] || ""}
            onChange={handleChange}
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={AddNewDatatyles.button}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={AddNewDatatyles.button}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewData;
