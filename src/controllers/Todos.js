const { todos } = require('../services');

const all = async (req, res) => {
  try {
    const list = await todos.getAll();
    res.send({
      success: true,
      data: {
        list
      }
    })
  }
  catch (err) {
    console.log("err : ", err);
    res.status(500).json({
      success: false,
      error: {
        message: err.message,
        reason: err
      }
    })
  }
}

const create = async (req, res) => {
  console.log('data : ', req.body);

  try {
    // const addRes = await todos.create(req.body);
  }
  catch (err) {
    console.log("err : ", err);
    res.status(500).json({
      success: false,
      error: {
        message: err.message,
        reason: err
      }
    })
  }
}

const get = () => {
  try {

  }
  catch (e) {

  }
}

const permanent = () => {
  try {

  }
  catch (e) {

  }
}

const replace = () => {
  try {

  }
  catch (e) {

  }
}

const update = () => {
  try {

  }
  catch (e) {

  }
}

module.exports = {
  all,
  create,
  get,
  permanent,
  replace,
  update
}