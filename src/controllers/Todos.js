const { todos } = require('../services');
const { handleErrorResponse, handleSuccessResponse } = require('../utils')
const all = async (req, res) => {
  try {
    const list = await todos.all();
    res.status(200).json({
      success: true,
      data: {
        list
      }
    })
  }
  catch (err) {
    console.log("err : ", err);
    handleErrorResponse(req, res, 500, {
      error: {
        message: err.message,
        reason: err
      }
    })
  }
}

const create = async (req, res) => {

  const { body } = req;

  try {
    const addRes = await todos.create(body);
    res.status(200).send({
      success: true,
      data: {
        todo: addRes
      }
    })
  }
  catch (err) {
    console.log("err : ", err);
    handleErrorResponse(req, res, 500, {
      error: {
        message: err.message,
        reason: err
      }
    })

  }
}

const get = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todos.get(id);
    res.status(200).send({
      success: true,
      data: {
        todo: todo
      }
    })
  }
  catch (e) {
    console.log("err : ", e);
    handleErrorResponse(req, res, 500, {
      error: {
        message: e.message,
        reason: e
      }
    })
  }
}

const permanent = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todos.permanent(id);
    res.status(200).send({
      success: true,
      data: {
        todo
      }
    })
  }
  catch (e) {
    console.log("err : ", e);
    res.status(500).json({
      success: false,
      error: {
        message: e.message,
        reason: e
      }
    })
  }
}

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const todo = await todos.update(id, body);
    res.status(200).send({
      success: true,
      data: {
        todo: todo
      }
    })
  }
  catch (e) {
    console.log("err : ", e);
    handleErrorResponse(req, res, 500, {
      error: {
        message: e.message,
        reason: e
      }
    })
  }
}

module.exports = {
  all,
  create,
  get,
  permanent,
  update
}