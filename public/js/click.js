
// 라벨을 클릭했을 때..
function clickLabel(click_LabelID)
{
	
        $.ajax({
            url: 'test',
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
        url: 'test/memo',
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
        url: 'modalTest',
        data: {'inputLabel' : inputLabel},
        dataType: 'json',
        type: 'POST',
        success: function() {
            window.location.reload();
        }
	});    
}