var pause = document.getElementById('buttons_p');
var start = document.getElementById('buttons_s');
var restart = document.getElementById('buttons_rs');
var quit = document.getElementById('buttons_q');
var counter_b = document.getElementById('big');
var counter_m = document.getElementById('mini');
var counter = document.getElementById('timer');
var content = document.getElementById('content');
var m = document.querySelectorAll('span.min');
var s = document.querySelectorAll('span.sec');
var colorS = document.querySelectorAll('#square');
var colorD = document.querySelectorAll('#diamond');
var slide;
//store color
var Ncolor = ['green','yellow','red'];
var	Ccolor = ['#598001','#f2e500','#cc0001'];
var stack = new Array();
var view = [1,1,1,1];
var viewCount = 4;

var conadd;
var finalms =['',''];

//加入事件監聽
start.addEventListener('click',play,false);
restart.addEventListener('click',replay,false);
pause.addEventListener('click',stop,false);
quit.addEventListener('click',exit,false);
content.addEventListener('mousedown',mouseDown,false);
content.addEventListener('mouseup',mouseUp,false);
content.addEventListener('mousemove',mouseMove,false);

var blocks = document.querySelectorAll('.block');
//暫存block原位置，若有收疊則更新
var rx = new Array(blocks.length);
var bx = new Array(blocks.length);
var by = new Array(blocks.length);

for(var i = 0;i<blocks.length;i++){
	rx[i] = parseInt(blocks[i].style.left);
	bx[i] = parseInt(blocks[i].style.left);
	by[i] = parseInt(blocks[i].style.top);
	blocks[i].addEventListener('mousedown',mouseDown,false);
	blocks[i].addEventListener('mouseup',mouseUp,false);
	blocks[i].addEventListener('mousemove',mouseMove,false);
}

var tailM,tailS,headM,headS;
var ms = new Array();
for(var i=0;i<blocks.length;i++){
	tailM = parseInt(m[i].innerHTML);
	tailS = s[i].innerHTML.replace(/:/g,'');
	headM = parseInt(m[i].innerHTML);
	headS = s[i].innerHTML.replace(/:/g,'');
	if(tailS==''){
		tailS+=0;
	}
	if(headS==''){
		headS+=0;
	}
	var temp = {hm:headM,hs:headS,tm:tailM,ts:tailS};
	ms.push(temp);
}

var img = document.querySelectorAll('img');
for(var i=0;i<img.length;i++){
	img[i].addEventListener('dragstart', function(e){
	     e.preventDefault();
	},false);
}
s[0].style.opacity='0';

var isSec=false;
var run;
var tempBColor = '';
//計時器運作
function timer(mine,sec){
	pause.style.display='inline-block';
	run=setInterval(
		//顯示
		function(){
			if(sec==0&&mine==0){
				clearInterval(run);
				for(var i=0;i<blocks.length;i++){
					blocks[i].style.display='inline-block';
				}
				counter.style.display='none';
				start.style.display='inline';
				restart.style.display='none';
				quit.style.display='none';
				pause.style.display='none';
				document.body.style.background = '#FFF';
				counter.className='';
			}

			for(var i=1;i<4;i++){
				var ss = s[i].innerHTML.replace(/:/g,'');
				var mm = m[i].innerHTML.replace(/:/g,'');
				if(ss==''){
					ss = ss+0;
				}
				if(mm==''){
					mm = mm+0;
				}
				
				if(mine==mm&&sec==ss&&view[i]==1){
					counter.className='';
					document.body.style.background = Ccolor[i-1];
					counter.classList.add(Ncolor[i-1]);
					tempBColor = i-1;
				}
			}

			if(mine>0){
				counter_b.innerHTML=mine;
				counter_m.innerHTML=sec;
			}
			else{
				counter_b.classList.add('timerun');
				isSec = true;
				counter_b.innerHTML=sec;
				counter_m.innerHTML='';
			}
			//遞減
			if(sec>0){
				sec--;
			}
			else{
				if(mine>0){
					mine--;
					sec+=59;
					
				}
			}
		},1000);
}

