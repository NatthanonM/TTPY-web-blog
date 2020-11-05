import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import formatter from "../utils/formatter";

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

const SaveButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#1877F2",
    "&:hover": {
      backgroundColor: "#1877F2",
    },
  },
}))(Button);

const DeleteButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#FA383E",
    "&:hover": {
      backgroundColor: "#FA383E",
    },
  },
}))(Button);

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: "0.875rem",
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

function DeleteDialog(props) {
  const { onClose, open, handleDelete } = props;

  const handleConfirm = () => {
    handleDelete();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <Grid container item justify="center" style={{ padding: 16 }}>
        <Grid container item xs={12} justify="center" style={{ padding: 8 }}>
          <Typography variant="h5">Confirm delete</Typography>
        </Grid>
        <Grid container item xs={12} justify="center" style={{ padding: 8 }}>
          <Typography variant="h6">
            Do you want to delete this comment?
          </Typography>
        </Grid>
        <Grid container item xs={6} justify="center" style={{ padding: 8 }}>
          <DeleteButton fullWidth variant="contained" onClick={handleConfirm}>
            Delete
          </DeleteButton>
        </Grid>
        <Grid container item xs={6} justify="center" style={{ padding: 8 }}>
          <Button fullWidth variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}

function CommentCard({
  postId,
  comment,
  handleDelete,
  handleEditComment,
  handleDeleteComment,
}) {
  const classes = useStyles();

  const { id, owner, datetime, content } = comment;

  const [commentContent, setCommentContent] = useState(content);
  const [error, setError] = useState(false);

  const onChange = (event) => {
    setCommentContent(event.target.value);
    setError(false);
  };

  const onClick = () => {
    setError(false);
  };

  const [editing, setEditting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  // useEffect(() => {
  //   setCommentContent(content);
  // }, [editing]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    handlePopoverClose();
    setEditting(true);
  };
  const handleEditClose = () => {
    setEditting(false);
    // setCommentContent(comment);
  };

  const handleDeleteOpen = () => {
    handlePopoverClose();
    setDeleting(true);
  };
  const handleDeleteClose = () => {
    setDeleting(false);
  };

  const handleSave = () => {
    if (!commentContent.length) {
      setError(true);
    } else {
      handleEditComment(postId, id, commentContent);
      setEditting(false);
    }
  };

  const handleDeleteDialog = () => {
    handleDelete(id);
    handleDeleteComment(postId, id);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <>
      <DeleteDialog
        onClose={handleDeleteClose}
        open={deleting}
        handleDelete={handleDeleteDialog}
      />
      <CardActions className={classes.padding}>
        <Grid container>
          <Grid item>
            <Avatar
              label="commentatorAvatar"
              style={{
                backgroundColor:
                  PALETTE_26[
                    owner.slice(0, 1).slice(0, 1).toUpperCase().charCodeAt() -
                      65
                  ].backgroundColor,
                color:
                  PALETTE_26[
                    owner.slice(0, 1).slice(0, 1).toUpperCase().charCodeAt() -
                      65
                  ].color,
              }}
            >
              {owner.slice(0, 1)}
            </Avatar>
          </Grid>
          <Grid item style={{ marginLeft: 8, maxWidth: "80%" }}>
            <Card style={{ backgroundColor: "#F2F3F5", maxWidth: "100%" }}>
              <CardHeader
                className={classes.padding}
                style={{ paddingRight: 8, maxWidth: "100%" }}
                action={
                  <div>
                    <Popover
                      id={popoverId}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
                      <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
                    </Popover>
                    <IconButton label="settings" onClick={handleClick}>
                      <MoreHorizIcon />
                    </IconButton>
                  </div>
                }
                title={
                  <Typography variant="body2" component="p">
                    {owner}
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" component="p">
                    {formatter.formatDatetime(datetime)}
                  </Typography>
                }
              />
              <CardContent
                className={classes.padding}
                style={{ maxWidth: "100%" }}
              >
                <Grid container style={{ width: "100%" }}>
                  {editing ? (
                    <>
                      <Grid item xs={12}>
                        <CssTextField
                          size="small"
                          value={commentContent}
                          variant="outlined"
                          multiline
                          fullWidth
                          error={error}
                          onChange={onChange}
                          onClick={onClick}
                          style={{
                            fontSize: 8,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} style={{ padding: 8, width: "20vw" }}>
                        <SaveButton
                          fullWidth
                          variant="contained"
                          onClick={handleSave}
                        >
                          Save
                        </SaveButton>
                      </Grid>
                      <Grid item xs={6} style={{ padding: 8, width: "20vw" }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handleEditClose}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <Typography variant="body2" component="p">
                      {commentContent}
                    </Typography>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
}

export default CommentCard;
