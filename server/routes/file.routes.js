const Router = require('express')
const FileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router()

router.post('', authMiddleware, FileController.mkDir)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.post('/avatar', authMiddleware, FileController.uploadAvatar)
router.get('', authMiddleware, FileController.getFiles)
router.get('/download', authMiddleware, FileController.downloadFile)
router.get('/search', authMiddleware, FileController.searchFile)
router.delete('/', authMiddleware, FileController.deleteFile)
router.delete('/avatar', authMiddleware, FileController.deleteAvatar)

module.exports = router
