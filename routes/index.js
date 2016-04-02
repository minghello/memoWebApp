var express = require('express');
var router = express.Router();

var mysql = require("mysql");

var pool = mysql.createPool({
	connectionLimit: 3,
    host: 'localhost',
    user: 'ming',
    database: 'ming',
    password: '1234'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	pool.getConnection(function (err, connection) {
    	// Use the connection
    	connection.query('SELECT * FROM TB_LABEL', function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("TB_LABEL : " + JSON.stringify(rows));

            res.render('index', {title: 'DB TEST', labels: rows});
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

module.exports = router;
