const { handleErrorResponse } = require('../utils/responses')
const create = (req, res, next) => {
  const { title = null, user_id = null, createdBy = null, updatedBy = null } = req.body;

  // if (!title) throw Error('Title is Required');  // code crashed after sending error.
  if (!title) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Title is required' } })
  }

  if (!user_id) {
    return handleErrorResponse(req, res, 400, { error: { message: 'User ID is Required' } })
  }

  if (!createdBy) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Created By is Required' } })
  }

  if (!updatedBy) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Updated By is Required' } })
  }

  next();
}

const byId = (req, res, next) => {
  const { id } = req.params;
  if (!id) throw Error('ID is required.');
  next();
}


module.exports = {
  create,
  byId
}