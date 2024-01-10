const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await Users.create({
    username: username,
    password: hash,
  });

  res.json("Successfully created account : " + username);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User does not exist" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.json({ error: "Wrong username or password" });
    return;
  }

  res.json("Logged in successfully as: " + user.username);
});

module.exports = router;
