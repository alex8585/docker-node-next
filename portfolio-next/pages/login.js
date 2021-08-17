import React, { useState, useEffect } from "react"

import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/styles"

import Container from "@material-ui/core/Container"
import FrontendLayout from "../components/FrontendLayout"
import Head from "next/head"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useDispatch, useSelector } from "react-redux"
import Alert from "@material-ui/core/Alert"
import { loginAttempt } from "../actions/userActions"
import useUser from "../hooks/useUser"

import { useRouter } from "next/router"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "960px",
    margin: "0 auto",
    marginTop: 50,
  },
  paper: {
    padding: "12px",
    marginTop: 20,
    maxWidth: 960,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  large: {
    width: "120px",
    height: "120px",
  },
  heroTitle: {
    padding: "20px 0px 5px",
  },
  heroContent: {
    minHeight: "80vh",
    padding: "20px 0px 5px",
  },

  formGroup: {
    textAlign: "center",
  },

  ListItemText: {
    "& .MuiTypography-body2": {
      fontWeight: "bold",
    },
  },
}))
const About = ({ match, location, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const [user, userLoaded, error] = useUser()

  if (userLoaded && user) {
    router.push("/admin")
  }

  function handleChange(e) {
    const key = e.target.name
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  async function handleSubmit() {
    //console.log(values)
    if (!values.email || !values.password) {
      return
    }

    await dispatch(loginAttempt(values))
  }

  return (
    <FrontendLayout>
      <Head>
        <title>Login page</title>
        <meta name="description" content="Please login" />
      </Head>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Login page
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className={classes.formGroup}>
            <TextField
              name="email"
              onChange={(e) => handleChange(e)}
              id="outlined-helperText"
              label="Email"
              variant="standard"
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              name="password"
              onChange={(e) => handleChange(e)}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          </div>

          <div className={classes.formGroup}>
            <Button variant="contained" onClick={() => handleSubmit()}>
              Login
            </Button>
          </div>
        </Box>
      </Container>
    </FrontendLayout>
  )
}

export default About
