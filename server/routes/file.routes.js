const Router = require('express')
const FileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router()

router.post('', authMiddleware, FileController.mkDir)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.get('', authMiddleware, FileController.getFiles)
router.get('/download', authMiddleware, FileController.downloadFile)
router.delete('/', authMiddleware, FileController.deleteFile)

module.exports = router
