/*var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');*/
var cvs_2 = document.getElementById('cvs_2');
var ctx_2 = cvs_2.getContext('2d');
var colors=["#75c6e1","#46b847","#a7af38","#eadd12","#f3ab23","#fc902d","#dfcadd","#d673b3","#ef3a27","#372974","#3146a1","#329cd6"];
var startGame = false;
var r = 50;//地球的半徑
var stonesBox = new Array();
var ballsBox = new Array();
var health = 3;
var panelP;
var game;
var reset;
var scores = 0;
var speed = 1.5;
var level = 'Normal';
var image = new Image();
//彗星撞地球
//475,40


//加入事件監聽
cvs_2.addEventListener('mousemove',mouseMove,false);
window.addEventListener('keydown',this.test,false);

function mouseMove(event){
    if(startGame){
            panel(event.clientX,event.clientY,0.2,r);
    }
}

function test(event){
    var code = event.keyCode;
    //Enter
    if(code==13&&startGame==false&&health>0){
            clearInterval(title);
            clearInterval(reset);
            ctx_2.clearRect(0,0,cvs_2.width,cvs_2.height);
            startGame=true;
            play();
    }
    //R
    else if(code==82&&startGame==false){
        if(health>0){
            stonesBox= new Array();
        }
        else{
        }
        clearInterval(reset);
        ballsBox = new Array();
        stonesBox= new Array();
        scores=0;
        health=3;
        speed=1.5;
        level='Normal';
        start();
    }
    //E
    else if(code==69&&startGame==false){
            speed = 0.5;
            level = 'Easy';
    }
    //N
    else if(code==78&&startGame==false){
            speed = 1.5;
            level = 'Normal';
    }
    //H
    else if(code==72&&startGame==false){
            speed = 3;
            level = 'Hard';
    }
    //Q
    else if(code==81&&startGame==true){
            startGame=false;
            gameOver();
    }
    else{
        console.log(code);
    }
} 

function gameOver(){
    clearInterval(game);
    reset = setInterval(function(){
        ctx_2.clearRect(0,0,400,400);
        text('red','→ Press \'R\' key to back Title ←',90,160,'12pt');
        if(health>0){
            text('red','or',195,180,'12pt');
            text('red','→ Press \'ENTER\' key to back game ←',70,200,'12pt');  
        }
        text('#FFF','YOUR SCORE: '+scores,145,240,'12pt');
    },50);
}

/*  遊戲開始畫面  */

//x=675,y=240

//產生panel
function panel(ex,ey,size,r){
    var m = (ey-240)/(ex-675);
    var radias=Math.atan(m)/3;//取得弧度
    ctx_2.lineWidth='50px';
    ctx_2.strokeStyle='#FFF';
    var tx=0;
    var ty=0;
    //第一象限1.5~2
    if(ex>675&&ey<240){
        ctx_2.beginPath();
        ctx_2.arc(200,200,r+10,(1.5+(0.5+radias)-size)*Math.PI,(1.5+(0.5+radias))*Math.PI);
        ctx_2.stroke();

        tx = 200+55*Math.cos((1.5+(0.5+radias)-size/2)/Math.PI*10);
        ty = 200+55*Math.sin((1.5+(0.5+radias)-size/2)/Math.PI*10);    
        

    }
    //第二象限0~0.5    
    else if(ex>675&&ey>240){ 
        ctx_2.beginPath();
        ctx_2.arc(200,200,r+10,(radias-size)*Math.PI,(radias)*Math.PI);
        ctx_2.stroke();

        tx = 200+55*Math.cos((radias-size/2)/Math.PI*10);
        ty = 200+55*Math.sin((radias-size/2)/Math.PI*10);
    }
    //第三象限0.5~1    
    else if(ex<675&&ey>240){
        ctx_2.beginPath();
        ctx_2.arc(200,200,r+10,(0.5+(0.5+radias)-size)*Math.PI,(0.5+(0.5+radias))*Math.PI);
        ctx_2.stroke();

        tx= 200+55*Math.cos((0.5+(0.5+radias)-size/2)/Math.PI*10);
        ty= 200+55*Math.sin((0.5+(0.5+radias)-size/2)/Math.PI*10);
    }
    //第四象限1~1.5
    else if(ex<675&&ey<240){
        ctx_2.beginPath();
        ctx_2.arc(200,200,r+10,(1+radias-size)*Math.PI,(1+radias)*Math.PI);
        ctx_2.stroke();

        tx = 200+55*Math.cos((1+radias-size/2)/Math.PI*10);
        ty = 200+55*Math.sin((1+radias-size/2)/Math.PI*10);
    }
    panelP={x:ex,y:ey,mr:m,tx:tx,ty:ty};

}

