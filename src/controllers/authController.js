const User = require("../models/user");
const bcrypt = require("../config/bcrypt");
const jwt = require("../config/jwt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isValidPassword = await bcrypt.comparePassword(
      password,
      user.password
    );
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.generateToken({ id: user.id, username: user.username });
    user.accessToken = token;
    user.tokenExpiredAt = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now
    await user.save();

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
