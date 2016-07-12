var color = new Array();
color[""] = "#CCC0B3";
color["2"] = "#EEE4DA";
color["4"] = "#EDE0C8";
color["8"] = "#F2B179";
color["16"] = "#F49563";
color["32"] = "#F5794D";
color["64"] = "#F55D37";
color["128"] = "#EEE863";
color["256"] = "#EDB04D";
color["512"] = "#ECB04D";
color["1024"] = "#EB9437";
color["2048"] = "#EA7821";
color["-2"] = "#EEE4DA";
color["-4"] = "#EDE0C8";
color["-8"] = "#F2B179";
color["-16"] = "#F49563";
color["-32"] = "#F5794D";
color["-64"] = "#F55D37";
color["-128"] = "#EEE863";
color["-256"] = "#EDB04D";
color["-512"] = "#ECB04D";
color["-1024"] = "#EB9437";
color["-2048"] = "#EA7821";

var player = 1;
var playerScore0 = 0;
var playerScore1 = 0;
function randomNum(n){
	return Math.floor(Math.random()*n);
}//0到n-1的随机数
function randomPos(){
	var b = $('.n');
	var emptyBlock = new Array();
	var j = 0;
	for(var i = 0; i < 16; i++){
		if(b[i].innerText === ""){
			emptyBlock[j] = i;
			j++;
		}
	}
	var ans = emptyBlock[randomNum(j)]
	return ans;
}//返回一个没有数字的位置

function scoreAdd(playerNum, addNum){
	var p = $(".player")
	if(playerNum === 1){
		playerScore0 = playerScore0 - addNum;
		p[0].innerText = "玩家1(asdw),得分：" + playerScore0;	
	}
	if(playerNum === 0){
		playerScore1 = playerScore1 + addNum;
		p[1].innerText = "玩家2(上下左右),得分：" + playerScore1;	
	}				
}//得分

function addTwoNum(playerNum){
	b = $('.n');
	if(playerNum === 0){				
		player = 1;
		var addBlock = randomPos();
		if(randomNum(10) === 0){
			b[addBlock].innerText = '4';
		}						
		else {
			b[addBlock].innerText = '2';
		}
		showCartoon(addBlock);
		addBlock = randomPos();
		if(randomNum(10) === 0 && typeof addBlock != "undefined"){
			b[addBlock].innerText = '-4';
		}						
		else if(typeof addBlock != "undefined"){
			b[addBlock].innerText = '-2';
		}
		showCartoon(addBlock);
	}
	else{				
		player = 0;
		var addBlock = randomPos();
		if(randomNum(10) === 0){
			b[addBlock].innerText = '-4';
		}						
		else {
			b[addBlock].innerText = '-2';
		}
		showCartoon(addBlock);
		addBlock = randomPos();
		if(randomNum(10) === 0 && typeof addBlock != "undefined"){
			b[addBlock].innerText = '4';
		}						
		else if(typeof addBlock != "undefined"){
			b[addBlock].innerText = '2';
		}
		showCartoon(addBlock);
	}		
}

function endJudge(){
	var b = document.getElementsByClassName('n');
	var endFlag = true;
	for(var i = 0; i < 16; i++){
		if((b[i].innerText > 0 && player === 0)||(b[i].innerText < 0 && player === 1)){
			if(i > 3 && (b[i-4].innerText === "" || parseInt(b[i].innerText) + parseInt(b[i-4].innerText) === 0 || b[i].innerText === b[i-4].innerText)){
				return false;					
			}
			if(i % 4 != 0 && (b[i-1].innerText === "" || parseInt(b[i].innerText) + parseInt(b[i-1].innerText) === 0 || b[i].innerText === b[i-1].innerText)){
				return false;					
			}	
			if(i < 12 && (b[i+4].innerText === "" || parseInt(b[i].innerText) + parseInt(b[i+4].innerText) === 0 || b[i].innerText === b[i+4].innerText)){
				return false;					
			}
			if(i % 4 != 3 && (b[i+1].innerText === "" || parseInt(b[i].innerText) + parseInt(b[i+1].innerText) === 0 || b[i].innerText === b[i+1].innerText)){
				return false;					
			}
		}
	}
	return endFlag;
}//判断何时无法继续游戏

function setColor(){
	var b = $('.n');
	for(var i = 0; i < 16; i++){
		b[i].style.backgroundColor = color[b[i].innerText]; 
	}							
}

function showCartoon(cellNum){
	var showCell = ".c" + cellNum;
	$(showCell).addClass("animated bounceIn");
	setTimeout(function(){
        $(showCell).removeClass("animated bounceIn");
    }, 300);
}

