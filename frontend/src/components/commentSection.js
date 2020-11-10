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
import API from "../utils/api";
import { useHistory } from "react-router-dom";

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

let comment_id = 5;

function CommentSection({
  postId,
  comments,
  userProfile,
  // handleEditComment,
  // handleDeleteComment,
}) {
  const classes = useStyles();
  const history = useHistory();

  const [postComments, setPostComments] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(false);

  const handleDelete = (id) => {
    setPostComments(postComments.filter((comment) => comment.id !== id));
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
    setError(false);
  };

  const onClick = () => {
    setError(false);
  };

  const handleNewComment = async (postId, newComment) => {
    const res = await API.uploadComment(postId, newComment);
    switch (res.statusCode) {
      case 201:
        window.location.reload();
        break;
      case 400:
        alert(res.message);
        break;
      case 401:
        history.push("/login");
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

  const handleSendCommment = () => {
    if (!newComment.length) {
      setError(true);
    } else {
      // setPostComments([
      //   {
      //     id: comment_id,
      //     owner: "Suchut Sapsathien",
      //     datetime: Date.now(),
      //     content: newComment,
      //   },
      //   ...postComments,
      // ]);
      // comment_id = comment_id + 1;
      handleNewComment(postId, newComment);
      setError(false);
      // setNewComment("");
    }
  };

  return (
    <>
      <CardActions className={classes.padding}>
        <Avatar
          label="commentatorAvatar"
          style={{
            backgroundColor:
              PALETTE_26[
                userProfile.username.slice(0, 1).toUpperCase().charCodeAt() - 65
              ].backgroundColor,
            color:
              PALETTE_26[
                userProfile.username.slice(0, 1).toUpperCase().charCodeAt() - 65
              ].color,
          }}
        >
          {userProfile.username.slice(0, 1).toUpperCase()}
        </Avatar>
        <CssTextField
          placeholder="Write comment..."
          size="small"
          variant="outlined"
          style={{
            color: "black",
            width: "100%",
          }}
          value={newComment}
          onChange={handleNewCommentChange}
          onClick={onClick}
          error={error}
        />
        <IconButton label="sendComment" onClick={handleSendCommment}>
          <SendIcon style={{ color: "#1877F2" }} />
        </IconButton>
      </CardActions>
      {postComments.map((comment) => {
        return (
          <CommentCard
            key={comment.commentId}
            postId={postId}
            comment={comment}
            handleDelete={handleDelete}
            userProfile={userProfile}
            // handleEditComment={handleEditComment}
            // handleDeleteComment={handleDeleteComment}
          />
        );
      })}
    </>
  );
}

export default CommentSection;
