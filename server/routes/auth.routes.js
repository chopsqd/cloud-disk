const Router = require('express')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')
const AuthController = require('../controllers/authController')
const router = new Router()

router.post(
    '/registration',
    [
        check('email', "Incorrect email").isEmail(),
        check('password', "Password must be longer then 3 and shorter then 12").isLength({min: 3, max: 12}),
    ],
    AuthController.registration
)
router.post('/login', AuthController.login)
router.get('/auth', authMiddleware, AuthController.auth)

module.exports = router