//計時器啟動
function play(e){

	for(var i=0;i<m.length;i++){
		//console.log(m[i].innerHTML+','+s[i].innerHTML);
	}
	for(var i=0;i<blocks.length;i++){
		blocks[i].style.display='none';
	}
	counter.style.display='inline';
	start.style.display='none';
	pause.style.display='inline';
	timer(m[0].innerHTML,s[0].innerHTML.replace(/:/g,''));
}
//計時器終止
function exit(e){
	for(var i=0;i<blocks.length;i++){
		if(view[i]==1){
			blocks[i].style.display='inline-block';
		}
	}
	isSec=false;
	tempBColor = '';
	counter.style.display='none';
	start.style.display='inline';
	restart.style.display='none';
	quit.style.display='none';
	pause.style.display='none';
	counter_b.className='';
	counter.className = '';
	counter_b.innerHTML='';
	counter_m.innerHTML='';
	document.body.style.background = '#FFF';
} 

//計時器暫停
function stop(e){
	clearInterval(run);
	quit.style.display='inline';
	restart.style.display='inline';
	pause.style.display='none';
	counter.className = '';
	counter.classList.add('gray');
	counter_b.classList.remove('timerun');
	document.body.style.background = '#FFF';

}

//計時器繼續
function replay(e){
	restart.style.display='none';
	quit.style.display='none';
	pause.style.display='inline';
	counter.className='';
	counter.classList.add(Ncolor[tempBColor]);
	document.body.style.background = Ccolor[tempBColor];
	if(isSec==true){
		timer(counter_m.innerHTML,counter_b.innerHTML);
	}
	else{
		timer(counter_b.innerHTML,counter_m.innerHTML);
	}
}

var clock = 0.1;
var add = 0;
var drag = false;
var choose = true;
var direct = 0;
var loc;
var mouseX ,mouseY;
//按下進行拖曳
function mouseDown(e){
	drag=true;
	mouseX = e.clientX;
	mouseY = e.clientY;
	for(var i=0;i<4;i++){
		if(e.clientX>bx[i]&&e.clientX<bx[i]+200&&e.clientY>by[i]&&e.clientY<by[i]+280&&view[i]==1){
			loc = i;
		}
	}
	console.log('loc: '+loc);
}
//結束拖曳動作
function mouseUp(e){
		clearInterval(conadd);
		addTime(add,1);
	//回復原位
	for(var i=0;i<bx.length;i++){
		blocks[i].style.left = bx[i]+'px';
		blocks[i].style.top = by[i]+'px';
	}
	clock = 0.1;
	add=0;
	drag=false;
	choose = true;
	direct = 0;
	loc='';
}


