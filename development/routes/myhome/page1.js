var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('home', { title: 'Members area/page1' });
})

module.exports =  router;