//地球
function earth(r){
    if(health==3){ 
        ctx_2.fillStyle='#0066cc';
        ctx_2.beginPath();
        ctx_2.arc(200,200,r,0,2*Math.PI);
        ctx_2.fill();

        ctx_2.beginPath();
        ctx_2.arc(195,200,5,0,1.5*Math.PI);
        ctx_2.stroke();
        ctx_2.beginPath();
        ctx_2.arc(205,200,5,1.5*Math.PI,3*Math.PI);
        ctx_2.stroke();
    }
    else if(health==2){
        ctx_2.fillStyle='#CCCC33';
        ctx_2.beginPath();
        ctx_2.arc(200,200,r,0,2*Math.PI);
        ctx_2.fill();

        ctx_2.beginPath();
        ctx_2.arc(195,200,5,0,1*Math.PI);
        ctx_2.stroke();
        ctx_2.beginPath();
        ctx_2.arc(205,200,5,1*Math.PI,2*Math.PI);
        ctx_2.stroke();
    }
    else if(health==1){
        ctx_2.fillStyle='#CC3333';
        ctx_2.beginPath();
        ctx_2.arc(200,200,r,0,2*Math.PI);
        ctx_2.fill();

        ctx_2.beginPath();
        ctx_2.arc(200,200,10,1*Math.PI,2*Math.PI);
        ctx_2.stroke();
    }

    ctx_2.fillStyle='rgba(255,255,255,0.9)';
    ctx_2.beginPath();
    ctx_2.arc(170,190,5,0,2*Math.PI);
    ctx_2.fill();
    ctx_2.beginPath();
    ctx_2.arc(230,190,5,0,2*Math.PI);
    ctx_2.fill();
}

//生命值
function hp(health){
    ctx_2.fillStyle='red';
    for(var h=0;h<health;h++){
        ctx_2.beginPath();
        ctx_2.moveTo(25+h*25,35);
        ctx_2.lineTo(35+h*25,35);
        ctx_2.lineTo(25+h*25,45);
        ctx_2.lineTo(15+h*25,35);
        ctx_2.fill();
        ctx_2.beginPath();
        ctx_2.arc(20+h*25,35,5,0,2*Math.PI);
        ctx_2.fill()
        ctx_2.beginPath();
        ctx_2.arc(30+h*25,35,5,0,2*Math.PI);
        ctx_2.fill();
    }
}

//開始遊戲
function play(){
        cvs_2.style.cursor='none';
    game = setInterval(function(){
        if(stonesBox.length==0){
            createStone(Math.floor(Math.random()*5));
        }
        if(health==0){
            startGame=false;
            gameOver();
        }
        moveStone();
        earth(r);
        score();
        hp(health);
        panel(panelP.x,panelP.y,0.2,r);
        touch();
    },10);
}

//碰撞判斷
function touch(){
    //取得所有隕石，並判斷是否與panel重疊
    for(var j=0;j<stonesBox.length;j++){
        var num = stonesBox[j].id;
        var bx = Math.floor(stonesBox[j].x);
        var by = Math.floor(stonesBox[j].y);
        var color = stonesBox[j].color;
        var d_x = stonesBox[j].dx;
        var d_y = stonesBox[j].dy;
        //是否彈開隕石
        if((Math.abs(bx-panelP.tx)<15)&&(Math.abs(by-panelP.ty)<15)){
           d_x = -d_x;
           d_y = -d_y;
           bx+=d_x;
           by+=d_y;

           stonesBox[j].x=bx;
           stonesBox[j].y=by;
           stonesBox[j].dx = d_x;
           stonesBox[j].dy = d_y;
           scores+=100;            
        }
        //是否碰撞地球
        if(((Math.abs(bx-200)<r-10))&&((Math.abs(by-200)<r-10))){
            console.log('----------'+bx+','+by);
            stonesBox.splice(j,1);
            ctx_2.fillStyle='red';
            ctx_2.beginPath();
            ctx_2.rect(0,0,400,400);
            ctx_2.fill();
            health-=1;

        }
    }
}

//積分表
function score(){
    text('red','YOUR SCORE:'+scores,10,25,'12pt');
    text('#FFF','Press \'Q\' to Quit',280,380,'12pt');
}


var direX=[1,1,1,-1];
var direY=[1,-1,1,1]

