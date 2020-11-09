import config from "../config";

const API = {
  login: async (username, password) => {
    const URL = `${config.BACKEND_URI}/auth/login`;
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },
  getAllPost: async () => {
    const URL = `${config.BACKEND_URI}/post/getAllPosts`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.json();
  },
  uploadPost: async (content) => {
    const URL = `${config.BACKEND_URI}/post/upload`;
    console.log(content);
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  },
  deletePost: async (postId) => {
    const URL = `${config.BACKEND_URI}/post/delete/${postId}`;
    const response = await fetch(URL, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.json();
  },
  editPost: async (postId, content) => {
    const URL = `${config.BACKEND_URI}/post/edit/${postId}`;
    const response = await fetch(URL, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  },
  uploadComment: async (postId, content) => {
    const URL = `${config.BACKEND_URI}/comment/upload/`;
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId, content }),
    });
    return response.json();
  },
  editComment: async (commentId, content) => {
    const URL = `${config.BACKEND_URI}/comment/edit/${commentId}`;
    const response = await fetch(URL, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  },
};

export default API;
