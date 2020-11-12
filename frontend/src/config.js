const api = {
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET || "",
  BACKEND_URI: process.env.REACT_APP_BACKEND_URI || "http://localhost:8000",
  CRYTPTO_KEY: process.env.REACT_APP_CRYPTO_KEY || "",
  CRYPTO_ALGORITHM: process.env.REACT_APP_CRYPTO_ALGORITHM || "aes-128-cbc",
};

export default api;
