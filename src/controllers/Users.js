const { users } = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { salt, secret_key } = require("../config");
const registerUser = async (req, res) => {
  const { body } = req;
  try {
    const saltedHash = await bcrypt.genSalt(parseInt(salt));
    const hashedPassword = await bcrypt.hash(body.password, saltedHash);
    const usr = await users.registerUser({ ...body, password: hashedPassword });
    res.status(200).json({ status: true, user: usr });
  } catch (error) {
    console.log("user err : ", error);
    res.status(500).json({ status: false, error: error });
  }
};

const loginUser = async (req, res) => {
  const { body } = req;

  try {
    const usr = await users.loginUser(body.username);

    if (usr.length === 0) {
      return res.status(200).json({
        status: false,
        message: "User name does not exist",
      });
    }

    const confirmUser = await bcrypt.compare(body.password, usr[0]?.password);

    if (!confirmUser) {
      return res.status(200).json({
        status: false,
        message: "Username or password is incorrect!",
      });
    }
    const token = jwt.sign(JSON.stringify(usr[0]?._id), secret_key);

    res.status(200).json({ status: true, token, user: usr });
  } catch (error) {
    console.log("user err : ", error);
    res.status(500).json({ status: false, error: error });
  }
};

const getAllUsers = (req, res) => {
  users
    .getAllUsers()
    .then((users) => {
      res.status(200).json({ status: true, users });
    })
    .catch((error) => {
      console.log("user getting err : ", error);
      res.status(500).json({ status: false, error: error });
    });
};

const getUserById = (req, res) => {
  users
    .getUserById(req.params.id)
    .then((user) => {
      res.status(200).json({ status: true, user });
    })
    .catch((err) => {
      console.log("errr : ", err);
      res.status(500).json({ status: false, reason: err.message, error: err });
    });
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  users
    .updateUserById(id, body)
    .then((user) => {
      res.status(200).json({ status: true, user });
    })
    .catch((err) => {
      console.log("errr : ", err);
      res.status(500).json({ status: false, reason: err.message, error: err });
    });
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  users
    .deleteUserById(id)
    .then((user) => {
      res.status(200).json({ status: true, user });
    })
    .catch((err) => {
      console.log("errr : ", err);
      res.status(500).json({ status: false, reason: err.message, error: err });
    });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
