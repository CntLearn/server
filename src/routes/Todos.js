const express = require('express');
const router = express.Router();

const { todos } = require('../controllers');
const { Auth } = require('../middleware');

// validators
const { create, byId } = require('../validators/todos');
// todos, Add, getAll , getById, update (archive, delete) , permanent delete.

router.route('/')
  .get(Auth, todos.all)
  .post(Auth, create, todos.create);


/*
 delete, if user want to permanent remove.
 update, if user want to replace whole data
 patch, update only that fields are in the request body.

 soft delete will in patch, and permanent in permanent delete.
 */

router.route('/:id')
  .get(Auth, byId, todos.get)
  .delete(Auth, byId, todos.permanent)
  .put(Auth, byId, todos.replace)
  .patch(Auth,byId, todos.update)


module.exports = router;