function mouseMove(e){
	if(drag){
		var tx = parseInt(e.clientX,10);
		var ty = parseInt(e.clientY,10);
		
		var dx = (tx-100)-bx[loc];
		var dy = (ty-140)-by[loc];

		if(Math.abs(tx-mouseX)>Math.abs(ty-mouseY)&&choose==true){
			//平移
			direct=1;
			choose=false;
		}
		else if(Math.abs(tx-mouseX)<Math.abs(ty-mouseY)&&choose==true){
			//縱移
			direct=-1;
			choose=false;
		}

		//平移
		if(direct>0){
			//左移
			if(dx<0){
				blocks[loc].style.left = bx[loc]+dx+'px';
				var index;
				if(bx[loc]+dx<bx[loc]-110&&viewCount<4){
					//console.log('OwO!!!!!!!!!!!!!!!!');
					for(var i=0;i<4;i++){//取出所有中最末個被隱藏之block
						if(view[i]==0){
							index = i;
						}
					}
					//console.log('before: '+stack);
					colorS[index].className=stack[stack.length-1];
					colorD[index].className=stack[stack.length-1];
					//更換bell圖檔
					if(stack[stack.length-1]=='yellow'){
						blocks[index].getElementsByTagName('img')[0].src="bell.png";
					}
					else{
						blocks[index].getElementsByTagName('img')[0].src="bell_w.png";
					}
					stack.pop(stack[stack.length-1]);
					//console.log('after: '+stack);
					blocks[index].style.display='inline-block';
					blocks[index].style.left = bx[loc]+'px';

					//調整分鐘秒數
					var tmp1 = -1//後
					var tmp2 = loc//前
					var tmp3 = -1;//前前
					for(var i=0;i<4;i++){
						if(bx[i]==bx[loc]+220&&view[i]==1){
							tmp1 = i;
						}
						else if(bx[i]==bx[loc]-220&&view[i]==1){
							tmp3 = i;
						}
					}

					if(tmp1==-1){//新增值為最後一位
						if(viewCount==1){
							m[index].innerHTML = finalms[0];
							s[index].innerHTML = finalms[1];
						}
						else if(ms[tmp2].hm==0&&ms[tmp2].hs==15){
							m[index].innerHTML = 0;
							s[index].innerHTML = ':'+15;
							s[tmp2].innerHTML = ':'+(parseInt(ms[tmp2].hs)+15);
							if(tmp3!=-1&&ms[tmp3].hm==0&&ms[tmp3].hs==30){
								s[tmp3].innerHTML = ':'+(parseInt(ms[tmp3].hs)+15);
							}
						}
						else{
							if(ms[tmp2].hs==0){
								m[index].innerHTML = ms[tmp2].hm-1;
								s[index].innerHTML = ':'+45;
							}
							else if(ms[tmp2].hs==15){
								m[index].innerHTML = ms[tmp2].hm;
								s[index].innerHTML = '';
							}
							else{
								m[index].innerHTML = ms[tmp2].hm;
								s[index].innerHTML = ':'+(parseInt(ms[tmp2].hs)-15);
							}
						}
					}
					else{//新增於兩者中間，記得判斷是否是白色的那個
						console.log('tmp3: '+tmp3);
						if(tmp3==-1){
							if(parseInt(ms[tmp2].hm)==(parseInt(ms[tmp1].hm)+1)&&parseInt(ms[tmp1].hs)==45){
								m[index].innerHTML = ms[tmp2].hm;
								s[index].innerHTML = '';
								m[tmp2].innerHTML = (parseInt(ms[tmp2].hm)+1);
								console.log('夾中間');
							}
							else{
								if(parseInt(ms[tmp1].hs)==45){
									m[index].innerHTML = (parseInt(ms[tmp1].hm)+1);
									s[index].innerHTML = '';
									console.log('分加一');
								}
								else{
									m[index].innerHTML = parseInt(ms[tmp1].hm);
									s[index].innerHTML = ':'+(parseInt(ms[tmp1].hs)+15);
									console.log('秒加15');
								}
							}
						}
						else{
							if(parseInt(ms[tmp2].hm)==(parseInt(ms[tmp1].hm)+1)&&parseInt(ms[tmp1].hs)==45){
								m[index].innerHTML = ms[tmp2].hm;
								s[index].innerHTML = '';
								s[tmp2].innerHTML = ':'+15;
								m[tmp3].innerHTML = parseInt(m[tmp2].innerHTML)+1; 
								console.log('tmp-1夾中間');
							}
							else{
								if(parseInt(ms[tmp1].hs)==45){
									m[index].innerHTML = parseInt(ms[tmp1].hm)+1;
									s[index].innerHTML = '';
									console.log('tmp-1分加一');
								}
								else{
									m[index].innerHTML = parseInt(ms[tmp1].hm);
									s[index].innerHTML = ':'+(parseInt(ms[tmp1].hs)+15);
									if(s[index].innerHTML==':45'){
										m[tmp2].innerHTML = parseInt(m[index].innerHTML)+1;
										s[tmp2].innerHTML = '';
										if(parseInt(m[tmp3].innerHTML)==parseInt(m[tmp2].innerHTML)){
											m[tmp3].innerHTML = parseInt(m[tmp2].innerHTML)+1;
										}
									}
									else{
										s[tmp2].innerHTML = ':'+(parseInt(ms[tmp1].hs)+30);
									}									
									console.log('tmp-1秒加15');
								}
							}
						}
					}

					bx[index] = bx[loc];
					view[index]=1;
					viewCount++;
					//將loc後含loc元素向前挪動
					for(var i=0;i<4;i++){
						if(view[i]==1&&bx[i]<=bx[index]&&i!=index){
							bx[i]-=220;
							blocks[i].style.left = bx[i]+'px';
						}	
					}
				}

				for(var i=0;i<4;i++){
					if(bx[i]<bx[loc]){
						blocks[i].style.left = bx[i]+dx+'px';
					}
				}
				//console.log('left');
			}
			//右移
			else{
				var index;
				blocks[loc].style.left = bx[loc]+dx+'px';
				//loc移動覆蓋下一元素且元素之view為可視

				if(bx[loc]+dx>bx[loc]+110&&bx[loc]<790){
					for(var i=0;i<4;i++){
						if(view[i]==1&&bx[i]==bx[loc]+220){//取出最接近loc之block
							index = i;
						}
					}


					//loc 與此元素同位置
					bx[loc] = bx[index];
					view[index]=0;//設定元素為被覆蓋
					viewCount--;
					
					blocks[index].style.display='none';
					//將顏色值丟入堆疊
					stack.push(colorS[index].className);

					if(viewCount==1){
						finalms[0] = m[index].innerHTML;
						finalms[1] = s[index].innerHTML;
					}

					//將loc前之元素向後挪動
					for(var i=0;i<4;i++){
						if(view[i]==1&&bx[i]<bx[loc]){
							bx[i]+=220;
							blocks[i].style.left = bx[i]+'px';
						}		
					}
					console.log(view);
				}

				for(var i=0;i<4;i++){
					if(bx[i]<bx[loc]){
						blocks[i].style.left = bx[i]+dx+'px';
					}
				}
				//console.log('right');
			}
		}
		//縱移
		else if(direct<0){
			//上移
			if(dy<0){
				blocks[loc].style.top = by[loc]+dy+'px';
				//console.log('top');
				//當中心變化距離超過某值時增加
				if(dy<-80){
					add=1;
					conAdd(add,dy*-1);
				}
			}
			//下移
			else{
				blocks[loc].style.top = by[loc]+dy+'px';
				//console.log('bottom');
				//當中心變化距離超過某值時減少
				if(dy>80){
					add=-1;
					conAdd(add,dy);
				}
			}
		}
	}
	//取所有m與s值
	ms = new Array();
	for(var i=0;i<blocks.length;i++){
		tailM = parseInt(m[i].innerHTML);
		tailS = s[i].innerHTML.replace(/:/g,'');
		headM = parseInt(m[i].innerHTML);
		headS = s[i].innerHTML.replace(/:/g,'');
		if(tailS==''){
			tailS+=0;
		}
		if(headS==''){
			headS+=0;
		}
		var temp = {hm:headM,hs:headS,tm:tailM,ts:tailS};
		ms.push(temp);
	}

}

