import * as React from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/styles"
import { deleteUserFromLocalStorage } from "../../utils/utils"
import useUser from "../../hooks/useUser"
//import { useRouter } from "next/router"
import { unsetUser } from "../../actions/userActions"
import { useDispatch } from "react-redux"

const useStyles = makeStyles((theme) => ({
  menu: {
    "& .MuiButton-root.MuiButton-outlined": {
      color: "#fff",
    },
  },
}))
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()

  const handleLogout = () => {
    handleClose()
    deleteUserFromLocalStorage()
    dispatch(unsetUser())
  }

  const [user] = useUser()
  return (
    <div className={classes.menu}>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        {user && user.username ? user.username : "Dashboard"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
