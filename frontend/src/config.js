const api = {
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET || "",
  BACKEND_URI: process.env.REACT_APP_BACKEND_URI || "http://localhost:8089",
};

export default api;
