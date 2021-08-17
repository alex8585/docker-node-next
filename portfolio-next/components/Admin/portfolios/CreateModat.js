import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useFormValues from "../../../hooks/useFormValues"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Chip from "@material-ui/core/Chip"
import Box from "@material-ui/core/Box"
import React, { useState } from "react"
import { uploadFileRequest } from "../../../providers/filesProveder"
import Image from "next/image"
import { getImgUrl } from "@/utils/utils"
export default function CreateModat({ open, handleClose, handleSubmit, tags }) {
  const inititalValues = {
    name: "",
    url: "",
    order_number: "",
    tags: [],
  }

  const [values, handleChange, setValues] = useFormValues(inititalValues)

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

  const handleChangeFile = async (e) => {
    let file = e.target.files[0]
    const uploadedFile = await uploadFileRequest(file)
    setUploadedFile(uploadedFile)
  }

  function handleChangeSelect(e) {
    const tags = e.target.value
    let diff = tags.filter((x) => !values.tags.includes(x))
    let newElem = diff[0]
    let newElemId = newElem.id
    const found = values.tags.find((element) => element.id == newElemId)
    let newTagsArr = [...values.tags]

    if (found) {
      newTagsArr = newTagsArr.filter((e) => e.id !== newElemId)
    } else {
      newTagsArr.push(newElem)
    }

    setValues((values) => ({
      ...values,
      tags: newTagsArr,
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
    if (!uploadedFile.name) {
      isErrors = true
      errors.img = "Required"
    }

    if (isErrors) {
      setErrors(errors)
    } else {
      let sendData = {
        ...values,
        uploadedFile: uploadedFile.name,
      }
      setValues(inititalValues)
      setUploadedFile(fileInitialValue)
      handleSubmit(sendData)
    }
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new portfolio</DialogTitle>
        <DialogContent>
          <TextField
            error={errors.name ? true : false}
            onChange={(e) => handleChange(e)}
            name="name"
            //autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={values.name}
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
            value={values.img}
            helperText={errors.img}
          />

          <TextField
            error={errors.url ? true : false}
            onChange={(e) => handleChange(e)}
            name="url"
            margin="dense"
            id="url"
            label="Url"
            type="text"
            fullWidth
            variant="standard"
            value={values.url}
            helperText={errors.url}
          />

          <TextField
            error={errors.order_number ? true : false}
            onChange={(e) => handleChange(e)}
            name="order_number"
            margin="dense"
            id="order_number"
            label="Order"
            type="number"
            fullWidth
            variant="standard"
            value={values.order_number}
            helperText={errors.order_number}
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-tags-label">Tags</InputLabel>
            <Select
              name="tags"
              labelId="multiple-tags-label"
              id="multiple-tags"
              multiple
              value={values.tags}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleValidateAndSubmit(values)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
