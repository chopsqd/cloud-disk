const Router = require('express')
const FileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router()

router.post('', authMiddleware, FileController.mkDir)
router.get('', authMiddleware, FileController.getFiles)

module.exports = router