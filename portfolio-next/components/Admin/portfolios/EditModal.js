import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import React, { useState } from "react"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import Chip from "@material-ui/core/Chip"
import Box from "@material-ui/core/Box"
import OutlinedInput from "@material-ui/core/OutlinedInput"

import { uploadFileRequest } from "../../../providers/filesProveder"
import { getImgUrl } from "@/utils/utils"
export default function EditModal({
  open,
  handleClose,
  handleSubmit,
  currentRow,
  setCurrentRow,
  tags,
}) {
  const initialErrorsState = {
    name: null,
    url: null,
    order_number: null,
    tags: null,
  }

  const fileInitialValue = {
    url: null,
    name: "",
  }

  const [errors, setErrors] = useState(initialErrorsState)
  const [uploadedFile, setUploadedFile] = useState(fileInitialValue)

  const handleChangeRow = (e) => {
    const key = e.target.name
    let value = e.target.value

    if (key === "order_number") {
      value = parseInt(value)
    }

    setCurrentRow({
      ...currentRow,
      [key]: value,
    })
  }

  const handleChangeFile = async (e) => {
    let file = e.target.files[0]
    let uploadedFile = await uploadFileRequest(file)
    setUploadedFile(uploadedFile)
  }

  function handleChangeSelect(e) {
    const tags = e.target.value
    let currentTags = [...currentRow.tagsz]

    let diff = tags.filter((x) => !currentTags.includes(x))
    let newElem = diff[0]
    let newElemId = newElem.id
    const found = currentTags.find((element) => element.id == newElemId)

    if (found) {
      currentTags = currentTags.filter((e) => e.id !== newElemId)
    } else {
      currentTags.push(newElem)
    }

    setCurrentRow((currentRow) => ({
      ...currentRow,
      tags: currentTags,
    }))
  }

  const handleValidateAndSubmit = (values) => {
    let order_number = parseInt(values.order_number)

    setErrors(initialErrorsState)
    let isErrors = false
    let errors = {}

    if (!order_number) {
      isErrors = true
      errors.order_number = "Must be a number"
    }

    if (!values.name) {
      isErrors = true
      errors.name = "Required"
    }
    if (!values.url) {
      isErrors = true
      errors.url = "Required"
    }
    if (!uploadedFile.name && !values.img) {
      isErrors = true
      errors.img = "Required"
    }

    //onsole.log(errors)
    if (isErrors) {
      setErrors(errors)
    } else {
      let sendData = {
        ...values,
        uploadedFile: uploadedFile.name,
      }
      //setValues(inititalValues)
      //console.log(sendData)
      handleSubmit(sendData)
    }
  }

  const onHandleClose = () => {
    setUploadedFile(fileInitialValue)
    handleClose()
  }

  let currentFileUrl = getImgUrl(currentRow.img)

  return (
    <div>
      <Dialog open={open} onClose={onHandleClose}>
        <DialogTitle>Edit portfolio</DialogTitle>

        <DialogContent>
          <TextField
            error={errors.name ? true : false}
            onChange={(e) => handleChangeRow(e)}
            name="name"
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={currentRow.name}
            helperText={errors.name}
          />
          <input
            type="hidden"
            name="uploadedFile"
            value={uploadedFile.name}
          ></input>
          {uploadedFile.url && (
            <img
              src={getImgUrl(uploadedFile.url)}
              alt="Uploaded img"
              width={400}
              height={300}
            />
          )}
          {currentFileUrl && !uploadedFile.url && (
            <img
              src={currentFileUrl}
              alt="Uploaded img"
              width={400}
              height={300}
            />
          )}
          <TextField
            error={errors.img ? true : false}
            onChange={(e) => handleChangeFile(e)}
            name="img"
            margin="dense"
            id="img"
            label="Image"
            type="file"
            fullWidth
            variant="standard"
            helperText={errors.img}
          />

          <TextField
            error={errors.url ? true : false}
            onChange={(e) => handleChangeRow(e)}
            name="url"
            margin="dense"
            id="url"
            label="Url"
            type="text"
            fullWidth
            variant="standard"
            value={currentRow.url}
            helperText={errors.url}
          />

          <TextField
            error={errors.order_number ? true : false}
            onChange={(e) => handleChangeRow(e)}
            name="order_number"
            margin="dense"
            id="order_number"
            label="Order"
            type="number"
            fullWidth
            variant="standard"
            value={currentRow.order_number}
            helperText={errors.order_number}
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-tags-label">Tags</InputLabel>
            <Select
              name="tags"
              labelId="multiple-tags-label"
              id="multiple-tags"
              multiple
              value={currentRow.tags}
              onChange={(e) => handleChangeSelect(e)}
              input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {selected.map((tag) => (
                    <Chip key={tag.id} label={tag.name} sx={{ m: "2px" }} />
                  ))}
                </Box>
              )}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={{ id: tag.id, name: tag.name }}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose}>Cancel</Button>
          <Button onClick={() => handleValidateAndSubmit(currentRow)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
