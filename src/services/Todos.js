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
  return Todos.deleteOne({
    _id: id
  })
}

const update = (id, todo) => {
  return Todos.updateOne({ _id: id }, todo)
}


module.exports = {
  create,
  all,
  get,
  permanent,
  update
}