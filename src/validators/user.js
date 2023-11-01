const { handleErrorResponse } = require('../utils/responses');

const register = (req, res, next) => {
  const { email = null, firstName = null, lastName = null, password = null } = req.body;
  if (!email) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Email is required' } })
  }

  if (!firstName) {
    return handleErrorResponse(req, res, 400, { error: { message: 'First Name is required' } })
  }

  if (!lastName) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Last Name is required' } })
  }
  if (!password) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Password is required' } })
  }

  next();
}

const login = (req, res, next) => {
  const { email = null, password = null } = req.body;
  if (!email) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Email is required' } })
  }

  if (!password) {
    return handleErrorResponse(req, res, 400, { error: { message: 'Password is required' } })
  }

  next();
}

module.exports = {
  register,
  login
}