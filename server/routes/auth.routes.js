const Router = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router()

router.post(
    '/registration',
    [
        check('email', "Incorrect email").isEmail(),
        check('password', "Password must be longer then 3 and shorter then 12").isLength({min: 3, max: 12}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request", errors})
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exists`})
            }

            const hashPassword = await bcrypt.hash(password, 7)
            const user = new User({email, password: hashPassword})
            await user.save()

            res.json({message: "The user has been created"})
        } catch (error) {
            console.log('Error: ', error)
            res.status(500).json({message: "Internal server error"})
        }
    })

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"})
        }

        const token = jwt.sign({id: user.id}, config.get('SECRET_KEY'), {expiresIn: "1h"})

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            }
        })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({message: "Internal server error"})
    }
})

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, config.get('SECRET_KEY'), {expiresIn: "1h"})

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            }
        })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router