//產生隕石
function createStone(num){
    var locX=[Math.floor(Math.random()*400),Math.floor(Math.random()*400),0,400];
    var locY=[0,400,Math.floor(Math.random()*400),Math.floor(Math.random()*400)];
    var color=['#006633','#993333','#FFFFFF'];
    var ballnum=0;
    for(var i=0;i<num;i++){
        //top bottom left right
        var id = ballnum;
        var ran = Math.floor(Math.random()*4);
        var tempX = locX[ran];
        var tempY = locY[ran];
        var tempColor = color[Math.floor(Math.random()*2)];
        var tempSize = Math.random()*5+10;
        var t_d_x = speed*direX[ran];
        var t_d_y = speed*direY[ran];  

        ctx_2.fillStyle=tempColor;
        ctx_2.beginPath();
        ctx_2.arc(tempX,tempY,tempSize,0,2*Math.PI);
        ctx_2.fill();
        var tball = {id:id,x:tempX,y:tempY,color:tempColor,size:tempSize,dx:t_d_x,dy:t_d_y};
        stonesBox.push(tball);
        console.log(stonesBox);
        ballnum = ballnum+1;
    }
}

//移動隕石
function moveStone(){
        ctx_2.clearRect(0,0,cvs_2.width,cvs_2.height);
     for(var i=0;i<stonesBox.length;i++){
        //取值
        var num = stonesBox[i].id;
        var x = stonesBox[i].x;
        var y = stonesBox[i].y;
        var color = stonesBox[i].color;
        var size = stonesBox[i].size;
        var d_x = stonesBox[i].dx;
        var d_y = stonesBox[i].dy;

        //取得新值
        x+=d_x;
        y+=d_y;
        //移動
        ctx_2.fillStyle=color;
        ctx_2.beginPath();
        ctx_2.arc(x,y,size,0,2*Math.PI);
        ctx_2.fill();
        //回填新資料
        stonesBox[i].x = x;
        stonesBox[i].y = y;
        stonesBox[i].dx = d_x;
        stonesBox[i].dy = d_y;
        //移除超出畫面之隕石
        if(x>440||x<-40){
            console.log(stonesBox+','+stonesBox[i].id+','+num);
            stonesBox.splice(i,1);
           
        }
        if(y>440||y<-40){
            console.log(stonesBox+','+stonesBox[i].id+','+num);
            stonesBox.splice(i,1);
        }


    }
}


/*  遊戲標題畫面  */


function text(color,str,x,y,size){
    ctx_2.fillStyle=color;
    ctx_2.font=size+" bold ";
    ctx_2.fillText(str,x,y);

}
//產生球

function createBall(num){
    for(var i=0;i<num;i++){
        var tempX = Math.random()*400;
        var tempY = Math.random()*400;
        var tempColor = colors[Math.floor(Math.random()*12)];
        var tempSize = Math.random()*20;
        var t_d_x = Math.random()*20;
        var t_d_y = Math.random()*20;  

        ctx_2.fillStyle=tempColor;
        ctx_2.beginPath();
        ctx_2.arc(tempX,tempY,tempSize,0,2*Math.PI);
        ctx_2.fill();

        var tball = {x:tempX,y:tempY,color:tempColor,size:tempSize,dx:t_d_x,dy:t_d_y};
        ballsBox.push(tball);
    }
}

//移動球
function moveBall(){
        ctx_2.clearRect(0,0,cvs_2.width,cvs_2.height);
    for(var i=0;i<ballsBox.length;i++){
        //取值
        var x = ballsBox[i].x;
        var y = ballsBox[i].y;
        var color = ballsBox[i].color;
        var size = ballsBox[i].size;
        var d_x = ballsBox[i].dx;
        var d_y = ballsBox[i].dy; 
        //判斷範圍
        if(x>400||x<0){
           d_x=-d_x;
        }
        if(y>400||y<0){
           d_y=-d_y;
        }
        //取得新值
        x+=d_x;
        y+=d_y;
        //移動
        ctx_2.fillStyle=color;
        ctx_2.beginPath();
        ctx_2.arc(x,y,size,0,2*Math.PI);
        ctx_2.fill();
        //回填新資料
        ballsBox[i].x = x;
        ballsBox[i].y = y;
        ballsBox[i].dx = d_x;
        ballsBox[i].dy = d_y;
    }
}

function button(cX,cY,x,y,color){
        ctx_2.beginPath();
        ctx_2.fillStyle=color;
        ctx_2.moveTo(cX-x,cY-y);
        ctx_2.lineTo(cX+x,cY-y);
        ctx_2.lineTo(cX+x,cY+y);
        ctx_2.lineTo(cX-x,cY+y);
        ctx_2.lineTo(cX-x,cY-y);
        ctx_2.fill();
}


