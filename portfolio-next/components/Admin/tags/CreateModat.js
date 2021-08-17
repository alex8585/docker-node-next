import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import React from "react"
import useFormValues from "../../../hooks/useFormValues"

export default function CreateModat({ open, handleClose, handleSubmit }) {
  const [values, handleChange] = useFormValues({ name: "" })

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new tag</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Create new tag</DialogContentText> */}
          <TextField
            onChange={(e) => handleChange(e)}
            name="name"
            autoFocus
            margin="dense"
            id="name"
            label="Tag name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(values)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
