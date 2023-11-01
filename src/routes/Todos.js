const express = require('express');
const router = express.Router();

const { todos } = require('../controllers');
const { Auth } = require('../middleware');

// validators
const { create, update, byId } = require('../validators/todos');
// todos, Add, getAll , getById, update (archive, delete) , permanent delete.

router.route('/')
  .get(Auth, todos.all)
  .post(Auth, create, todos.create);


/*
 delete, if user want to permanent remove.
 update, if user want to replace whole data

 soft delete will in put, and permanent in permanent delete.
 */

router.route('/:id')
  .get(Auth, byId, todos.get)
  .delete(Auth, byId, todos.permanent)
  .put(Auth, byId, update, todos.update);


module.exports = router;
