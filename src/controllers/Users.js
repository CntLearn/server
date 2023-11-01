const { users } = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { salt, secret_key } = require("../config");
const { handleErrorResponse } = require('../utils');
const registerUser = async (req, res) => {
  let { body } = req;

  body = { ...body, fullName: body.firstName + ' ' + body.lastName, plainPassword: body.password }

  try {
    const existingUser = await users.findByUsername(body.email);
    if (existingUser.length > 0) {
      return res.status(200).json({
        success: false,
        error: {
          message: "User Name Already Exist.",
        }
      });
    }

    const saltedHash = await bcrypt.genSalt(parseInt(salt));
    const hashedPassword = await bcrypt.hash(body.password, saltedHash);
    const usr = await users.registerUser({ ...body, password: hashedPassword });

    res.status(200).json({
      success: true,
      data: { user: usr }
    });
  }
  catch (error) {
    console.log("user err : ", error);
    handleErrorResponse(req, res, 500, {
      error: {
        message: error.message,
        reason: error
      }
    })
  }
};

const loginUser = async (req, res) => {
    const { password: userPass = null, email = null } = req.body;

    try {
      const usr = await users.findByUsername(email);
      if (usr.length === 0) {
        return handleErrorResponse(req, res, 200, {
          error: {
            message: "User name or password is incorrect. not found",
          }
        })
      }

      let user = usr[0];

      const confirmUser = await bcrypt.compare(userPass, user?.password);

      if (!confirmUser) {
        return handleErrorResponse(req, res, 200, {
          error: {
            message: "User name or Password is incorrect incorrect.",
          }
        })
      }

      // const token = jwt.sign(user.email, secret_key, { algorithm: 'RS256' });
      const token = jwt.sign(user.email, secret_key);

      const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        avatar: user.avatar,
        about: user.about,
        lastSeen: user.lastSeen,
        lastMessage: user.lastMessage
      }

      res.status(200).json({
        success: true,
        data: {
          token,
          user: userData
        }
      });
    }
    catch (err) {
      console.log("user err : ", err);
      return handleErrorResponse(req, res, 500, {
        error: {
          message: err.message,
          reason: err
        }
      })
    }
  }
;

const getAllUsers = (req, res) => {
  console.log('calling get all ')
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
