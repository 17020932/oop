var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var itemsModel = require('./../schemas/items');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('page/post-news/index', {
    title: 'đăng tin miễn phí',
  });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __pathUploads )
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage : storage}).single('photos');

router.post('/save', (req, res, next)=>{
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    //req.files = JSON.parse(JSON.stringify(req.file));
    
    console.log(req.file.filename);
    console.log(req.body);

    let item = {
      name: req.body.topic,
      category: 'do-cu',
      type: ' ',
      status: ' ',
      price: req.body.price,
      desc: req.body.content,
      link_img: './img/' + req.file.filename
    }

    new itemsModel(item).save().then(()=>{
      res.redirect('/dang-tin-mien-phi');
    });
  });
});

module.exports = router;
