import AdminLayout from "../../../components/Admin/AdminLayout"
import React, { useState, useEffect } from "react"
import Box from "@material-ui/core/Box"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
//import dbConnect from "../../../utils/dbConnect"
//import Tag from "../../../models/tagModel.js"

import {
  getTags,
  setTags,
  createNewTag,
  deleteTag,
  editTag,
} from "../../../actions/tagActions"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/styles"
import moment from "moment"
import CreateModat from "../../../components/Admin/tags/CreateModat.js"
import DeleteConfirmModal from "../../../components/Admin/DeleteConfirmModal"
import EditModal from "../../../components/Admin/tags/EditModal"
import AdminTableHead from "../../../components/Admin/AdminTableHead"
import { wrapper } from "../../../store"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  topBtnsWrapp: {
    margin: "15px 0",
  },
  actionButton: {
    "& .MuiButton-root.MuiButton-contained.MuiButton-containedPrimary": {
      margin: "0px 5px",
    },
  },
}))

const headCells = [
  {
    id: "id",
    sortable: true,
    label: "ID",
  },
  {
    id: "name",
    sortable: true,
    label: "Name",
  },
  {
    id: "createdAt",
    sortable: true,
    label: "Created at",
  },
  {
    id: "actions",
    sortable: false,
    label: "Actions",
  },
]

let initPerPage = 5

const Tags = () => {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("name")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(initPerPage)

  const classes = useStyles()
  const dispatch = useDispatch()

  // Avoid a layout jump when reaching the last page with empty tags.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0

  const handleRequestSort = (event, field) => {
    const isAsc = orderBy === field && order === "asc"
    const newOrder = isAsc ? "desc" : "asc"
    setOrder(newOrder)
    setOrderBy(field)
    dispatch(getTags(page + 1, rowsPerPage, newOrder, field))
  }

  const { data: tags, total } = useSelector((state) => state.tagList)

  const handleChangePage = (event, newPage) => {
    dispatch(getTags(newPage + 1, rowsPerPage, order, orderBy))
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    let perPage = parseInt(event.target.value, 10)
    dispatch(getTags(1, perPage, order, orderBy))
    setRowsPerPage(perPage)
    setPage(0)
  }

  const dateFormat = (timestamp) => {
    timestamp = parseInt(timestamp)
    return moment(timestamp).format("DD-MM-YYYY:HH:MM")
  }

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [currentRow, setCurrentRow] = useState({})

  const openCreateModalHandler = () => {
    setOpenCreateModal(true)
  }

  const closeCreateModalHandler = () => {
    setOpenCreateModal(false)
  }
  const createSubminHanler = async (values) => {
    if (!values.name) {
      return
    }
    await dispatch(createNewTag(values))
    await dispatch(getTags(page + 1, rowsPerPage, order, orderBy))
    setOpenCreateModal(false)
  }

  const handleOpenDeleteConfirmModal = (row) => {
    setCurrentRow(row)
    setOpenDeleteConfirmModal(true)
  }

  const closeDeleteConfirmModalHandler = () => {
    setOpenDeleteConfirmModal(false)
  }

  const handleDeleteConfirm = async () => {
    await dispatch(deleteTag(currentRow.id))
    await dispatch(getTags(page + 1, rowsPerPage, order, orderBy))
    setOpenDeleteConfirmModal(false)
  }

  const handleOpenEditModal = (row) => {
    setCurrentRow(row)
    setOpenEditModal(true)
  }

  const closeEditModalHandler = () => {
    setOpenEditModal(false)
  }

  const handleEditSubmit = async () => {
    //console.log(currentRow)
    await dispatch(editTag(currentRow))
    await dispatch(getTags(page + 1, rowsPerPage, order, orderBy))
    setOpenEditModal(false)
  }

  return (
    <AdminLayout title="Tags">
      <CreateModat
        handleSubmit={createSubminHanler}
        open={openCreateModal}
        handleClose={closeCreateModalHandler}
      />
      <DeleteConfirmModal
        mtitle="Delete tag confirmation"
        currentRow={currentRow}
        handleConfirm={handleDeleteConfirm}
        open={openDeleteConfirmModal}
        handleClose={closeDeleteConfirmModalHandler}
      />

      <EditModal
        setCurrentRow={setCurrentRow}
        currentRow={currentRow}
        handleSubmit={handleEditSubmit}
        open={openEditModal}
        handleClose={closeEditModalHandler}
      />

      <Box sx={{ width: "100%" }}>
        <div className={classes.topBtnsWrapp}>
          <Button variant="contained" onClick={() => openCreateModalHandler()}>
            Create
          </Button>
        </div>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <AdminTableHead
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={tags.length}
              />
              <TableBody>
                {tags.slice().map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell> {row.id}</TableCell>
                      <TableCell> {row.name}</TableCell>
                      <TableCell align="left">
                        {dateFormat(row.createdTs)}
                      </TableCell>
                      <TableCell className={classes.actionButton}>
                        <Button
                          variant="contained"
                          onClick={() => handleOpenEditModal(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenDeleteConfirmModal(row)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </AdminLayout>
  )
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ preview }) => {
      // await dbConnect()
      // let tags = await Tag.find().limit(initPerPage)
      // let total = await Tag.countDocuments()
      // tags = JSON.parse(JSON.stringify(tags))
      // await store.dispatch(setTags(tags, total))
      await store.dispatch(getTags(1, initPerPage))
      return { revalidate: 1 }
    }
)

export default Tags
