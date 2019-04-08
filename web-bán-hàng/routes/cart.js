var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('page/cart/index', {
    title: 'giỏ hàng',
  });
});


module.exports = router;