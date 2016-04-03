
// 라벨을 클릭했을 때..
function clickLabel(click_LabelID)
{
	
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

    
            var memoCount = data.length;
            //alert(data.length);
            //console.log("memoTitle :::  "+ data[0].MEMO_TITLE);
            //$("#memoTab li").addClass("list-group-item");

            var memoID ='';
            for(var i=0;i<memoCount;i++) {
                $("#memoTab").append("<li>"+data[i].MEMO_TITLE+"</li>");
                memoID = data[i].MEMO_ID;

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
            $("#memoTab li").addClass("list-group-item");
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