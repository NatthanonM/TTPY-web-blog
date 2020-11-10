import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router-dom";
import API from "../utils/api";

const PALETTE_26 = [
  { color: "#FFFFFF", backgroundColor: "black" },
  { color: "#F0A3FF", backgroundColor: "black" },
  { color: "#0075DC", backgroundColor: "#F0F2F5" },
  { color: "#993F00", backgroundColor: "#F0F2F5" },
  { color: "#4C005C", backgroundColor: "#F0F2F5" },
  { color: "#191919", backgroundColor: "#F0F2F5" },
  { color: "#005C31", backgroundColor: "#F0F2F5" },
  { color: "#2BCE48", backgroundColor: "black" },
  { color: "#808080", backgroundColor: "#F0F2F5" },
  { color: "#94FFB5", backgroundColor: "black" },
  { color: "#8F7C00", backgroundColor: "#F0F2F5" },
  { color: "#9DCC00", backgroundColor: "#F0F2F5" },
  { color: "#C20088", backgroundColor: "#F0F2F5" },
  { color: "#003380", backgroundColor: "#F0F2F5" },
  { color: "#FFA405", backgroundColor: "#F0F2F5" },
  { color: "#FFA8BB", backgroundColor: "#F0F2F5" },
  { color: "#426600", backgroundColor: "#F0F2F5" },
  { color: "#FF0010", backgroundColor: "#F0F2F5" },
  { color: "#5EF1F2", backgroundColor: "black" },
  { color: "#00998F", backgroundColor: "#F0F2F5" },
  { color: "#E0FF66", backgroundColor: "black" },
  { color: "#740AFF", backgroundColor: "#F0F2F5" },
  { color: "#990000", backgroundColor: "black" },
  { color: "#FFFF80", backgroundColor: "black" },
  { color: "#FFFF00", backgroundColor: "black" },
  { color: "#FFFFFF", backgroundColor: "#F0F2F5" },
];

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "#1877F2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1877F2",
        borderWidth: 2,
      },
    },
  },
})(TextField);

const useStyles = makeStyles({
  card: {
    width: "80vw",
    borderRadius: 16,
  },
});

function NewPostCard({ userProfile }) {
  const history = useHistory();
  const classes = useStyles();

  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const onChange = (event) => {
    setContent(event.target.value);
    setError(false);
  };

  const onClick = () => {
    setError(false);
  };

  const handleNewPost = async (content) => {
    const res = await API.uploadPost(content);
    switch (res.statusCode) {
      case 201:
        window.location.reload();
        break;
      case 403:
        alert(res.message);
        break;
      case 500:
        alert(res.message);
        break;
      default:
        alert("Something went wrong");
        break;
    }
  };

  const handleSend = () => {
    if (!content.length) {
      return setError(true);
    }
    console.log(content);
    handleNewPost(content);
    // setContent("");
  };

  return (
    <Grid item style={{ padding: 8 }}>
      <Card className={classes.card}>
        <CardActions style={{ padding: 16 }}>
          <Avatar
            label="commentatorAvatar"
            style={{
              backgroundColor:
                PALETTE_26[
                  userProfile.username.slice(0, 1).toUpperCase().charCodeAt() -
                    65
                ].backgroundColor,
              color:
                PALETTE_26[
                  userProfile.username.slice(0, 1).toUpperCase().charCodeAt() -
                    65
                ].color,
            }}
          >
            {userProfile.username.slice(0, 1).toUpperCase()}
          </Avatar>
          <CssTextField
            placeholder="Post something..."
            size="small"
            variant="outlined"
            style={{
              width: "100%",
            }}
            value={content}
            onChange={onChange}
            onClick={onClick}
            error={error}
          />
          <IconButton label="sendComment" onClick={handleSend}>
            <SendIcon style={{ color: "#1877F2" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default NewPostCard;
