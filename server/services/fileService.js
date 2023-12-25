const fs = require('fs')
const config = require('config')

class FileService {
    mkDir(file) {
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`

        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, {recursive: true})
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: 'File already exists'})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(file) {
        const path = this.getPath(file)
        if(file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return `${config.get('filePath')}\\${file.user}\\${file.path}`
    }
}

module.exports = new FileService()
