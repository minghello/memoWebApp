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

		var labelID='';
		var strSql='';

		labelID = req.query.label_id; // 클릭한 라벨의 인덱스 - 0, 1, 2, ... 

		strSql = ' SELECT M.MEMO_ID, M.MEMO_TITLE, M.MEMO_CONTENT, M.MEMO_REGDATE '
				+ ' FROM TB_MEMO M, '
		 		+ ' (SELECT MEMO_ID FROM TB_LABEL_MEMO WHERE LABEL_ID = ' + Number(labelID) + ' ) LM '	// 라벨인덱스를 숫자로 바꾸고..
		 		+ ' WHERE M.MEMO_ID = LM.MEMO_ID';

        connection.query(strSql, function (err, rows) {
			if (err) console.error("err : " + err);
            console.log("메모 목록 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("memo list :: " + JSON.stringify(rows));

			//res.send('야!!!!!!!!!!' + rows[0].MEMO_TITLE);
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