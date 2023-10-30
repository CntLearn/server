const { Todos } = require('../models');

const create = (todo) => {
  return Todos.create(todo)
}
const all = () => {
  return Todos.find();
}

const get = (id) => {
  return Todos.findById(id)
}

const permanent = (id) => {
  return Todos.deleteOne(id)
}

const replace = (id, todo) => {
  return Todos.update(id, todo)
}

const update = (id, todo) => {
  return Todos.updateOne(id, todo)
}


module.exports = {
  create,
  all,
  get,
  permanent,
  replace,
  update
}