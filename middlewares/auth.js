const { User } = require('../models')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (token === undefined) {
    return res.status(401).json({ message: 'Token not found.'})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ where: { id: decoded.id } })

    if (user === null) {
      return res.status(400).json({ message: 'Account not found.'})
    }

    req.decoded = decoded
    req.user = user

    next()
  } catch (err) {
    res.status(500).json({ message: 'There is an error', err})
  }
}
