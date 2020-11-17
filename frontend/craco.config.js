module.exports = {
  devServer: {
    headers: {
      "X-Frame-Options": "sameorigin",
      "Content-Security-Policy":
        "script-src 'self' localhost:3000; frame-ancestors localhost:3000;",
    },
  },
};
