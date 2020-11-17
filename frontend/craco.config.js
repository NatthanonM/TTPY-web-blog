module.exports = {
  devServer: {
    headers: {
      "X-Frame-Options": "sameorigin",
    },
  },
};

// "Content-Security-Policy": "default-src 'self';base-uri 'self';object-src 'self';script-src 'self';style-src 'self';frame-ancestors 'self'",
