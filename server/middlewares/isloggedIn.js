module.exports = {
  isLoggedIn: (req, res, next) => {
    req.session.currentUser ? next() : res.status(401).send("No estas autorizado para esto");
  },
};