function doubleCartoon(cellNum){
	var showCell = ".c" + cellNum;
	$(showCell).addClass("animated pulse");
	setTimeout(function(){
        $(showCell).removeClass("animated pulse");
    }, 300);	
}

function fadeCartoon(cellNum){
	var showCell = ".c" + cellNum;
	var b = $('.n');
	$(showCell).addClass("animated fadeOut");
	b[cellNum].innerText = "";
	setTimeout(function(){
        $(showCell).removeClass("animated fadeOut");		
    }, 300);
}

function startGame(){
	var b = $('.n');
	for(var i = 0; i < 16; i++){
		b[i].innerText = ""; 
	}					
	var startBlock = randomPos();		
	b[startBlock].innerText = '2';	
	showCartoon(startBlock);
	startBlock = randomPos();	
	b[startBlock].innerText = '-2';
	showCartoon(startBlock);
	setColor();
}//游戏开始	
	
function rightEvent(playerNum){
	var b = $('.n');
	var changeFlag = false;
	var doubleFlag = false;
	for(var i = 0; i < 4; i++){
		var endPos = 4*i+3;
		var tempPos = endPos;
		for(var j = 4*i+3; j >= 4*i; j--){
			if((b[j].innerText > 0 && playerNum === 0)||(b[j].innerText < 0 && playerNum === 1)){
				if(endPos != 4*i+3 && b[j].innerText === b[endPos + 1].innerText && doubleFlag === false){
					b[endPos+1].innerText = 2*b[endPos+1].innerText + "";
					doubleCartoon(endPos+1);
					scoreAdd(playerNum, parseInt(b[endPos+1].innerText));
					b[j].innerText = "";
					changeFlag = true;
					doubleFlag = true;
				}//融合发生
				else if(endPos != 4*i+3 && parseInt(b[j].innerText) + parseInt(b[endPos + 1].innerText) === 0 && doubleFlag === false){
					b[endPos].innerText = b[j].innerText;
					b[j].innerText = "";
					fadeCartoon(endPos+1);
					fadeCartoon(endPos);
					endPos = tempPos;
					changeFlag = true;
					doubleFlag = true;
				}//消除发生
				else{
					if(j != endPos){
						changeFlag = true;
					}
					var temp = b[j].innerText;
					b[j].innerText = "";
					b[endPos].innerText = temp;						
					endPos = endPos - 1;
					doubleFlag = false;
				}//位移发生
			}
			else if(b[j].innerText != ""){
				tempPos = endPos;
				endPos = j - 1;
			}					
		}			
	}	
	if(changeFlag === true){
		//在此处新数字加入
		addTwoNum(playerNum);
	}
	setColor();
	if(endJudge() === true){
		alert('fail');
	}
}//点击向右的按键

function leftEvent(playerNum){
	var b = $('.n');
	var changeFlag = false;
	var doubleFlag = false;
	for(var i = 0; i < 4; i++){
		var endPos = 4*i;
		var tempPos = endPos;
		for(var j = 4*i; j <= 4*i+3; j++){
			if((b[j].innerText > 0 && playerNum === 0)||(b[j].innerText < 0 && playerNum === 1)){
				if(endPos != 4*i && b[j].innerText === b[endPos - 1].innerText && doubleFlag === false){
					b[endPos-1].innerText = 2*b[endPos-1].innerText + "";
					doubleCartoon(endPos-1);
					scoreAdd(playerNum, parseInt(b[endPos-1].innerText));
					b[j].innerText = "";
					changeFlag = true;
					doubleFlag = true;
				}	
				else if(endPos != 4*i && parseInt(b[j].innerText) + parseInt(b[endPos - 1].innerText) === 0 && doubleFlag === false){
					b[endPos].innerText = b[j].innerText;
					b[j].innerText = "";
					fadeCartoon(endPos);
					fadeCartoon(endPos-1);
					endPos = tempPos;
					changeFlag = true;
					doubleFlag = true;
				}
				else{
					if(j != endPos){
						changeFlag = true;
					}
					var temp = b[j].innerText;
					b[j].innerText = "";
					b[endPos].innerText = temp;						
					endPos = endPos + 1;
					doubleFlag = false;
				}
			}
			else if(b[j].innerText != ""){
				tempPos = endPos;
				endPos = j + 1;
			}					
		}			
	}	
	if(changeFlag === true){			
		addTwoNum(playerNum);
	}
	setColor();
	if(endJudge() === true){
		alert('fail');
	}
}//点击向左的按键

