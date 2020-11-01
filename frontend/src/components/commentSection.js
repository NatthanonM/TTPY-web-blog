import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SendIcon from "@material-ui/icons/Send";
import formatter from "../utils/formatter";
import CommentCard from "./commentCard";

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
    width: "80%",
  },
  cardHeader: {
    title: {
      fontSize: "0.875rem",
    },
    subheader: {
      fontSize: "0.875rem",
    },
  },
  padding: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    "&:last-child": {
      paddingBottom: 8,
    },
  },
});

function CommentSection({
  postId,
  comments,
  handleEditComment,
  handleDeleteComment,
}) {
  const classes = useStyles();

  const [postComments, setPostComments] = useState(comments);

  const handleDelete = (id) => {
    setPostComments(postComments.filter((comment) => comment.id !== id));
  };

  return (
    <>
      <CardActions className={classes.padding}>
        <Avatar
          label="commentatorAvatar"
          style={{
            backgroundColor:
              PALETTE_26["S".slice(0, 1).toUpperCase().charCodeAt() - 65]
                .backgroundColor,
            color:
              PALETTE_26["S".slice(0, 1).toUpperCase().charCodeAt() - 65].color,
          }}
        >
          S
        </Avatar>
        <CssTextField
          placeholder="Write comment..."
          size="small"
          variant="outlined"
          style={{
            color: "black",
            width: "100%",
          }}
        />
        <IconButton label="sendComment">
          <SendIcon style={{ color: "#1877F2" }} />
        </IconButton>
      </CardActions>
      {postComments.map((comment) => {
        return (
          <CommentCard
            key={comment.id}
            postId={postId}
            comment={comment}
            handleDelete={handleDelete}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
          />
        );
      })}
    </>
  );
}

export default CommentSection;
