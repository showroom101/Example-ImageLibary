var express = require('express');
var router  = express.Router();
var CG      = require('../CG');
var io 		= require('socket.io')();

router.get('/', function(req, res) {
  io.sockets.emit('an event sent to all connected clients');
  io.emit('an event sent to all connected clients');
    res.render('index', {title: 'LifeStyle' ,layout: 'partial/shared' });
});

module.exports = router;