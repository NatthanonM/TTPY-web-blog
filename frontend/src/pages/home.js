import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Grid } from "@material-ui/core";
import PostCard from "../components/postCard";
import NewPostCard from "../components/newPostCard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { posts as oriPosts } from "../mock";

const backgroundColor = "#F0F2F5";

const useStyles = makeStyles({
  root: {
    backgroundColor: backgroundColor,
    minHeight: "100vh",
  },
});

function Home() {
  const classes = useStyles();
  const [posts, setPosts] = useState(oriPosts);

  const handleLogout = () => {
    alert("logout");
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleNewPost = (content) => {
    setPosts([
      {
        id: posts.length + 1,
        owner: "S",
        datetime: Date.now(),
        content: content,
      },
      ...posts,
    ]);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        item
        direction="row"
        justify="center"
        style={{ padding: 24 }}
      >
        <NewPostCard handleNewPost={handleNewPost} />
        {posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              handleDeletePost={handleDeletePost}
            />
          );
        })}
        <Fab
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
        </Fab>
      </Grid>
    </div>
  );
}

export default Home;
