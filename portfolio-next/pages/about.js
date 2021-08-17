
import React from "react"

import Grid from "@material-ui/core/Grid"

import Typography from "@material-ui/core/Typography"
 import { makeStyles } from "@material-ui/styles"

//import { makeStyles } from "@material-ui/core/styles"

import { useDispatch, useSelector } from "react-redux"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"

import ListItemText from "@material-ui/core/ListItemText"

import { listPortfolios } from "../actions/portfolioActions"
import ButtonBase from "@material-ui/core/ButtonBase"
import Avatar from "@material-ui/core/Avatar"
import Container from "@material-ui/core/Container"
import FrontendLayout from "../components/FrontendLayout"
import Head from 'next/head';

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
  heroContent: {
    padding: "20px 0px 5px",
  },
  ListItemText: {
    "& .MuiTypography-body2": {
      fontWeight: "bold",
    },
  },
}))
const About = ({ match, location, history }) => {
  const classes = useStyles()

  
  return (

    <FrontendLayout>
     <Head>
        <title>About me</title>
        <meta
          name="description"
          content="About alex 85 page with contacts"
        />
      </Head> 
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          About me
        </Typography>
      </Container>
      <Container  maxWidth="md" component="main" className={classes.heroContent}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <Avatar
                className={classes.large}
                alt="Remy Sharp"
                src="uploads/profile.jpg"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Hi, there! I am a Full Stack Web Developer from Ukraine with
                  over 7+ years of experience in software development and
                  maintenance.
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Now I work with these technologies:
                </Typography>
                <List dense={true} className={classes.ListItemText}>
                  <ListItem>
                    <ListItemText primary="- PHP / Laravel / WordPress" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="- JS / React.js / Vue.js" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="- MySQL / MogngoDB" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="- Linux / Windows" />
                  </ListItem>
                </List>

                <div>
                  <List dense={true}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="uploads/gmail3.png"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="blyakher85@gmail.com" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="uploads/telegram2.png"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="@cumar85" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="uploads/skype2.png"></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="cumar8585" />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FrontendLayout>
  )
}

export default About 


