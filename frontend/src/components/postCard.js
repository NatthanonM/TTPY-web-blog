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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";

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

const useStyles = makeStyles({
  card: {
    width: "80vw",
  },
});

function formatDatetime(timestamp) {
  const datetime = new Date(timestamp);
  const datevalues = [
    datetime.getFullYear(),
    datetime.getMonth() + 1,
    datetime.getDate(),
    datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours(),
    datetime.getMinutes() < 10
      ? "0" + datetime.getMinutes()
      : datetime.getMinutes(),
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[[datevalues[1]]]} ${datevalues[0]}, ${datevalues[2]} ${
    datevalues[3]
  }:${datevalues[4]}`;
}

function EditDialog(props) {
  const { onClose, open, postContent, setPostContent } = props;
  const [value, setValue] = useState(postContent);

  useEffect(() => {
    setValue(postContent);
  }, [open]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    setPostContent(value);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <Grid
        container
        item
        direction="column"
        justify="center"
        style={{ padding: 16 }}
      >
        <Grid container item xs={12} justify="center" style={{ padding: 8 }}>
          <Typography variant="h5">Edit post</Typography>
        </Grid>
        <Grid container item xs={12} justify="center" style={{ padding: 8 }}>
          <CssTextField
            placeholder="Write comment..."
            multiline
            variant="outlined"
            style={{
              color: "black",
              width: "100%",
            }}
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid container item xs={12} justify="center" style={{ padding: 8 }}>
          <SaveButton fullWidth variant="contained" onClick={handleSave}>
            Save
          </SaveButton>
        </Grid>
      </Grid>
    </Dialog>
  );
}

function DeleteDialog(props) {
  const { onClose, open, handleDelete } = props;

  const handleConfirm = () => {
    handleDelete();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <Grid container item justify="center" style={{ padding: 16 }}>
        <Grid container item xs={12} justify="center" style={{ padding: 8 }}>
          <Typography variant="h5">Confirm delete</Typography>
        </Grid>
        <Grid container item xs={12} justify="center" style={{ padding: 8 }}>
          <Typography variant="h6">Do you want to delete this post?</Typography>
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

function PostCard({ post, handleDeletePost }) {
  const classes = useStyles();

  const { id, owner, datetime, content } = post;

  const [postContent, setPostContent] = useState(content);
  const [editing, setEditting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

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
  };

  const handleDeleteOpen = () => {
    handlePopoverClose();
    setDeleting(true);
  };
  const handleDeleteClose = () => {
    setDeleting(false);
  };

  const handleDelete = () => {
    handleDeletePost(id);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <Grid item style={{ padding: 8 }}>
      <EditDialog
        onClose={handleEditClose}
        open={editing}
        postContent={postContent}
        setPostContent={setPostContent}
      />
      <DeleteDialog
        onClose={handleDeleteClose}
        open={deleting}
        handleDelete={handleDelete}
      />
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              label="ownerAvatar"
              style={{
                backgroundColor:
                  PALETTE_26[owner.slice(0, 1).toUpperCase().charCodeAt() - 65]
                    .backgroundColor,
                color:
                  PALETTE_26[owner.slice(0, 1).toUpperCase().charCodeAt() - 65]
                    .color,
              }}
            >
              {owner.slice(0, 1)}
            </Avatar>
          }
          action={
            <div>
              <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
              </Popover>
              <IconButton label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </div>
          }
          title={owner}
          subheader={formatDatetime(datetime)}
        />
        <CardContent>
          <Typography variant="body2" component="p">
            {postContent}
          </Typography>
        </CardContent>
        <CardActions style={{ padding: 16 }}>
          <Avatar
            label="commentatorAvatar"
            style={{
              backgroundColor:
                PALETTE_26[owner.slice(0, 1).toUpperCase().charCodeAt() - 65]
                  .backgroundColor,
              color:
                PALETTE_26[owner.slice(0, 1).toUpperCase().charCodeAt() - 65]
                  .color,
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
      </Card>
    </Grid>
  );
}

export default PostCard;
