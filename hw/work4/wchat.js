var socket = io.connect("https://wall.cgcgbcbc.com");		
		
socket.on('connect',function() { 
	$.ajax({
		type: "get",
		url: "https://wall.cgcgbcbc.com/api/messages?num=3",
		success: function(data){
			var r = $('.r');			
			var p = $('.p');
			var n = $('.n');
			r[0].innerText = data[2].content;	
			r[1].innerText = data[1].content;	
			r[2].innerText = data[0].content;	
				
			n[0].innerText = data[2].nickname;
			n[1].innerText = data[1].nickname;
			n[2].innerText = data[0].nickname;
		
			p[0].src = data[2].headimgurl;	
			p[1].src = data[1].headimgurl;	
			p[2].src = data[0].headimgurl;																	
		}
	});
});

socket.on('new message',function(data) { 				
	var n = $('.n');				
	if(n[0].innerText != 'admin'){
		$(".m1").addClass("m0");
		$(".m1").removeClass("m1");
		$(".m0").hide(1000, function(){$(".m0").remove();});				
		$(".m2").addClass("m1");
		$(".m2").removeClass("m2");
		$(".m3").addClass("m2");
		$(".m3").removeClass("m3");				
		$(".m2").after('<div class = "message m3"></div>');
		$(".m3").append('<div class = "n"></div>');
		$(".m3").append('<image class = "p" src = ""></image>');
		$(".m3").append('<marquee class = "r"></marquee>');
				
		var r = $('.r');			
		var p = $('.p');
		var n = $('.n');
		var s = $('.message');
		for(var i = 0; i < n.length; i++){
			if(r[i].innerText === ""){
				r[i].innerText = data.content;
				n[i].innerText = data.nickname;
				p[i].src = data.headimgurl;
				r[i].style.fontSize = window.innerHeight * 0.16 + 'px';
				p[i].style.height = window.innerHeight * 0.17 + 'px';
				s[i+1].style.height = window.innerHeight / 4.1 + 'px'					
			}				
		}				
	}
	else if(n[0].innerText === 'admin'){
		$(".m2").addClass("m0");
		$(".m2").removeClass("m2");
		$(".m0").hide(1000, function(){$(".m0").remove();});				
		$(".m3").addClass("m2");
		$(".m3").removeClass("m3");				
		$(".m2").after('<div class = "message m3"></div>');
		$(".m3").append('<div class = "n"></div>');
		$(".m3").append('<image class = "p" src = ""></image>');
		$(".m3").append('<marquee class = "r"></marquee>');
				
		var r = $('.r');			
		var p = $('.p');
		var n = $('.n');
		var s = $('.message');
		for(var i = 1; i < n.length; i++){
			if(r[i].innerText === ""){
				r[i].innerText = data.content;
				n[i].innerText = data.nickname;
				p[i].src = data.headimgurl;
				r[i].style.fontSize = window.innerHeight * 0.16 + 'px';
				p[i].style.height = window.innerHeight * 0.17 + 'px';
				s[i+1].style.height = window.innerHeight / 4.1 + 'px'					
			}				
		}										
	}	
});

function removeAdmin(){
	$.ajax({
		type: "get",
		url: "https://wall.cgcgbcbc.com/api/messages?num=3",
		success: function(data){
			$(".m1").addClass("m0");
			$(".m1").removeClass("m1");
			$(".m0").hide(1000, function(){$(".m0").remove();});						
			$(".m2").before('<div class = "message m1"></div>');
			$(".m1").append('<div class = "n"></div>');
			$(".m1").append('<image class = "p" src = ""></image>');
			$(".m1").append('<marquee class = "r"></marquee>');
		
			var r = $('.r');			
			var p = $('.p');
			var n = $('.n');
			var s = $('.message');
			for(var i = 0; i < n.length; i++){
				if(r[i].innerText === ""){
					r[i].innerText = data[2].content;
					n[i].innerText = data[2].nickname;
					p[i].src = data[2].headimgurl;
					r[i].style.fontSize = window.innerHeight * 0.16 + 'px';
					p[i].style.height = window.innerHeight * 0.17 + 'px';
					s[i+1].style.height = window.innerHeight / 4.1 + 'px'					
				}				
			}														
		}
	});	
}
socket.on('admin',function(data) {  
	if(typeof timePross != "undefined")
		clearTimeout(timePross);
	timePross = setTimeout('removeAdmin()', 10000);	
	$(".m1").addClass("m0");
	$(".m1").removeClass("m1");
	$(".m0").hide(1000, function(){$(".m0").remove();});						
	$(".m2").before('<div class = "message m1"></div>');
	$(".m1").append('<div class = "n"></div>');
	$(".m1").append('<image class = "p" src = ""></image>');
	$(".m1").append('<marquee class = "r"></marquee>');
				
	var r = $('.r');			
	var p = $('.p');
	var n = $('.n');
	var s = $('.message');
	for(var i = 0; i < n.length; i++){
		if(r[i].innerText === ""){
			r[i].innerText = data.content;
			n[i].innerText = "admin";
			p[i].src = "http://imgsrc.baidu.com/forum/w%3D580/sign=c893ec9cf21f3a295ac8d5c6a924bce3/5a8fed36afc379314e92cb6be9c4b74542a9117c.jpg";
			r[i].style.fontSize = window.innerHeight * 0.16 + 'px';
			p[i].style.height = window.innerHeight * 0.17 + 'px';
			s[i+1].style.height = window.innerHeight / 4.1 + 'px'	
			s[i+1].style.backgroundColor = '#39cccc';
			s[i+1].style.color = 'yellow';
		}				
	}											
});

socket.on('disconnect',function() { 
	console.log('The client has disconnected!'); 
}); 