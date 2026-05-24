const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// import models
const UserSchema = require('../modules/SchemaUser.js')

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // 1) التحقق أول
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email and password are required'
      })
    }

    // 2) تأكد إن الإيميل مش موجود
    const existingUser = await UserSchema.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // 3) hash مرة واحدة بس
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4) إنشاء اليوزر
    const newUser = new UserSchema({
      username,
      email,
      password: hashedPassword,
      role: role || 'user' // default
    })

    await newUser.save()

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 1) تحقق من البيانات
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      })
    }
    // 2) دور على المستخدم
    const user = await UserSchema.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: 'Account not verified. Please verify your email.'
      })
    }
    //   the lastlogin time user doit
    user.lastLogin = new Date()
    await user.save()

    // 5) إنشاء token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    if (!token) {
      return res.status(500).json({
        message: 'Failed to generate token'
      })
    }
    // 6) response
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

// GetAllUsers
router.get('/getusers', async (req, res) => {
  const data_user = await UserSchema.find()
  res.json(data_user)
})
// GetUserById
router.get(`/getusers_id=:_id`, async (req, res) => {
  const data_user = await UserSchema.findById(req.params._id)
  res.json(data_user)
})

// DeleteUser
router.delete(`/deleteusers_id=:_id`, async (req, res) => {
  const deletedUser = await UserSchema.findByIdAndDelete(req.params._id)
  res.json({ message: 'user deleted successfully' })
  res.json(deletedUser)
})

// UpdateUser
router.put(`/updateusers_id=:_id`, async (req, res) => {
  const updatedUser = await UserSchema.findByIdAndUpdate(req.params._id, {
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  })
  res.json({ message: 'user updated successfully' })
  res.json(updatedUser)
})

module.exports = router
