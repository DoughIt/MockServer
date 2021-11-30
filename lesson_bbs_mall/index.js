const path = require('path');
const express = require('express');
const router = express.Router();

const Mock = require('mockjs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


module.exports = router;