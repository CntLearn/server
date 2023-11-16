const { handleErrorResponse } = require('../utils')

const create = (req, res, next) => {
  const { title = null, assignedBy = null, assingedTo = null, createdBy = null, updatedBy = null } = req.body;
  console.log('ass : ', assignedBy)

  // if (!title) throw Error('Title is Required');  // code crashed after sending error.
  if (!title) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Title is required' } })
  }

  if (!assignedBy) {
    return handleErrorResponse(req, res, 400, { error: { message: 'User ID is Required' } })
  }

  if (!assingedTo) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Assignee ID is Required' } })
  }

  if (!createdBy) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Created By is Required' } })
  }

  if (!updatedBy) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Updated By is Required' } })
  }

  next();
}

const update = (req, res, next) => {
  const { body } = req;

  if (body.hasOwnProperty('title') && !body.title) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Title is required' } })
  }

  if (body.hasOwnProperty('user_id') && !body.user_id) {
    return handleErrorResponse(req, res, 400, { error: { message: 'User ID is Required' } })
  }

  if (body.hasOwnProperty('createdBy') && !body.createdBy) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Created By is Required' } })
  }

  if (body.hasOwnProperty('updatedBy') && !body.updatedBy) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Updated By is Required' } })
  }

  next();
}

const byId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return handleErrorResponse(req, res, 400, { error: { message: 'ID is Required' } })
  }
  next();
}

module.exports = {
  create,
  update,
  byId
}