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

		var label_id='';
		var strSql='';

		label_id = req.query.label_id;

		strSql = ' SELECT DISTINCT M.MEMO_ID, M.MEMO_TITLE, M.MEMO_CONTENT, DATE_FORMAT(MEMO_REG_DATE, \'%Y-%m-%d\') AS MEMO_REG_DATE'
				+ ' , DATE_FORMAT(MEMO_UPDATE_DATE, \'%Y-%m-%d\') AS MEMO_UPDATE_DATE FROM TB_MEMO M, '
				+ ' (SELECT MEMO_ID FROM TB_LABEL_MEMO WHERE LABEL_ID = ? ) LM WHERE M.MEMO_ID = LM.MEMO_ID ';

        connection.query(strSql, label_id, function (err, rows) {
			if (err) console.error("err : " + err);
            console.log("메모 목록 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("memo list :: " + JSON.stringify(rows));
            
			res.send(rows);
			
            connection.release();
        });
		
	});
    
});

// router.get('/memo', function(req, res, next) {

// 	pool.getConnection(function (err, connection) {

// 	var labelID='';
// 	var memoID=''
// 	var strSql='';

// 	labelID = req.query.label_id ; // 클릭한 라벨의 아이디 : 1, 2, ...
// 	memoID = req.query.memo_id;		// 메모들의 아이디

// 	strSql = ' SELECT M.MEMO_TITLE, M.MEMO_CONTENT, M.MEMO_REG_DATE '
// 			+ ' FROM TB_MEMO M, '
// 	 		+ ' (SELECT MEMO_ID '
// 	 		+ ' 	FROM TB_LABEL_MEMO '
// 	 		+ ' 	WHERE LABEL_ID = ' + Number(labelID) // 라벨인덱스를 숫자로 바꾸고..
// 	 		+ ' 	AND MEMO_ID = ' + Number(memoID) + ') LM '
// 	 		+ ' WHERE M.MEMO_ID = LM.MEMO_ID';

//     connection.query(strSql, function (err, rows) {
//         if (err) console.error("err : " + err);
// 		console.log("메모 상세 ==========>>");
// 		console.log("strSql :: " + strSql);
// 		console.log("memo detail :: " + JSON.stringify(rows));

// 		//res.send('야!!!!!!!!!!' + rows[0].MEMO_TITLE);
// 		res.send(rows);

//         connection.release();

//         // Don't use the connection here, it has been returned to the pool.
//     });
// 	});
// });

/* POST 호출 처리 */
router.post('/', function(req, res, next) {
    console.log('POST 방식으로 서버 호출됨');
    
    
});

module.exports = router;