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
	    if (err) console.error("err : " + err);
	    
	    var memo_id = req.query.memo_id;
		var strSql = ' SELECT MEMO_TITLE, MEMO_CONTENT, DATE_FORMAT(MEMO_UPDATE_DATE, \'%Y-%m-%d\') AS MEMO_UPDATE_DATE'
		            + ' FROM TB_MEMO WHERE MEMO_ID = ? ';

        connection.query(strSql, memo_id, function (err, result) {
			if (err) console.error("err : " + err);
			
            console.log("클릭한 메모의 상세내용 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("memo detail :: " + JSON.stringify(result));
            
            res.send(result);

            connection.release();
        });
	});
});

/* POST 호출 처리 */
router.post('/', function(req, res, next) {
    console.log('POST 방식으로 서버 호출됨');
    
    
});

module.exports = router;