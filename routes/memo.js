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
	pool.getConnection(function (err, connection) {
    	// Use the connection
    	var arrLabel = new Array();
        var arrMemo = new Array();

    	connection.query('SELECT * FROM TB_LABEL', function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("TB_LABEL : " + JSON.stringify(rows));

            arrLabel = rows;

            //res.render('memo', {arrLabel: arrLabel});
            //connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });

        // 처음 화면은.. 라벨이 1번 상태로 열리니깐..
        // 라벨 1번일때의 메모들을 가져와야되...
        strQuery = 'select M.MEMO_TITLE, M.MEMO_CONTENT, M.MEMO_REGDATE from TB_MEMO M, '
                + '(SELECT MEMO_ID FROM TB_LABEL_MEMO WHERE LABEL_ID = 1'
                + ') LM where M.MEMO_ID = LM.MEMO_ID';
        console.log("query: " +strQuery);

        connection.query(strQuery, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("test page_____ : " + JSON.stringify(rows));

            arrMemo = rows;

            res.render('memo', {arrLabel: arrLabel, arrMemo: arrMemo});
    
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });

        




    });
});


module.exports = router;
