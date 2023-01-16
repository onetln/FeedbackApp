
module.exports = (req, res, next) => {
  console.log(req.method);
  if (req.method === 'POST' || req.method === 'PUT') {
    const now = new Date
    req.body.date = now.toISOString()
  }
  next()
}
