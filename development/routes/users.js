var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('home', { title: 'Express users' });
})

module.exports =  router;