function addTime(add,uni){
	//增減值
	if(add!=0){
		var mValue = parseInt(m[loc].innerHTML);
		var sValue = s[loc].innerHTML;
		sValue = sValue.replace(/:/g,'');
		if(sValue==''){
			sValue+=0;
		}
		var temp = parseInt(sValue)+15*add;
		
		//判斷是否在前後值的範圍內，取loc的前後值?
		tailM=-1;
		tailS=-1;
		headM=100;
		headS=100;

		for(var i=0;i<4;i++){
			//取得head
			if(bx[i]==bx[loc]-220&&view[i]==1){
				headM = ms[i].hm;
				headS = ms[i].hs;
			}
			//取得tail
			else if(bx[i]==bx[loc]+220&&view[i]==1){
				tailM = ms[i].tm;
				tailS = ms[i].ts;
			}
		}
		if(uni==1){
			if(loc==0){
				if((add>0&&(mValue+add<100))||(add<0&&tailM<(mValue+add))){
					if(mValue+add!=0){
						m[loc].innerHTML = mValue+add;
					}
				}
				s[loc].innerHTML = '';	
			}
			else if(add>0&&temp>45&&mValue<99){//進位
				if(headM>(mValue+1)||headM==(mValue+1)&&headS>=15){
					m[loc].innerHTML = mValue+1*add;
					s[loc].innerHTML = '';
				}
			}
			else if(add<0&&temp==0){//秒歸零，於分不等於零時執行
				if(tailM<mValue&&parseInt(m[loc].innerHTML)!=0){
					s[loc].innerHTML = '';
				}
			}  
			else if(add<0&&temp<0&&mValue!=0){
				if(tailM<mValue&&tailS<45){
					m[loc].innerHTML = mValue+1*add;
					s[loc].innerHTML = ':'+45;
				}
			}
			else if(temp>0){
				if(add>0&&(headS>temp||headM>mValue)||add<0&&(tailS<temp||tailM<mValue)){
					s[loc].innerHTML = ':'+temp;
				}
				
			}
		}
		else if(uni==2){//只跳分
			if((add>0&&(mValue+add<headM))||(add<0&&tailM<(mValue+add))){
					m[loc].innerHTML = mValue+add;
				}
		}
		
	}
}

function conAdd(add,d){
	clearInterval(conadd);	
	var some = 0.22;
	conadd = setInterval(
		function(){
			if(clock>1){
				ad = add;
				addTime(ad,2);
			}	
			clock += clock*some;
			console.log(clock);
		}
	,15000/d);
		
}

function slideIn(index){
	var v = 1;
	slide = setInterval(
		function(){
			if(v<10){
				blocks[index].style.left = bx[index]-30*v+'px';
				v+=1;
			}
			
		}
		,100);
}
		

