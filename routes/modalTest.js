var express = require('express');
var router = express.Router();

var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'ming',
    database: 'ming',
    password: '1234'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("modalTest",{});
});

router.get('/addLabel', function(req, res, next) {
	    pool.getConnection(function (err, connection) {

		var inputLabel=req.query.inputLabel;
		var strSql='';

		strSql = ' INSERT INTO (LABEL_NAME) VALUES ('+
		        + inputLabel +
		        +') ';

        connection.query(strSql, function (err, results) {
			if (err) console.error("err : " + err);
            console.log("INSERT LABEL:: ==========>>");
            console.log("strSql :: " + strSql);
            //console.log("memo list :: " + JSON.stringify(rows));

			//res.send('야!!!!!!!!!!' + rows[0].MEMO_TITLE);
			console.log(results);
			res.send(200, success);

            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
		
	});
});

/* POST 호출 처리 */
router.post('/', function(req, res, next) {
    console.log('POST 방식으로 서버 호출됨');
    pool.getConnection(function (err, connection) {

		var inputLabel=req.body.inputLabel;
		var strSql='';
        console.log(inputLabel);
		strSql = ' INSERT INTO TB_LABEL (`LABEL_NAME`) VALUES ( `'+inputLabel+'` ) ';

        connection.query(strSql, function (err, results) {
			if (err) console.error("err : " + err);
            console.log("INSERT LABEL:: ==========>>");
            console.log("strSql :: " + strSql);
            //console.log("memo list :: " + JSON.stringify(rows));

			//res.send('야!!!!!!!!!!' + rows[0].MEMO_TITLE);
			console.log(results);
			res.send(200, "success");

            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
		
	});
    
});

module.exports = router;