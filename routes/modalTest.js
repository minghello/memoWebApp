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

/* POST 호출 처리 */
router.post('/', function(req, res, next) {
    console.log('POST 방식으로 서버 호출됨');
    pool.getConnection(function (err, connection) {
        if (err) console.error("err : " + err);
		
		var inputLabel = "";
		inputLabel=req.body.inputLabel;
		var strSql='';
        console.log(inputLabel);
		strSql = ' INSERT INTO TB_LABEL (LABEL_NAME) VALUES ( ? ) ';

        connection.query(strSql, inputLabel,  function (err, results) {
			if (err) console.error("err : " + err);
            console.log("INSERT LABEL:: ==========>>");
            console.log("strSql :: " + strSql);
            
			console.log(results);
			
            res.status(200).send("success");
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
		
	});
    
});

module.exports = router;