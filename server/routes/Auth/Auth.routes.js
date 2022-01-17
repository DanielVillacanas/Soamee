const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User.model");

const router = require("express").Router();

router.post("/signUp", (req, res) => {
  let { userName, password } = req.body;

  User.findOne({ userName })
    .populate("favBooks")
    .then((response) => {
      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      response !== null
        ? res.status(500).send("Error usuario ya registrado")
        : User.create({ userName, password: hashPass }).then((user) => {
            req.session.currentUser = user;
            return res.json(user);
          });
    })
    .catch((err) => res.status(500).send({ err }));
});

router.post("/login", (req, res) => {
  const { userName, password } = req.body;

  User.findOne({ userName })
    .populate("favBooks")
    .then((user) => {
      bcrypt.compareSync(password, user.password)
        ? ((req.session.currentUser = user), res.json({ user: user }))
        : res.status(500).send("Error contraseña incorrecta!");
    })
    .catch((err) => res.status(500).send("Error al incio de sesión, compruebe usuario/contraseña"));
});

router.get("/isLoggedIn", (req, res) => {
  req.session.currentUser
    ? res.json(req.session.currentUser)
    : res.status(401).json({ code: 401, message: "Unauthorized" });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => res.status(200).json({ code: 200, message: "Logout successful" }));
});

module.exports = router;
