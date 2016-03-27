function clickLabel(labelClickIndex)
{
	
        // 클릭한 라벨의 인덱스
          
        $.ajax({
            url: 'test',
            data: {'index' : labelClickIndex},
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
            $("#memoTab li").addClass("list-group-item");

            for(var i=0;i<memoCount;i++) {
                $("#memoTab").append("<li>"+data[i].MEMO_TITLE+"</li>");



   	            //var node = document.createElement("li");                 // Create a <li> node
                //var textnode = document.createTextNode(data[i].MEMO_TITLE);         // Create a text node
                //node.appendChild(textnode);                              // Append the text to <li>
                //document.getElementById("memoTab").appendChild(node);     // Append <li> to <ul> with id="myList"
                
            }
            $("#memoTab li").addClass("list-group-item");
        }
	});
}

function clickMemo(memoClickIndex)
{
	
        // 클릭한 라벨의 인덱스
          
    $.ajax({
        url: 'test',
        data: {'index' : memoClickIndex},
        dataType: 'json',
        type: 'GET',
        success: function(data) {

        	alert("memoClickIndex" + memoClickIndex);

        	console.log(data.length);
			console.log(data[0].MEMO_TITLE);
			console.log(data[0].MEMO_CONTENT);
			console.log(data[0].MEMO_REGDATE);

			var memoCount = $("#memoTab li").length;

			// for(var i=0;i<memoCount;i++) {
			// 	if(i==memoClickIndex) {
			// 		$(".panel-heading").text(data[i].MEMO_TITLE);
			// 		$(".panel-body").text(data[i].MEMO_CONTENT);
			// 	}
			// }
        }
	});
}