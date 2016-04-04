//전체메모 보여주기..
function allMemoView() {
    $.ajax({
        url: 'allMemoList',
        dataType: 'json',
        type: 'GET',
        success: function(all_memo) {
            var allMemoCount = all_memo.length;
            
            var forCount = $("#memoTab").children().length;
            var list = document.getElementById("memoTab");
            while (list.hasChildNodes()) {
              list.removeChild(list.firstChild);
            }
            
            // 메모리스트 영역에 뿌려주고
            for(var i=0; i<allMemoCount;i++) {
                $("#memoTab").append("<li>"
                                    +"<input></input>"
                                    +"<label>"+all_memo[i].MEMO_TITLE+"</label>"
                                    +"<label class=\"memoUpdateDate\">"+all_memo[i].MEMO_REG_DATE+"</label>"
                                    +"<div>"+all_memo[i].MEMO_CONTENT+"</div>"
                                    +"</li>");
                $("#memoTab li:eq("+i+")").attr("value", all_memo[i].MEMO_ID);
                $("#memoTab li").addClass("list-group-item");
                $("#memoTab li > input").attr("type","checkbox");
                $("#memoTab li > label").addClass("list-group-item-heading");
                $("#memoTab div").addClass("list-group-item-text memoPreview");
           }
           
           // 메모 상세화면에서 1번째 메모 보여주기.
            $("#memoTitle").text(all_memo[0].MEMO_TITLE);
            $("#memo_content").text(all_memo[0].MEMO_CONTENT);
            if(all_memo[0].MEMO_UPDATE_DATE != null) {
                $("#memoUpdateDate").text("최근 수정일 :  "+all_memo[0].MEMO_UPDATE_DATE);
            } else {
                $("#memoUpdateDate").text("최근 수정일 : 없음");
            }
            
            
            // 메모를 클릭하면
            $('#memoList ul li').click(function() {
                var clickedIndex = $('#memoList ul li').index(this);    // 클릭한 메모 li 태그의 value값이 메모아이디
                var memoClickID = $('#memoList ul li:eq('+clickedIndex+')').val();
                
                clickMemo(memoClickID);
            });
            
            
        }
	});
}

// 메모 클릭했을 때..
function clickMemo(memo_id) {
    $.ajax({
        url: 'memoClick',
        data: {'memo_id' : memo_id},
        dataType: 'json',
        type: 'GET',
        success: function(memo_detail) {
            
            $("#memoTitle").text(memo_detail[0].MEMO_TITLE);
            $("#memo_content").text(memo_detail[0].MEMO_CONTENT);
            if(memo_detail[0].MEMO_UPDATE_DATE != null) {
                $("#memoUpdateDate").text("최근 수정일 :  "+memo_detail[0].MEMO_UPDATE_DATE);
            } else {
                $("#memoUpdateDate").text("최근 수정일 : 없음");
            }
        }
	});
}



// 라벨을 클릭했을 때..
function clickLabel(label_id)
{
	
    $.ajax({
        url: 'labelClick',
        data: {'label_id' : label_id},
        dataType: 'json',
        type: 'GET',
        success: function(labels) {

            var forCount = $("#memoTab").children().length;
            var list = document.getElementById("memoTab");
            while (list.hasChildNodes()) {
              list.removeChild(list.firstChild);
            }

            var memoCount = labels.length;
            //alert(data.length);
            //console.log("memoTitle :::  "+ data[0].MEMO_TITLE);
            //$("#memoTab li").addClass("list-group-item");
            if(memoCount==0) {
                $("#memoTab").append("<div>메모가 없어요~</div>");
                $("#memoTab div").addClass("text-center");
                
                $("#memoTitle").text("");
                $("#memo_content").text("새로운 메모를 등록해주세요.");
                $("#memoUpdateDate").text("최근 수정일 :  ");
            } else {
                var memoID ='';
                // 메모리스트 영역에 뿌려주고
                for(var i=0; i<memoCount;i++) {
                    $("#memoTab").append("<li>"
                                        +"<input></input>"
                                        +"<label>"+labels[i].MEMO_TITLE+"</label>"
                                        +"<label class=\"memoUpdateDate\">"+labels[i].MEMO_REG_DATE+"</label>"
                                        +"<div>"+labels[i].MEMO_CONTENT+"</div>"
                                        +"</li>");
                    $("#memoTab li:eq("+i+")").attr("value", labels[i].MEMO_ID);
                    $("#memoTab li").addClass("list-group-item");
                    $("#memoTab li > input").attr("type","checkbox");
                    $("#memoTab li > label").addClass("list-group-item-heading");
                    $("#memoTab div").addClass("list-group-item-text memoPreview");
               }
               
               // 메모 상세화면에서 1번째 메모 보여주기.
                $("#memoTitle").text(labels[0].MEMO_TITLE);
                $("#memo_content").text(labels[0].MEMO_CONTENT);
                if(labels[0].MEMO_UPDATE_DATE != null) {
                    $("#memoUpdateDate").text("최근 수정일 :  "+labels[0].MEMO_UPDATE_DATE);
                } else {
                    $("#memoUpdateDate").text("최근 수정일 : 없음");
                }
                    
                $('#memoList ul li').click(function() {
                    var clickedIndex = $('#memoList ul li').index(this);    // 클릭한 메모 li 태그의 value값이 메모아이디
                    var memoClickID = $('#memoList ul li:eq('+clickedIndex+')').val();
                    
                    clickMemo(memoClickID);
                });
                
            }
            
        }
	});
}



function addLabelClick(inputLabel) {
    $.ajax({
        url: 'memo',
        data: {'inputLabel' : inputLabel},
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            
            console.log(data.length);
            var index = Number(data.length)-1;
            // console.log("sssss");
            $("#labelModal").modal('hide');
            var indexValue = $("#labelTab li").last().val();
            console.log(indexValue);
            
            $("#labelTab").append("<li><label>"+data[index].MEMO_CNT+"</label>"
                                    +"<div>"+inputLabel+"</div>"
                                    +"</li>");
            $("#labelTab li").addClass("list-group-item");
            $("#labelTab li").last().attr("value", indexValue+1);
            $("#labelTab label").addClass("badge");
            
            // 다시 이벤트 줌
            $('#labelList ul li').click(function() {
          
                labelClickIndex = $('#labelList ul li').index(this);
                //$("#labelList ul li:eq(3)").val()
                
                var labelText = $("#labelList ul li:eq("+labelClickIndex+") div").text();
                $("#selectLabel").text(labelText);
                
                labelID = $("#labelList ul li:eq("+labelClickIndex+")").val();
                $("li").removeClass('selected');
                $(this).addClass('selected');
                
                clickLabel(labelID);
            });
        }
	});    
}

function newMemoClick(labelID, inputTitle, inputContent) {
    $.ajax({
       url: 'newMemo',
       data: {'labelID': labelID, 'inputTitle' : inputTitle, 'inputContent' : inputContent},
       type: 'POST',
       success: function() {
           alert("메모 추가 완료!!");
       }
    });
}