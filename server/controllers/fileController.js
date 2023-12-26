const fs = require('fs')
const config = require("config");
const FileService = require('../services/FileService')
const File = require('../models/File')
const User = require('../models/User')

class FileController {
    async mkDir(req, res) {
        try {
            const {name, type, parent} = req.body

            const file = new File({name, type, parent, user: req.user.id})

            const parentFile = await File.findOne({_id: parent})
            if(!parentFile) {
                file.path = name
                await FileService.mkDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await FileService.mkDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }

            await file.save()
            return res.json(file)
        } catch (error) {
            console.log('Error: ', error)
            return res.status(400).json(error)
        }
    }

    async getFiles(req, res) {
        try {
            const {sort} = req.query
            const files = await File.find({user: req.user.id, parent: req.query.parent}).sort({[sort] : 1})

            return res.json(files)
        } catch(error) {
            console.log('Error: ', error)
            return res.status(500).json({message: "Failed to get files"})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if(user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: "There is no space on the disk"})
            }

            user.usedSpace += file.size

            let path;
            if(parent) {
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`
            }

            if(fs.existsSync(path)) {
                return res.status(400).json({message: "File already exists"})
            }
            file.mv(path)

            const type = file.name.split('.').pop();
            let filePath = file.name
            if(parent) {
                filePath = `${parent.path}\\${file.name}`
            }
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            return res.json(dbFile)
        } catch(error) {
            console.log('Error: ', error)
            return res.status(500).json({message: "Failed to upload files"})
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const path = FileService.getPath(file)

            if(!fs.existsSync(path)) {
                return res.status(400).json({message: "File not found"})
            }

            return res.download(path, file.name)
        } catch(error) {
            console.log('Error: ', error)
            return res.status(500).json({message: "Failed to download files"})
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})

            if(!file) {
                return res.status(400).json({message: "File not found"})
            }

            FileService.deleteFile(file)
            await file.deleteOne()

            return res.json({message: "File was deleted"})
        } catch(error) {
            console.log('Error: ', error)
            return res.status(400).json({message: "Directory is not empty"})
        }
    }

    async searchFile(req, res) {
        try {
            const {search} = req.query
            let files = await File.find({user: req.user.id, name: {$regex: search}});

            return res.json(files)
        } catch(error) {
            console.log('Error: ', error)
            return res.status(400).json({message: "Search error"})
        }
    }

    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id)
            const avatarName = Date.now().toString() + ".jpg"

            file.mv(`${config.get('staticPath')}\\${avatarName}`)
            user.avatar = avatarName
            await user.save()

            return res.json(user)
        } catch(error) {
            console.log('Error: ', error)
            return res.status(400).json({message: "Failed to upload avatar"})
        }
    }

    async deleteAvatar(req, res) {
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync(`${config.get('staticPath')}\\${user.avatar}`)
            user.avatar = null
            await user.save()

            return res.json(user)
        } catch(error) {
            console.log('Error: ', error)
            return res.status(400).json({message: "Failed to delete avatar"})
        }
    }
}

module.exports = new FileController()
