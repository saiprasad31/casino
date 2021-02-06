import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#c0c0c0",
    boxShadow: "0 1px 1px #D7D8D9",
    bottom: 0,
    top: "auto",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <>
      <AppBar
        color="transparent"
        classes={{ root: classes.header }}
        position="fixed"
      >
        <Grid container justify="center">
          <Grid item>
            <Typography variant="subtitle1">© Casino, 2021</Typography>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
};

export default Footer;
