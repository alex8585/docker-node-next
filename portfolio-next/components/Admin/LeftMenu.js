import * as React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import PeopleIcon from "@material-ui/icons/People"
import Link from "next/link"
import List from "@material-ui/core/List"
import { useRouter } from "next/router"

import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles((theme) => ({
  link: {
    "& .MuiButtonBase-root.Mui-disabled.MuiListItem-root.MuiListItem-gutters.active":
      {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        opacity: 1,
      },
  },
}))

const LeftMenu = () => {
  const { asPath } = useRouter()

  const classes = useStyles()

  return (
    <div>
      <List className={classes.link}>
        <Link href="/admin">
          <ListItem
            button
            className={asPath == "/admin" ? "active" : ""}
            disabled={asPath == "/admin"}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        <Link href="/admin/tags">
          <ListItem
            button
            className={asPath == "/admin/tags" ? "active" : ""}
            disabled={asPath == "/admin/tags"}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItem>
        </Link>

        <Link href="/admin/portfolios">
          <ListItem
            button
            className={asPath == "/admin/portfolios" ? "active" : ""}
            disabled={asPath == "/admin/portfolios"}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Portfolios" />
          </ListItem>
        </Link>
      </List>
    </div>
  )
}
export default LeftMenu
