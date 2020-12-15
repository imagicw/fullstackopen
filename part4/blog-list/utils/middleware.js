const errorHandler = (err, req, res, next) =>
{
  console.log(err)

  if (err.name === 'CastError' && err.kind === 'ObjectId')
  {
    return res.status(400).send({ error: 'error id' })
  }
  else if (err.name === 'ValidationError')
  {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

const requestLogger = (req, res, next) =>
{
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  next()
}

const unknownEndpoint = (req, res) =>
{
  res.status(404).send({ error: 'unknown Endpoint' })
}

module.exports =
{
  errorHandler,
  requestLogger,
  unknownEndpoint
}