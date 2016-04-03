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

        var strSql = '';

    	var arrLabel = new Array();
        var arrFirstLabelMemo = new Array();
        var arrMemoCount = new Array();

        // 라벨 목록 가져오기
        strSql = ' SELECT LABEL_ID, LABEL_NAME '
                + ' FROM TB_LABEL ORDER BY LABEL_ID ASC';
        
        var firstLabel = '';
    	connection.query(strSql, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("라벨 목록 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("label list :: " + JSON.stringify(rows));
            
            arrLabel = rows;
            
            var jsonResult = JSON.stringify(arrLabel);
            var parseResult = JSON.parse(jsonResult);
            
            firstLabel = parseResult[0].LABEL_ID;

            //res.render('memo', {arrLabel: arrLabel});
            //connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
        
        // 전체 메모 갯수 가져오기..
        var memoCount = "";
        strSql = ' SELECT COUNT(MEMO_ID) AS CNT FROM TB_MEMO ';
        connection.query(strSql, function (err, result) {
            if (err) console.error("err : " + err);
            console.log("전체 메모갯수 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("count memo :: " + JSON.stringify(result));
            var jsonResult = JSON.stringify(result);
            var parseResult = JSON.parse(jsonResult);
            
            memoCount = parseResult[0].CNT;
            console.log(memoCount);
            

            //res.render('memo', {arrLabel: arrLabel, arrMemo: arrMemo});
    
            //connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });

        // 처음 화면은.. 라벨아이디 오름차순으로 열리므로 라벨목록의 첫번째 메모들을 가져온다...
        strSql = ' SELECT M.MEMO_ID, M.MEMO_TITLE, M.MEMO_CONTENT, M.MEMO_REG_DATE, M.MEMO_UPDATE_DATE '
                + ' FROM TB_MEMO M, '
                + ' (SELECT MEMO_ID FROM TB_LABEL_MEMO WHERE LABEL_ID = '
                + Number(firstLabel)
                + ') LM '
                + ' WHERE M.MEMO_ID = LM.MEMO_ID';
        connection.query(strSql, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("라벨 1번일때의 메모들 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("label list :: " + JSON.stringify(rows));

            arrFirstLabelMemo = rows;

            //res.render('memo', {arrLabel: arrLabel, arrMemo: arrMemo});
    
            //connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });

        // 라벨에 속한 메모들의 갯수..
        strSql = 'SELECT COUNT(MEMO_ID) AS MEMO_CNT'
                +' FROM (SELECT L.LABEL_ID, LM.MEMO_ID FROM TB_LABEL L '
                +' LEFT OUTER JOIN TB_LABEL_MEMO LM '
                +' ON L.LABEL_ID = LM.LABEL_ID) T GROUP BY T.LABEL_ID';
        connection.query(strSql, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("라벨에 속한 메모들의 갯수 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("label list :: " + JSON.stringify(rows));

            arrMemoCount = rows;

            res.render('memo', {arrLabel: arrLabel, arrFirstLabelMemo: arrFirstLabelMemo, arrMemoCount: arrMemoCount, memoCount:memoCount});
    
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});


module.exports = router;
