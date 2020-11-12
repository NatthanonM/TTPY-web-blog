import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Chip,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import PostCard from "../components/postCard";
import NewPostCard from "../components/newPostCard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { posts as oriPosts } from "../mock";
import { useHistory } from "react-router-dom";
import API from "../utils/api";
import auth from "../utils/auth";

const backgroundColor = "#F0F2F5";

const useStyles = makeStyles({
  root: {
    backgroundColor: backgroundColor,
    minHeight: "100vh",
  },
});

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

function Home({ userProfile }) {
  const history = useHistory();
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsloading] = useState(true);
  const [getAllPostError, setGetAllPostError] = useState(false);

  const getAllPost = async () => {
    const res = await API.getAllPost();

    switch (res.statusCode) {
      case 200:
        // console.log(res.data);
        setPosts(res.data);
        break;
      case 500:
        setGetAllPostError(true);
        console.log(res.message);
        break;
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const logout = async () => {
    const res = await API.logout();
    switch (res.statusCode) {
      case 200:
        window.location.reload();
        break;
      case 500:
        alert(res.message);
        break;
      default:
        alert("Something went wrong");
        break;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ height: 64 }}>
        {/* <NewPostCard /> */}
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          style={{
            height: 64,
            paddingLeft: 16,
            paddingRight: 16,
            background: "#3578E5",
          }}
        >
          <Grid
            item
            style={{
              paddingRight: 8,
            }}
          >
            <Avatar
              label="commentatorAvatar"
              style={{
                backgroundColor:
                  PALETTE_26[
                    userProfile.username
                      .slice(0, 1)
                      .toUpperCase()
                      .charCodeAt() - 65
                  ].backgroundColor,
                color:
                  PALETTE_26[
                    userProfile.username
                      .slice(0, 1)
                      .toUpperCase()
                      .charCodeAt() - 65
                  ].color,
              }}
            >
              {userProfile.username.slice(0, 1).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid
            item
            style={{
              paddingRight: 8,
            }}
          >
            <Typography>
              {auth.isModerator(userProfile.role)
                ? "<<MOD>> " + userProfile.username
                : userProfile.username}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              style={{
                backgroundColor: "#E4E6EB",
                boxShadow: 0,
                width: 48,
                height: 48,
              }}
              onClick={handleLogout}
            >
              <ExitToAppIcon
                style={{
                  backgroundColor: "#E4E6EB",
                  color: "#000000",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
      <Grid
        container
        item
        direction="row"
        justify="center"
        style={{ padding: 24, paddingTop: 24 + 64 }}
      >
        {userProfile.role === "user" ? (
          <NewPostCard userProfile={userProfile} />
        ) : (
          <></>
        )}
        {getAllPostError ? (
          <Typography>Something went wrong</Typography>
        ) : (
          posts.map((post) => {
            return (
              <PostCard
                key={post.postId}
                post={post}
                userProfile={userProfile}
                // handleEditPost={handleEditPost}
                // handleDeletePost={handleDeletePost}
                // handleNewComment={handleNewComment}
                // handleEditComment={handleEditComment}
                // handleDeleteComment={handleDeleteComment}
              />
            );
          })
        )}
        {/* <Fab
          color="primary"
          style={{
            position: "fixed",
            left: "calc(100% - 56px - 24px)",
            top: "calc(100% - 56px - 24px - 8px)",
            zIndex: "1",
            backgroundColor: "#FA383E",
          }}
          onClick={handleLogout}
        >
          <ExitToAppIcon style={{ backgroundColor: "#FA383E" }} />
        </Fab> */}
      </Grid>
    </div>
  );
}

export default Home;