var title;
function start(){
        createBall(12);
        title=setInterval(function(){
        moveBall();
        text('#FFF','→ Press \'ENTER\' key to start game ←',75,348,'12pt');
        text('#C30','THE EARTH',90,100,'32pt');
        text('#C30','DEEP IMPACT',160,120,'12pt');
        text('#FFF','Difficulty Level: '+level,130,200,'12pt');
    },100);
}
var j = start();


















/*
//時鐘

function clockBg(){
    
    var angle=90;
        ctx.beginPath();
        ctx.fillStyle='#000';
        ctx.arc(0,0,150,0,2*Math.PI);
        ctx.fill();
    for(var i=0;i<colors.length;i++){
        ctx.beginPath();
        ctx.fillStyle=colors[i];
        ctx.lineWidth=='3';
        ctx.arc(0+150*Math.cos(degreeToRadias(angle)),0-150*Math.sin(degreeToRadias(angle)),39,0,2*Math.PI);
        angle-=30;
        ctx.fill(); 
    }
}

function degreeToRadias(degree){
    return (Math.PI/180)*degree;
}

function drawHand(size,thickness){
    ctx.shadowColor = '#555';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;


    thickness = thickness||4;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(thickness*-1,-10);
    ctx.lineTo(0,size*-1);
    ctx.lineTo(thickness,-10);
    ctx.lineTo(0,0);
    ctx.fill();
}

function secondHand(theDate){
    ctx.save();
    var second = theDate.getSeconds();

    ctx.fillStyle = 'red';

    ctx.rotate(degreeToRadias(second*6));

    drawHand(120);
    ctx.restore();
}

function minuiteHand(theDate){
    var minutes = theDate.getMinutes() + theDate.getSeconds()/60;

    ctx.save();
    ctx.fillStyle='white';
    ctx.rotate(degreeToRadias(minutes*6));
    drawHand(100);
    ctx.restore();
}

function hourHand(theDate){
    var hours = theDate.getHours()+theDate.getMinutes()/60;
    var degrees = (hours*360/12)
    
    ctx.save();
    ctx.fillStyle='white';
    ctx.rotate(degreeToRadias(degrees));//從基準點旋轉
    drawHand(80,7);
    ctx.restore();
}
function pendulum(angle){
        ctx.fillStyle="#C30";
        ctx.beginPath();
        ctx.arc(0+260*Math.cos(degreeToRadias(angle)),0-260*Math.sin(degreeToRadias(angle)),15,0,2*Math.PI);
        ctx.fill();
        setTimeout(function(){
            ctx.fillStyle="#CCC";
            ctx.beginPath();
            ctx.arc(0+260*Math.cos(degreeToRadias(angle)),0-260*Math.sin(degreeToRadias(angle)),16,0,2*Math.PI);
            ctx.fill();
        },100/6);

       
}
function drawClock(){
    ctx.clearRect(-300,-300,cvs.width,cvs.height);
    //需要取得時間
    var theDate = new Date();
    clockBg();
    hourHand(theDate);
    minuiteHand(theDate);
    secondHand(theDate);
}

function clockApp(){
        ctx.translate(200,200);
        drawClock();
        setInterval('drawClock()', 1000);
        
}
var i = setInterval(clockApp(),300);*/
/*
var i =0;
//文字陰影
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;   
ctx.shadowBlur = 10;


var colorText = function(){
    if(i>2){
        i=0;
        ctx.clearRect(0,0,cvs.width, cvs.height);
    }
    ctx.font="25 bold 華康飾藝體";
    ctx.strokeText('測試文字', 100, 100);
    ctx.fillStyle="purple";
    ctx.shadowColor="#C30";
    ctx.fillText('HTML5從零開始', 100, 200);
    i++;
}
var i = setInterval(function(){colorText();},300);
*/


/*
//移動的黑球
var x=0;
var right=true;

function moveBall(){
    if(x==cvs.width){
        right=false;
    }
    else if(x==0){
        right=true;
    }

    if(right){
        ctx.clearRect(0,0,cvs.width,cvs.height);
        ctx.beginPath();
        ctx.arc(x,150,10,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        x+=10;
    }
    else{
        ctx.clearRect(0,0,cvs.width,cvs.height);
        ctx.beginPath();
        ctx.arc(x,150,10,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        x-=10;
    }

}
*/
//var i = setInterval(function(){moveBall();},50);
    

