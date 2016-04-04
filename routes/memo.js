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

var arrLabel = new Array();
var arrFirstLabelMemo = new Array();
var arrMemoCount = new Array();
        
/* GET home page. */
router.get('/', function(req, res, next) {
	pool.getConnection(function (err, connection) {
        
        var strSql = '';
        
        // 라벨 목록
        var arrLabels ='';
        strSql = ' SELECT LABEL_ID, LABEL_NAME '
                + ' FROM TB_LABEL ORDER BY LABEL_ID ASC';
    	connection.query(strSql, function (err, rows) {
            if (err) console.error("err : " + err);
            
            console.log("라벨 목록 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("label list :: " + JSON.stringify(rows));
            
            arrLabels = rows;

        });
        
        // 전체 메모 갯수 가져오기..
        var allMemoCount = "";
        strSql = ' SELECT COUNT(MEMO_ID) AS CNT FROM TB_MEMO ';
        connection.query(strSql, function (err, result) {
            if (err) console.error("err : " + err);
            console.log("전체 메모갯수 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("count memo :: " + JSON.stringify(result));
            var jsonResult = JSON.stringify(result);
            var parseResult = JSON.parse(jsonResult);
            
            allMemoCount = parseResult[0].CNT;
        });
        
        
        // 처음화면 : 첫번째 라벨아이디 > 그 라벨에 속한 메모들 > 첫번째 메모내용
        var arrInit = '';
        
        strSql = ' SELECT DISTINCT M.MEMO_ID, M.MEMO_TITLE, M.MEMO_CONTENT, DATE_FORMAT(M.MEMO_REG_DATE, \'%Y-%m-%d\') AS MEMO_REG_DATE, '
                +' DATE_FORMAT(M.MEMO_UPDATE_DATE, \'%Y-%m-%d\') AS MEMO_UPDATE_DATE FROM TB_MEMO M, '
                + ' (SELECT MEMO_ID FROM TB_LABEL_MEMO WHERE LABEL_ID = '
                + ' (SELECT LABEL_ID FROM TB_LABEL ORDER BY LABEL_ID ASC LIMIT 1)) LM ' 
                + ' WHERE M.MEMO_ID = LM.MEMO_ID ';
        connection.query(strSql, function (err, rows) {
            if (err) console.error("err : " + err);
            
            console.log("라벨 1번일때의 메모들과 첫번째 메모내용 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("label list :: " + JSON.stringify(rows));

            arrInit = rows;
            

        });

        // 라벨에 속한 메모들의 갯수..
        var memoCount = '';
        strSql = 'SELECT COUNT(MEMO_ID) AS MEMO_CNT'
                +' FROM (SELECT L.LABEL_ID, LM.MEMO_ID FROM TB_LABEL L '
                +' LEFT OUTER JOIN TB_LABEL_MEMO LM '
                +' ON L.LABEL_ID = LM.LABEL_ID) T GROUP BY T.LABEL_ID';
        connection.query(strSql, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("라벨에 속한 메모들의 갯수 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("label list :: " + JSON.stringify(rows));

            memoCount = rows;

            res.render('memo', {'arrLabels': arrLabels, 'allMemoCount':allMemoCount, 'arrInit': arrInit, 'memoCount': memoCount});
    
            connection.release();

        });
    });
});


/* POST 호출 처리 */
router.post('/', function(req, res, next) {
    console.log('memo.js :::::::POST 방식으로 서버 호출됨');
    
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
			
            res.status(200).send(arrMemoCount);

            connection.release();
            
            // Don't use the connection here, it has been returned to the pool.
        });
		
	});
    
});

module.exports = router;
