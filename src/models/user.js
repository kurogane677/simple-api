const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tokenExpiredAt: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// Hash the password before saving
User.beforeSave(async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;
