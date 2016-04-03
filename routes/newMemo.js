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
	res.render("newMemo",{});
});

/* POST 호출 처리 */
router.post('/', function(req, res, next) {
    console.log('POST 방식으로 서버 호출됨');
    pool.getConnection(function (err, connection) {
        
        // 새 메모 추가하기..
        var strSql='';
        var inputTitle = '';
        var inputContent = '';
        inputTitle = req.body.inputTitle;
        inputContent = req.body.inputContent;
        
        strSql = " INSERT INTO TB_MEMO (MEMO_TITLE, MEMO_CONTENT, MEMO_REG_DATE, MEMO_UPDATE_DATE) "
                + " VALUES (?, ?, SYSDATE(), NULL) ";
		 connection.query(strSql, inputTitle, inputContent, function (err, results) {
			if (err) console.error("err : " + err);
            console.log("INSERT MEMO:: ==========>>");
            console.log("strSql :: " + strSql);
			
            connection.release();
        });
        
        strSql = "INSERT INTO TB_LABEL_MEMO (LABEL_ID, MEMO_ID) VALUES("
                + //라벨아이디
                + "(SELECT MEMO_ID FROM TB_MEMO ORDER BY MEMO_ID DESC LIMIT 1)"
                +")";
		
		
	});
    
});

module.exports = router;