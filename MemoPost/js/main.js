
var postPanel = document.getElementById('postPanel');
var getTime = document.getElementById('date');
var getContent = document.getElementById('content');
var newpost = false;
var resetpost=false;
var regetTime = "";
var regetContent="";
var postbg = "#ffcc33";
var reP= '';
var recordDate = new Array();
var postContent = new Array();
var locationX = new Array();
var locationY = new Array();
var bgColor = new Array();
var idList = new Array();
var d = new Date();
var postID = d.getTime();

window.onload=function(){
	loadAll();
}

postPanel.addEventListener('mousemove',mouseMove,false);
postPanel.addEventListener('mousedown',mouseDown,false);

function postNew(){
	postPanel.innerHTML += "<span class=\"post\"" + "id=\"post" + postID + "\"" + "style=\"background:"+postbg+";top:150px;left:300px;\""+ ">" +
				getTime.value+"<br>"+
				getContent.value+
				"<br><span id=\"edit\">E</span>"+
				"</span>";
	newpost = true;
}
function changebg(color){
	postbg = color;
}

function mouseMove(e){
	if(newpost){
		var post  = document.getElementById('post'+postID+'');
		post.style.left= e.clientX-400+'px';
		post.style.top = e.clientY-200+'px';
	}
	else if(resetpost){
		reP.style.left= e.clientX-400+'px';
		reP.style.top = e.clientY-200+'px';
	}
}

function mouseDown(e){
	if(newpost){
		var post  = document.getElementById('post'+postID+'');
		if(parseInt(e.clientX-400)>0&&parseInt(e.clientX-400)<650&&parseInt(e.clientY-200)>0&&parseInt(e.clientY-200)<350){
			newpost=false;
			post.style.left= e.clientX-400+'px';
			post.style.top = e.clientY-200+'px';
			postID++;
			saveData(post);
		}
		else{
			post.classList.remove('swing');
			post.classList.add('swing');
		}
	}
	else if(resetpost){
		if(parseInt(e.clientX-400)>0&&parseInt(e.clientX-400)<650&&parseInt(e.clientY-200)>0&&parseInt(e.clientY-200)<350){
			resetpost=false;
			reP.style.left= e.clientX-400+'px';
			reP.style.top = e.clientY-200+'px';
			resaveData(reP);
		}
		//刪除
		else if(parseInt(e.clientX-400)>-200&&parseInt(e.clientX-400)<-20&&parseInt(e.clientY-200)>100&&parseInt(e.clientY-200)<250){
			if(localStorage.length>1){
				localStorage.removeItem(regetTime);
				loadAll();
			}
			else{
				localStorage.clear();
				postPanel.innerHTML='';
			}
			resetpost=false;
		}
		else{
			reP.classList.remove('swing');
			reP.classList.add('swing');
		}
	} 
	else{
		console.log(parseInt(e.clientX-400)+','+parseInt(e.clientY-200));
	}
}

function saveData(post){
	var data = {};
	data.recordDate = getTime.value;
	data.contents = getContent.value;
	data.locX = post.style.left;
	data.locY = post.style.top;
	data.bgcolor = post.style.background;
	data.postid = post.id;

	var str = JSON.stringify(data);
	localStorage.setItem(data.recordDate,str);
	loadAll();
	console.log("資料已儲存");
}
function resaveData(post){
	var data = {};
	data.recordDate = regetTime;
	data.contents = regetContent;
	data.locX = post.style.left;
	data.locY = post.style.top;
	data.bgcolor = post.style.background;
	data.postid = post.id;

	var str = JSON.stringify(data);
	localStorage.setItem(data.recordDate,str);
	loadAll();
	console.log("資料已覆蓋");

}

function loadAll(){
	if(localStorage.length > 0){
		postPanel.innerHTML = '';
		for(var i=0;i<localStorage.length;i++){
			var record = localStorage.key(i);
			var str = localStorage.getItem(record);

			//將 JSON 轉換成 Javascript 物件
			var recordData = JSON.parse(str);

			recordDate[i] = recordData.recordDate;
			postContent[i] = recordData.contents;
			locationX[i] = recordData.locX;
			locationY[i] = recordData.locY;
			bgColor[i] = recordData.bgcolor;
			idList[i] = recordData.postid;

			postPanel.innerHTML += "<span ondblclick=\"reset("+idList[i]+")\" class=\"post\"" + "id=\"" + idList[i] + "\""
			+ "style=\"background:" + bgColor[i] + "; left:" + locationX[i] + "; top:" + locationY[i] + ";\"" + ">" +
			recordDate[i] + "<br>" +
			postContent[i] + 
			"<br><span id=\"edit\" onclick=\"edit("+idList[i]+")\">E</span>"+
			"</span>";
		}
	}
}

function clearAll(){
	localStorage.clear();
	postPanel.innerHTML='';
	alert("刪除資料清單完成");
}


function reset(p){
	resetpost=true;
	reP = p;
	var tmp = (p.innerHTML).split("<br>");
	regetContent = tmp[1];
	regetTime = tmp[0];
}

var ep = document.getElementById('editbg');
var editTime = document.getElementById('editDate');
var editContent = document.getElementById('editContent');
var tempDate;
function edit(p){
	console.log("編輯模式");
	ep.style.display="inline-block";
	reP = p;//取得當前post
	var tmp = (p.innerHTML).split("<br>");
	editTime.value = tmp[0];
	editContent.value = tmp[1];
	tempDate = tmp[0];
}
function closeEdit(){
	ep.style.display="none";
}

function finishEdit(){
	localStorage.removeItem(tempDate);
	var data = {};
	data.recordDate = editTime.value;
	data.contents = editContent.value;
	data.locX = reP.style.left;
	data.locY = reP.style.top;
	data.bgcolor = postbg;
	data.postid = reP.id;
	var str = JSON.stringify(data);
	localStorage.setItem(data.recordDate,str);
	loadAll();
	console.log("資料已更新");
	ep.style.display="none";
}
