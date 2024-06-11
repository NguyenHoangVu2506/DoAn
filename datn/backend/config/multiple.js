'use strict'

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("aaa")
        cb(null, path.join(__dirname, "../public/upload"))

    },
    filename: function (req, file, cb) {
        const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniquesuffix + ".png")

    }
})

const multerFilter=(req, file, cb)=>{
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    }else{
        cb({message:"Unsupported file format"}, false);
    }
};

const uploadDisk=multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: {fileSize:1000000}
})

module.exports={
    uploadDisk
}
