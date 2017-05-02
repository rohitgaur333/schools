var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//var User     = mongoose.model( 'User' );
//connec to mongoose 

//var userdetails = require('../routes/route_user');
/* GET home page. */
router.get('/', function(req, res, next) {
	
	res.send("Rohit Gaur");
	  //res.render('index', { title: 'Express' });
	 
});

router.get('/abc', function(req, res, next) {
	
	res.send("another route");
	  //res.render('index', { title: 'Express' });
	 
});




module.exports = router;