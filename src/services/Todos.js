const { Todos } = require('../models');

const create = (data) => {
  return Todos.create(data)
}
const getAll = () => {
  return Todos.find();
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
  create,
  getAll,
  get,
  permanent,
  replace,
  update
}