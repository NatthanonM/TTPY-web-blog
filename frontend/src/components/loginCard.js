import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import API from "../utils/api";

const useStyles = makeStyles({
  card: {
    width: "80vw",
  },
});

function LoginCard() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onClick = () => {
    setError(false);
  };

  const onUsername = (event) => {
    setUsername(event.target.value);
    setError(false);
  };

  const onPassword = (event) => {
    setPassword(event.target.value);
    setError(false);
  };

  const login = async () => {
    const res = await API.login(username, password);

    if (res.status === "success") {
      window.location.reload();
    } else {
      console.log(res.message);
      setError(true);
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      login();
    }
  };

  return (
    <Grid item style={{ padding: 8, margin: "auto" }}>
      <Card className={classes.card} style={{ width: "100%" }}>
        <CardActions style={{ padding: 16, paddingTop: 50, paddingBottom: 50 }}>
          <Grid container item direction="column" justify="center">
            <Avatar
              label="commentatorAvatar"
              style={{ margin: "auto", width: 64, height: 64 }}
            >
              TT-PY
            </Avatar>
            <TextField
              label="Username"
              size="small"
              variant="outlined"
              style={{
                marginTop: "16px",
                width: "300px",
              }}
              value={username}
              onChange={onUsername}
              onClick={onClick}
              onKeyDown={handleKeypress}
              error={error}
            />
            <TextField
              label="Password"
              size="small"
              variant="outlined"
              type="password"
              style={{
                marginTop: "16px",
                marginBottom: "16px",
                width: "300px",
              }}
              value={password}
              onChange={onPassword}
              onClick={onClick}
              onKeyDown={handleKeypress}
              error={error}
            />
            <Button
              id="Submit"
              variant="contained"
              style={{
                background: "#404044",
                color: "#FFFFFF",
                boxShadow: "none",
              }}
              onClick={login}
            >
              SIGN IN
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default LoginCard;