function topEvent(playerNum){
	var b = $('.n');
	var changeFlag = false;
	var doubleFlag = false;
	for(var i = 0; i < 4; i++){
		var endPos = i;
		var tempPos = endPos;
		for(var j = i; j <= 12+i; j = j + 4){
			if((b[j].innerText > 0 && playerNum === 0)||(b[j].innerText < 0 && playerNum === 1)){
				if(endPos != i && b[j].innerText === b[endPos - 4].innerText && doubleFlag === false){
					b[endPos-4].innerText = 2*b[endPos-4].innerText + "";
					doubleCartoon(endPos-4);
					scoreAdd(playerNum, parseInt(b[endPos-4].innerText));
					b[j].innerText = "";
					changeFlag = true;
					doubleFlag = true;
				}	
				else if(endPos != i && parseInt(b[j].innerText) + parseInt(b[endPos - 4].innerText) === 0 && doubleFlag === false){
					b[endPos].innerText = b[j].innerText;
					b[j].innerText = "";
					fadeCartoon(endPos-4);
					fadeCartoon(endPos);
					endPos = tempPos;
					changeFlag = true;
					doubleFlag = true;
				}
				else{
					if(j != endPos){
						changeFlag = true;
					}
					var temp = b[j].innerText;
					b[j].innerText = "";
					b[endPos].innerText = temp;						
					endPos = endPos + 4;
					doubleFlag = false;
				}
			}
			else if(b[j].innerText != ""){
				tempPos = endPos;
				endPos = j + 4;
			}					
		}			
	}	
	if(changeFlag === true){				
		addTwoNum(playerNum);
	}
	setColor();
	if(endJudge() === true){
		alert('fail');
	}
}//向上

function bottomEvent(playerNum){
	var b = $('.n');
	var changeFlag = false;
	var doubleFlag = false;
	for(var i = 0; i < 4; i++){
		var endPos = 12+i;
		var tempPos = endPos;
		for(var j = i+12; j >= i; j = j - 4){
			if((parseInt(b[j].innerText) > 0 && playerNum === 0)||(b[j].innerText < 0 && playerNum === 1)){
				if(endPos != i+12 && b[j].innerText === b[endPos + 4].innerText && doubleFlag === false){
					b[endPos+4].innerText = 2*b[endPos+4].innerText + "";
					doubleCartoon(endPos+4);
					scoreAdd(playerNum, parseInt(b[endPos+4].innerText));
					b[j].innerText = "";
					changeFlag = true;
					doubleFlag = true;
				}	
				else if(endPos != i+12 && parseInt(b[j].innerText) + parseInt(b[endPos + 4].innerText) === 0 && doubleFlag === false){
					b[endPos].innerText = b[j].innerText;
					b[j].innerText = "";
					fadeCartoon(endPos+4);
					fadeCartoon(endPos);
					endPos = tempPos;
					changeFlag = true;
					doubleFlag = true;
				}
				else{
					if(j != endPos){
						changeFlag = true;
					}
					var temp = b[j].innerText;
					b[j].innerText = "";
					b[endPos].innerText = temp;						
					endPos = endPos - 4;
					doubleFlag = false;
				}
			}
			else if(b[j].innerText != ""){
				tempPos = endPos;
				endPos = j - 4;
			}					
		}			
	}	
	if(changeFlag === true){
		addTwoNum(playerNum);
	}
	setColor();
	if(endJudge() === true){
		alert('fail');				
	}
}//向下

document.onkeydown = function(e){
	var e = e || window.event;
	var k = e.keyCode || e.which;
	if(k === 37 && player === 0){
		setTimeout('leftEvent(0)', 200);
	}//左箭头
	if(k === 38 && player === 0){
		setTimeout('topEvent(0)', 200);
	}//上箭头
	if(k === 39 && player === 0){
		setTimeout('rightEvent(0)', 200);
	}//右箭头
	if(k === 40 && player === 0){
		setTimeout('bottomEvent(0)', 200);
	}//下箭头
	if(k === 65 && player === 1){
		setTimeout('leftEvent(1)', 200);
	}//a
	if(k === 87 && player === 1){
		setTimeout('topEvent(1)', 200);
	}//w
	if(k === 68 && player === 1){
		setTimeout('rightEvent(1)', 200);
	}//d
	if(k === 83 && player === 1){
		setTimeout('bottomEvent(1)', 200);		
	}//s
}

document.getElementsByClassName("button")[0].onclick = function(){
	startGame();
};

startGame();