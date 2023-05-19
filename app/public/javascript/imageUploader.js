const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './api/public/images/user')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "_" + file.originalname)
    }
})
const upload = multer({storage: storage})
module.exports = upload