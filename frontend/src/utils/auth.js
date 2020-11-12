const auth = {
  isOwner: (usernameTarget, usernameLoggedIn) => {
    return usernameTarget === usernameLoggedIn;
  },
  isModerator: (roleLoggedIn) => {
    return roleLoggedIn === "moderator";
  },
};

export default auth;
