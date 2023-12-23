const {validationResult} = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fileService = require("../services/fileService");
const File = require("../models/File");
const jwt = require("jsonwebtoken");
const config = require("config");

class AuthController {
    async registration(req, res) {
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
            await fileService.mkDir(new File({user: user.id, name: ""}))

            res.json({message: "The user has been created"})
        } catch (error) {
            console.log('Error: ', error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    async login(req, res) {
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
    }

    async auth(req, res) {
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
    }
}

module.exports = new AuthController()
