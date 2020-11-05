import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import LoginCard from "../components/loginCard";
import { posts as oriPosts } from "../mock";

const backgroundColor = "#F0F2F5";

const useStyles = makeStyles({
  root: {
    backgroundColor: backgroundColor,
    minHeight: "100vh",
  },
});

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        item
        direction="column"
        justify="center"
        style={{ padding: 24, height: "100vh" }}
      >
        <LoginCard />
      </Grid>
    </div>
  );
}

export default Login;
