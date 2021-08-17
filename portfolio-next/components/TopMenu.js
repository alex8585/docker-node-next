import React from "react"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar" 
import { makeStyles } from "@material-ui/styles"

//import { makeStyles } from "@material-ui/core/styles"
import Link from 'next/link'

import { useRouter } from 'next/router'
const useStyles = makeStyles((theme) => ({
  appBar: {
    //borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    "& a":{
      fontSize: "0.875rem",
      fontWeight: "600",
      lineHeight: "1.75",
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      color: "rgba(0, 0, 0, 0.87)",
      margin: "8px 12px",
      textDecoration: "none",
    }
  },
}))

const TopMenu = () => {
  const classes = useStyles()
  const { asPath } = useRouter()

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Alex85 programmer
        </Typography>
        <nav className={classes.link}  >
            
          <Link  href="/" >
            <a className={ asPath == '/' && 'active'}>Portfolio</a>
          </Link>
          <Link
            href="/about"
          >
            <a className={ asPath == '/about' && 'active'}>About me</a>
            
          </Link>
        </nav>
      </Toolbar>
        <style jsx>{`
          .active {
            text-decoration: underline;
          }
        `}</style>
    </AppBar>
    
  )
}

export default TopMenu
