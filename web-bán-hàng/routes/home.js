var express = require('express');
var router = express.Router();

var itemsModel = require('./../schemas/items');
const paramsHelper = require('./../helper/params');
const utilsHelper = require('./../helper/utils');

/* GET home page. */
router.get('(/:status)?', function(req, res, next) {

  let condition = {};
   
  let currentStatus = paramsHelper.getParams(req.params, 'status', '');

  let statusFilter = utilsHelper.createFilterStatus(currentStatus);

  let keyWord = paramsHelper.getParams(req.query, 'keyWord', '');



//search
  if(currentStatus === '') {
    if(keyWord !== '') condition = {name: new RegExp(keyWord, 'i')};
  } else {
    if(keyWord !== '') condition = {category: currentStatus, name: new RegExp(keyWord, 'i')};
    else if(keyWord === '') condition = {category: currentStatus};
  }

  itemsModel.find(condition).then((items) => {
    res.render('page/home/index', { 
      title: 'trang chủ',
      items,
      statusFilter,
      keyWord,
      currentStatus
   });
  });
});

//thong-tin-chi-tiet
router.get('/thong-tin-chi-tiet/:id', (req, res, next) => {
  let id = paramsHelper.getParams(req.params, 'id', '')

  itemsModel.findById(id, (err, item) => {
    res.render('page/product-detail/index', { 
      title: 'thông tin chi tiết sản phẩm',
      item,
      id,
   });
  });
});


module.exports = router;
