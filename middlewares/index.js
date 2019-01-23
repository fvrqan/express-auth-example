const jwt = require('jsonwebtoken')
const User = require('../models').User

exports.isAuthenticated = async (req, res, next) => {
  //Get token
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (token === undefined) {
    return res.send('token not found')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ where: { id: decoded.id } })

    if (user === null) {
      return res.send('account not found')
    }

    req.decoded = decoded
    next()
  } catch (err) {
    res.send('error')
  }
}
