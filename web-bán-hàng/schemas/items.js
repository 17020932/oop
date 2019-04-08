var mongoose = require('mongoose');

var itemsSchemas = new mongoose.Schema({
    name: String,
    category: String,
    type: String,
    status: Number,
    price: String,
    desc: String,
    origin: String,
    place: String,
    link_img: []

    // product : {
    //     name: String,
    //     price: String,
    //     desc: String,
    //     status: Number,
    //     img: []
    // },
    // category : String

});

module.exports = mongoose.model('items', itemsSchemas);