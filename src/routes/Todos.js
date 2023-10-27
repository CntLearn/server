const express = require('express');
const router = express.Router();

const { todos } = require('../controllers');
const { Auth } = require('../middleware')
// todos, Add, getAll , getById, update (archive, delete) , permanent delete.

router.route('/')
  .get(Auth, todos.all)
  .post(todos.create)


/*
 delete, if user want to permanent remove.
 update, if user want to replace whole data
 patch, update only that fields are in the request body.

 soft delete will in patch, and permanent in permanent delete.
 */

router.route('/:id')
  .get(Auth, todos.get)
  .delete(Auth, todos.permanent)
  .put(Auth, todos.replace)
  .patch(Auth, todos.update)


module.exports = router;
