var operator = ['-','+','x','÷'];
var key = document.querySelectorAll('#calculator>span');
var forwardChar='';
var dot = false;
var element = document.getElementById('screen');
var lines = document.getElementById('line');
var max = 30;
var isNeg = false;

for(var i=0;i<key.length;i++){


	key[i].onclick = function(){

		//要加入資料之螢幕
		var input = document.querySelector('#screen');
		//已在螢幕上之內容
		var screenVal = input.innerHTML;
		//按鈕之內容
		var btVal = this.innerHTML;

		setTimeout(rmBtoC(),250);

		if(btVal=='C'){
			onCtoT();
			setTimeout(function(){
				input.innerHTML='';
				forwardChar='';
				dot = false;
				onBtoC();
			},250);
		}

		else if(btVal=='|←'){
			screenVal = screenVal.replace(/.$/,'');
			if(forwardChar=='.'){
				dot=false;
			}
			forwardChar = screenVal[screenVal.length-1];

			//千分位
			var str='';
			var count=0;
			for(var i=screenVal.length-1;i>-1;i--){
				if(operator.indexOf(screenVal[i])<0){
					str = screenVal[i]+str;
					count++;
				}
				else{
					break;
				}
			}
			screenVal=screenVal.substring(0,(screenVal.length-count));
			str = str.replace(/,/g,'');
			var nums = (str+'').split(".");
			var out = ''; 

			for(var i=1;i<=nums[0].length;i++){
				out = (nums[0])[nums[0].length-i]+out;
				if(i%3==0 && i!=nums[0].length){
					out = ","+out;
				}
			}
			if(nums[1]==undefined){
				nums[1]='';
			}
			else{
				nums[1]= '.'+nums[1];
			}
			//---------------------------------------------
			input.innerHTML = screenVal+out+nums[1];

		}
		else if(operator.indexOf(btVal)>-1){
			
			if(screenVal.length<1){
				if(btVal=='-'){
					input.innerHTML+=btVal;
					forwardChar=btVal;
				}
			}
			else{
				//forward 為運算子
				if(operator.indexOf(forwardChar)>-1){

					//forward 非-
					if(operator.indexOf(forwardChar)>0){
						if(btVal!='-'){
							screenVal = screenVal.replace(/.$/,btVal);
							input.innerHTML = screenVal;
							forwardChar=btVal;
						}
						else if(btVal=='-'&&forwardChar=='+'){
							screenVal = screenVal.replace(/.$/,btVal);
							input.innerHTML = screenVal;
							forwardChar=btVal;
						}
						else{
							input.innerHTML+=btVal;
							forwardChar=btVal;
						}
					}
					//forward 為-
					else{
						//forward 前為 op
						if(operator.indexOf(screenVal[screenVal.length-2])>-1){
							//不做任何動作;
						}
						//forward 前非 op
						else if(screenVal.length>1){
							screenVal = screenVal.replace(/.$/,btVal);
							input.innerHTML = screenVal;
							forwardChar=btVal;
						}
					}
				}
				//forward 為運算元
				else if(screenVal.length<1){
					if(btVal=='-'){
						input.innerHTML+=btVal;
						forwardChar=btVal;
					}
				}
				else{
					input.innerHTML+=btVal;
					forwardChar=btVal;
				}
			}
			dot = false;
		}

		else if(btVal=='.'){
			if(screenVal.length<1||operator.indexOf(forwardChar)>-1){
				input.innerHTML += "0"+btVal;
				forwardChar=btVal; 
				dot = true;
			}
			else if(!dot&&!isNaN(forwardChar)){
				input.innerHTML +=btVal;
				forwardChar=btVal;
				dot = true;
			}
			
		}
		else if(btVal=='='){
			
			if(screenVal.length!=0){
			onCtoT();
			setTimeout(function(){
				var ans = screenVal;
				ans = ans.replace(/,/g,'');
				ans = ans.replace(/x/g,'*');
				ans = ans.replace(/÷/g,'/');
				if(operator.indexOf(forwardChar)>-1){
					ans = ans.replace(/.$/,'');
				}
				var result = eval(ans);
				//四捨五入並保留小數點
				result = (Math.round(result * 1000) / 1000);
				
				//加入千分位
				if(result>999||result<-999){
						var nums = (result+'').split(".");
						var out = ''; 
						for(var i=1;i<=nums[0].length;i++){
							out = (nums[0])[nums[0].length-i]+out;
							if(i%3==0 && i!=nums[0].length){
								out = ","+out;
							}
						}
						if(nums[1]==undefined){
							nums[1]='';
						}
						else{
							nums[1]= '.'+nums[1];
						}
						result = out+nums[1];
				}
				//---------------------------------------------

				input.innerHTML=result;
				forwardChar=0;

				if((result%1.0)!=0){
					dot = true;
				}
				onBtoC();
			},250);

			}
		}
		else if(screenVal.length<max){
				input.innerHTML += btVal;
				forwardChar=btVal;
				//千分位
				screenVal = input.innerHTML+'';
				var str='';
				var count=0;
				for(var i=screenVal.length-1;i>-1;i--){
					if(operator.indexOf(screenVal[i])<0){
						str = screenVal[i]+str;
						count++;
					}
					else{
						break;
					}
				}
				screenVal=screenVal.substring(0,(screenVal.length-count));
				str = str.replace(/,/g,'');
				var nums = (str+'').split(".");
				var out = ''; 

				for(var i=1;i<=nums[0].length;i++){
					out = (nums[0])[nums[0].length-i]+out;
					if(i%3==0 && i!=nums[0].length){
						out = ","+out;
					}
				}
				if(nums[1]==undefined){
					nums[1]='';
				}
				else{
					nums[1]= '.'+nums[1];
				}
				//---------------------------------------------
				input.innerHTML = screenVal+out+nums[1];
		}
	}
}

function onCtoT(){
	element.classList.add('CtoT');
	lines.classList.add('CtoT');
	lines.classList.remove('focus');
}

function onBtoC(){
	lines.classList.remove('CtoT');
	element.classList.add('BtoC');
	lines.classList.add('focus');
	lines.classList.add('BtoC');
}

function rmBtoC(){
	element.classList.remove('CtoT');
	element.classList.remove('BtoC');
	lines.classList.remove('BtoC');

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function changeStyle(v){
document.getElementsByTagName("link")["calculatorStyle"].href = "css/"+v + ".css";
}
