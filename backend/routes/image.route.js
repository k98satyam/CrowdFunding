const express = require('express')
const multer = require('multer')
const router = express.Router();
const Image = require('../models/image.model')
const fs = require('fs');
const path = require('path');

const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/setimagebuffer', upload.single('ImageData'), (req, res, next) => {
    // console.log(req.file)
    var imgBuffer = fs.readFileSync(req.file.path)
    const img = new Image({
        img: imgBuffer
    })
    //removing all from the upload directory
    //bcz why keep all the file in the server when i am storing images buffer value in db
    const directory = 'uploads'
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    })

    img.save()
        .then(response => res.json(response))
})

router.post('/getimagebuffer',(req,res) => {
    // console.log(req.body)
    // const id = mongoose.Types.ObjectId(re)
    Image.findById(req.body.id)
        .then(response => res.json(response))
})

module.exports = router;