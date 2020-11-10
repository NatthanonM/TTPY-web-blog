import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Grid, Typography } from "@material-ui/core";
import PostCard from "../components/postCard";
import NewPostCard from "../components/newPostCard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { posts as oriPosts } from "../mock";
import { useHistory } from "react-router-dom";
import API from "../utils/api";

const backgroundColor = "#F0F2F5";

const useStyles = makeStyles({
  root: {
    backgroundColor: backgroundColor,
    minHeight: "100vh",
  },
});

function Home() {
  const history = useHistory();
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [getAllPostError, setGetAllPostError] = useState(false);

  const getAllPost = async () => {
    const res = await API.getAllPost();

    switch (res.statusCode) {
      case 200:
        console.log(res.data);
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
        history.push("/login");
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

  // const handleEditPost = (id, newContent) => {
  //   setPosts(
  //     posts.map((post) => {
  //       if (post.id === id) post.content = newContent;
  //       return post;
  //     })
  //   );
  // };

  // const handleDeletePost = (id) => {
  //   setPosts(posts.filter((post) => post.id !== id));
  // };

  // const handleNewPost = (content) => {
  //   setPosts([
  //     {
  //       id: posts.length + 1,
  //       owner: "S",
  //       datetime: Date.now(),
  //       content: content,
  //       comments: [],
  //     },
  //     ...posts,
  //   ]);
  // };

  // const handleNewComment = (postId, comment) => {
  //   setPosts(
  //     posts.map((post) => {
  //       if (post.id === postId) {
  //         post.comments = [
  //           {
  //             id: comment_id,
  //             owner: "Suchut Sapsathien",
  //             datetime: Date.now(),
  //             content: comment,
  //           },
  //           ...post.comments,
  //         ];
  //       }
  //       return post;
  //     })
  //   );
  //   comment_id = comment_id + 1;
  // };

  // const handleEditComment = (postId, commentId, newComment) => {
  //   let newPosts = [...posts];
  //   for (let i = 0; i < newPosts.length; i++) {
  //     if (newPosts[i]["id"] === postId) {
  //       for (let j = 0; j < newPosts[i]["comments"].length; j++) {
  //         if (newPosts[i]["comments"][j].id === commentId) {
  //           newPosts[i]["comments"][j].content = newComment;
  //           setPosts(newPosts);
  //           return;
  //         }
  //       }
  //     }
  //   }
  // };

  // const handleDeleteComment = (postId, commentId) => {
  //   let newPosts = posts;
  //   console.log(posts);
  //   for (let i = 0; i < newPosts.length; i++) {
  //     if (newPosts[i]["id"] === postId) {
  //       newPosts[i]["comments"] = newPosts[i]["comments"].filter(
  //         (comment) => comment.id === commentId
  //       );
  //       setPosts(newPosts);
  //       console.log(newPosts);
  //       return;
  //     }
  //   }
  // };

  return (
    <div className={classes.root}>
      <Grid
        container
        item
        direction="row"
        justify="center"
        style={{ padding: 24 }}
      >
        <NewPostCard
        // handleNewPost={handleNewPost}
        />
        {getAllPostError ? (
          <Typography>Something went wrong</Typography>
        ) : (
          posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                // handleEditPost={handleEditPost}
                // handleDeletePost={handleDeletePost}
                // handleNewComment={handleNewComment}
                // handleEditComment={handleEditComment}
                // handleDeleteComment={handleDeleteComment}
              />
            );
          })
        )}
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
