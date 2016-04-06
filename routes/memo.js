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

var memoCount = '';
/* GET home page. */
router.get('/', function(req, res, next) {
	pool.getConnection(function (err, connection) {
        if (err) console.error("err : " + err);
        
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
        var allMemoCount='';
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
            
            res.render('memo', 
            {'arrLabels': arrLabels, 'allMemoCount':allMemoCount, 'arrInit': arrInit, 'memoCount': memoCount});
    
            connection.release();

        });
    });
});


/* POST 호출 처리 */
router.post('/addNewLabel', function(req, res, next) {
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

			res.location(req.baseUrl).end();

            connection.release();
        });
	});
});

router.post('/addNewMemo', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) console.error("err : " + err);
		
		var label_id = req.body.label_id;
		var input_title = req.body.input_title;
		var input_content = req.body.input_content;
		
		console.log("label_id ::" +label_id);
		console.log("input_title ::" +input_title);
		console.log("input_content ::" +input_content);
		
		var strSql='';
		// 먼저 메모테이블에 메모를 등록한다.
        strSql = " INSERT INTO TB_MEMO (MEMO_TITLE, MEMO_CONTENT, MEMO_REG_DATE, MEMO_UPDATE_DATE) "
                + " VALUES ( '"
                + input_title + "', '"
                + input_content
                + "', SYSDATE(), NULL) ";
		connection.query(strSql, function (err, results) {
			if (err) console.error("err : " + err);
			
            console.log("INSERT MEMO ==========>>");
            console.log("strSql :: " + strSql);
            
			//connection.release();
        });
        
        // 라벨_메모 테이블에 메모의 라벨을 지정한다.
        strSql = "INSERT INTO TB_LABEL_MEMO (LABEL_ID, MEMO_ID) VALUES "
                + "( ?, (SELECT MEMO_ID FROM TB_MEMO ORDER BY MEMO_ID DESC LIMIT 1))";
		 connection.query(strSql, label_id, function (err, results) {
			if (err) console.error("err : " + err);
            console.log("INSERT LABEL_MEMO ==========>>");
            console.log("strSql :: " + strSql);
			
			//res.location(req.baseUrl).end();
            //connection.release();
        });
            
        // 입력한 메모의 정보를 다시 수집..
        strSql = ' SELECT DISTINCT M.MEMO_ID, M.MEMO_TITLE, M.MEMO_CONTENT, DATE_FORMAT(MEMO_REG_DATE, \'%Y-%m-%d\') AS MEMO_REG_DATE'
				+ ' , DATE_FORMAT(MEMO_UPDATE_DATE, \'%Y-%m-%d\') AS MEMO_UPDATE_DATE FROM TB_MEMO M, '
				+ ' (SELECT MEMO_ID FROM TB_LABEL_MEMO WHERE LABEL_ID = ? ) LM WHERE M.MEMO_ID = LM.MEMO_ID ';
        connection.query(strSql, label_id, function (err, newMemo) {
            if (err) console.error("err : " + err);
            
            console.log("다시 그 라벨의 메모들 ==========>>");
            console.log("strSql :: " + strSql);
            console.log("label list :: " + JSON.stringify(newMemo));
        
            res.location(req.baseUrl).send(newMemo);
            connection.release();
        });
    
	});
});

module.exports = router;
