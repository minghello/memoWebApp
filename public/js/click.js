
<<<<<<< HEAD
function allMemoView() {
    $.ajax({
        url: 'test',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            var memoCount = data.length;
            alert(data.length);
            // <li class="list-group-item">
            //   <input type="checkbox"></input>
            //   <label class="list-group-item-heading"><%= memoList.MEMO_TITLE %></label>
            //   <label class="memoUpdateDate list-group-item-heading">2016-03-29 10:29:11</label>
            //   <div class="list-group-item-text memoPreview">내용 미리보기</div>
            // </li>
            
            var forCount = $("#memoTab").children().length;
            var list = document.getElementById("memoTab");
            while (list.hasChildNodes()) {
              list.removeChild(list.firstChild);
            }
            
            for(var i=0;i<memoCount;i++) {
                $("#memoTab").append("<li>"
                                    +"<input></input>"
                                    +"<label>"+data[i].MEMO_TITLE+"</label>"
                                    +"<label class=\"memoUpdateDate\">"+data[i].MEMO_REG_DATE+"</label>"
                                    +"<div>"+data[i].MEMO_CONTENT+"</div>"
                                    +"</li>");
                $("#memoTab li").addClass("list-group-item");
                $("#memoTab li > input").attr("type","checkbox");
                $("#memoTab li > label").addClass("list-group-item-heading");
                $("#memoTab div").addClass("list-group-item-heading");
                
                
                $('#memoList ul li').click(function() {
                    var memoTabIndex = $('#memoList ul li').index(this);
                    //clickMemo(click_LabelID ,memoID);
                    alert("메모 클릭함..." + "(memoID: "+memoID+")");
                });

   	            //var node = document.createElement("li");                 // Create a <li> node
                //var textnode = document.createTextNode(data[i].MEMO_TITLE);         // Create a text node
                //node.appendChild(textnode);                              // Append the text to <li>
                //document.getElementById("memoTab").appendChild(node);     // Append <li> to <ul> with id="myList"
            }
        }
	});
}

=======
>>>>>>> 7f0697860b9cff32538ebe1c70a9045d13fa25c4
// 라벨을 클릭했을 때..
function clickLabel(click_LabelID)
{
	
<<<<<<< HEAD
    $.ajax({
        url: 'memo_proc',
        data: {'label_id' : click_LabelID},
        dataType: 'json',
        type: 'GET',
        success: function(data) {

            var forCount = $("#memoTab").children().length;
            var list = document.getElementById("memoTab");
            while (list.hasChildNodes()) {
              list.removeChild(list.firstChild);
            }
=======
        $.ajax({
            url: 'memo_proc',
            data: {'label_id' : click_LabelID},
            dataType: 'json',
            type: 'GET',
            success: function(data) {

                var forCount = $("#memoTab").children().length;
                var list = document.getElementById("memoTab");
                while (list.hasChildNodes()) {
                  list.removeChild(list.firstChild);
                }
>>>>>>> 7f0697860b9cff32538ebe1c70a9045d13fa25c4

    
            var memoCount = data.length;
            //alert(data.length);
            //console.log("memoTitle :::  "+ data[0].MEMO_TITLE);
            //$("#memoTab li").addClass("list-group-item");

            var memoID ='';
            for(var i=0;i<memoCount;i++) {
<<<<<<< HEAD
                $("#memoTab").append("<li>"
                                    +"<input></input>"
                                    +"<label>"+data[i].MEMO_TITLE+"</label>"
                                    +"<label class=\"memoUpdateDate\">"+data[i].MEMO_REG_DATE+"</label>"
                                    +"<div>"+data[i].MEMO_CONTENT+"</div>"
                                    +"</li>");
                memoID = data[i].MEMO_ID;
                $("#memoTab li").addClass("list-group-item");
                $("#memoTab li > input").attr("type","checkbox");
                $("#memoTab li > label").addClass("list-group-item-heading");
                $("#memoTab div").addClass("list-group-item-heading");
                
=======
                $("#memoTab").append("<li>"+data[i].MEMO_TITLE+"</li>");
                memoID = data[i].MEMO_ID;

>>>>>>> 7f0697860b9cff32538ebe1c70a9045d13fa25c4
                $('#memoList ul li').click(function() {
                    var memoTabIndex = $('#memoList ul li').index(this);
                    clickMemo(click_LabelID ,memoID);
                    alert("메모 클릭함..." + "(memoID: "+memoID+")");
                });

   	            //var node = document.createElement("li");                 // Create a <li> node
                //var textnode = document.createTextNode(data[i].MEMO_TITLE);         // Create a text node
                //node.appendChild(textnode);                              // Append the text to <li>
                //document.getElementById("memoTab").appendChild(node);     // Append <li> to <ul> with id="myList"
            }
<<<<<<< HEAD
=======
            $("#memoTab li").addClass("list-group-item");
>>>>>>> 7f0697860b9cff32538ebe1c70a9045d13fa25c4
        }
	});
}

// 메모 클릭했을 때..
function clickMemo(click_LabelID ,memoID)
{
	
        // 클릭한 라벨의 인덱스
          
    $.ajax({
        url: 'memo_proc/memo',
        data: {'label_id' : click_LabelID, 'memo_id' : memoID},
        dataType: 'json',
        type: 'GET',
        success: function(data) {

        	alert("memoID" + memoID);

        	console.log(data.length);
            console.log(" title : " + data[0].MEMO_TITLE 
                        + " / content : " + data[0].MEMO_CONTENT 
                        + " / regdate : " + data[0].MEMO_REGDATE);
            
			var memoCount = $("#memoTab li").length;

            $(".panel-heading").text(data[0].MEMO_TITLE);
            $(".panel-body").text(data[0].MEMO_CONTENT);

			// for(var i=0;i<memoCount;i++) {
			// 	if(i==memoClickIndex) {
			// 		$(".panel-heading").text(data[i].MEMO_TITLE);
			// 		$(".panel-body").text(data[i].MEMO_CONTENT);
			// 	}
			// }
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