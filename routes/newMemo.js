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
router.get('/:labelID', function(req, res, next) {
    var label_id=req.params.labelID;
    console.log("id :::::::::" +  label_id);
	res.render("newMemo",{label_id : label_id});
});

/* POST 호출 처리 */
router.post('/', function(req, res, next) {
    console.log('POST 방식으로 서버 호출됨');
    pool.getConnection(function (err, connection) {
        
        // 새 메모 추가하기..
        var strSql='';
        var inputTitle = '';
        var inputContent = '';
        var labelID = '';
        inputTitle = req.body.inputTitle;
        inputContent = req.body.inputContent;
        labelID = req.body.labelID;
        
        console.log("inputTitle ----------------->> " + inputTitle);
        console.log("inputContent ----------------->> " + inputContent);
        console.log("labelID ----------------->> " + labelID);
        
        strSql = " INSERT INTO TB_MEMO (MEMO_TITLE, MEMO_CONTENT, MEMO_REG_DATE, MEMO_UPDATE_DATE) "
                + " VALUES ( '"
                + inputTitle + "', '"
                + inputContent
                + "', SYSDATE(), NULL) ";
		connection.query(strSql, function (err, results) {
			if (err) console.error("err : " + err);
			
            console.log("INSERT MEMO:::::::::::::::: ==========>>");
            console.log("strSql :: " + strSql);
            
			//connection.release();
        });
        
        strSql = "INSERT INTO TB_LABEL_MEMO (LABEL_ID, MEMO_ID) VALUES "
                + "( ? , "
                + "(SELECT MEMO_ID FROM TB_MEMO ORDER BY MEMO_ID DESC LIMIT 1)"
                +")";
		 connection.query(strSql, labelID, function (err, results) {
			if (err) console.error("err : " + err);
            console.log("INSERT LABEL_MEMO:: ==========>>");
            console.log("strSql :: " + strSql);
			
            connection.release();
        });
		
	});
    
});

module.exports = router;