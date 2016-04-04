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


/* GET users listing. */
router.get('/', function(req, res, next) {
	pool.getConnection(function (err, connection) {

		var strSql='';

		strSql = ' SELECT MEMO_TITLE, MEMO_CONTENT, MEMO_REG_DATE '
				+ ' FROM TB_MEMO ORDER BY MEMO_ID ASC';

        connection.query(strSql, function (err, rows) {
			if (err) console.error("err : " + err);
            console.log("전체 메모 목록 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("memo all :: " + JSON.stringify(rows));

			res.send(rows);

            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
		
	});
    
});

/* POST 호출 처리 */
router.post('/', function(req, res, next) {
    console.log('POST 방식으로 서버 호출됨');
    
    
});

module.exports = router;