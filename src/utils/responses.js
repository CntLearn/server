const handleErrorResponse = (req, res, statusCode, data) => {
  const code = statusCode ? statusCode : 500;
  res.status(code).json({
    success: false,
    ...data
  })
}

const handleSuccessResponse = (req, res, statusCode, data) => {
  const code = statusCode ? statusCode : 200;
  res.status(code).json({
    success: true,
    ...data
  })
}

module.exports = {
  handleErrorResponse,
  handleSuccessResponse
}