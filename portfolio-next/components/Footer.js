import React from "react"
import Box from "@material-ui/core/Box"
import Copyright from "../components/Copyright"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles((theme) => ({
  footer: {
   // borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: "16px",
    paddingTop: "16px",
    paddingBottom: "6px",
    // [theme.breakpoints.up("sm")]: {
    //   paddingTop: theme.spacing(6),
    //   paddingBottom: theme.spacing(6),
    // },
  },
}))


const Footer = () => {
  const classes = useStyles()
  return (
    <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={4} justify="space-evenly">
        {/* {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="textSecondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))} */}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Footer
