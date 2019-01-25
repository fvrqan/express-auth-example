const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) => {
  const salt = await bcrypt.genSalt(12)

  req.body.password = await bcrypt.hash(req.body.password, salt)

  await User.create(req.body)

  res.json({ message: 'Success' })
}

exports.signIn = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } })

  if (user === null) {
    return res.json({ message: 'User not found.' })
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)

  if (!validPassword) {
    return res.json({ message: 'Password not valid.' })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({
    message: "You're logged in",
    id: user.id,
    token
  })
}

exports.verifyToken = (req, res) => {
  res.status(200).json({ user: req.user })
}
