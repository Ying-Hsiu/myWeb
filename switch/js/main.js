	var button3 = document.getElementById('button3');
	var button2 = document.getElementById('button2');
	var onB = document.getElementById('on');
	var offB = document.getElementById('off');
	var shadow = document.getElementById('shadow');

	button3.addEventListener('click',function(){

		if(button3.className=='on'){
			button3.classList.remove('on');
			button3.classList.add('off');
			button2.style.background="#f3f4f6";
			button2.style['boxShadow']= "0 0 0 1px rgba(20%,20%,40%,0.5),inset 0 2px 5px 1px rgba(20%,20%,40%,0.1)";
			onB.style.top= "140px";
			onB.style.background="#b8b8b8";
			offB.style.top="260px"; 
			offB.style.border="10px solid #e8e8e8";
			shadow.style.display ="none";
			document.body.style.background = "#FFF";
		}
		else{
			button3.classList.remove('off');
			button3.classList.add('on');
			button2.style.background="#c8c8c8";
			onB.style.top= "110px";
			onB.style.background="#E8E8E8";
			offB.style.top= "230px";
			offB.style.border="10px solid #FFF";
			shadow.style.display = "inline-block";
			document.body.style.background = "#333";
		}
		

		console.log(button3.className);

	},false);