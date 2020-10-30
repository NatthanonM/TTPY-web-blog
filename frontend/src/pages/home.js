import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PostCard from "../components/postCard";
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

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
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
        {posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              handleDeletePost={handleDeletePost}
            />
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
