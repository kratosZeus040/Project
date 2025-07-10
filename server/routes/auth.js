import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const existing = await User.findOne({ username })
    if (existing) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const user = new User({ username, password })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    )
    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
