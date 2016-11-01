var l_offset = 0;
var t_offset = 0;
var s_width = 0;
var s_height = 0;
var d_width = 0;
var d_height = 0;

var origin_x = 800;
var origin_y = 600;
var ratio = 1;

var first_in = true;

var block_id = new Array(
"block-shanghai","block-zhejiang","block-gansu","block-shaanxi","block-anhui","block-hubei",
"block-chongqing","block-hunan","block-sichuan","block-shanxi","block-henan","block-fujian",
"block-jiangxi","block-guangdong","block-neimenggu","block-beijing","block-hebei",
"block-heilongjiang","block-liaoning","block-shandong","block-jiangsu","block-xishaqundao",
"block-hainan","block-yunnan","block-xizang","block-xinjiang","block-qinghai","block-ningxia",
"block-jilin","block-guizhou","block-guangxi","block-tianjin","block-taiwan");
var block_name = new Array(
"Shanghai","Zhejiang","Gansu","Shaanxi","Anhui","Hubei",
"Chongqing","Hunan","Sichuan","Shanxi","Henan","Fujian",
"Jiangxi","Guangdong","Neimenggu","Pékin","Hebei",
"Heilongjiang","Liaoning","Shandong","Jiangsu","Ile de Xisha",
"Hainan","Yunnan","Xizang","Xinjiang","Qinghai","Ningxia",
"Jilin","Guizhou","Guangxi","Tianjin");

function init(){
	getWindowData();
	// Ecran 4:3
	if(s_width/4*3 == s_height){
		d_width = s_width;
		d_height = s_height;
	} else if(s_width/4*3>s_height){		// Par exemple: 1920*1080 -- 1920/4*3 = 1440 > 1080
		// Height < Width
		d_height = s_height;
		d_width = s_height/3*4;
		l_offset = (s_width-d_width)/2;
	} else {
		// Height > Width
		d_width = s_width;
		d_height = s_width/4*3;
		t_offset = (s_height-d_height)/2;
	}
	ratio = d_width/origin_x;
	//document.getElementById("test_layer").innerHTML=
	//	"l_offset:"+l_offset+"<br/>"+
	//	"t_offset:"+t_offset+"<br/>"+
	//	"s_width:"+s_width+"<br/>"+
	//	"s_height:"+s_height+"<br/>"+
	//	"d_width:"+d_width+"<br/>"+
	//	"d_height:"+d_height+"<br/>"+
	//	"ratio:"+ ratio;
	resizeMap();
}

function getWindowData(){
	if (window.innerWidth)
		s_width = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
		s_width = document.body.clientWidth;
	if (window.innerHeight)
		s_height = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		s_height = document.body.clientHeight;
}

function resizeMap(){
	document.getElementById("map-container").style.width = d_width + "px";
	document.getElementById("map-container").style.height = 0.96 * d_height + "px";
	document.getElementById("map-scaler").setAttribute("transform", "translate(0,0) scale(" + ratio + " " + ratio + ")");
	
	document.getElementById("introduce-container").style.width = 0.95 * d_width + "px";
	document.getElementById("introduce-container").style.left = l_offset + "px";
	document.getElementById("introduce-container").style.height = 0.90 * d_height + "px";
	
	document.getElementById("bienvenue-container").style.width = 0.60 * d_width + "px";
	document.getElementById("bienvenue-container").style.left = l_offset + 0.20 * d_width + "px";
	document.getElementById("bienvenue-container").style.height = 0.90 * d_height + "px";
	
	document.getElementById("block-taiwan").style.left = l_offset + 595 * ratio + "px";
	document.getElementById("block-taiwan").style.top = 450 * ratio + "px";
	document.getElementById("img-taiwan").style.width = 23 * ratio + "px";
	document.getElementById("img-taiwan").style.height = 54 * ratio + "px";
	
	if(first_in){
		showBienvenue();
		first_in = false;
	}
}

function showBienvenue(){
	$("#bienvenue-container").fadeIn();
	setTimeout(function(){$("#bienvenue-container").fadeOut();}, 2000);
}

function block_click(x,i){
	for(var j=1;j<=33;j++){
			$("#"+block_id[j-1]).fadeOut();
	}
	$("#name-label").hide();
	document.getElementById("introduce-title").innerText = block_name[i-1];
	document.getElementById("introduce-sommaire").innerHTML = "<p>" + block_sommaire[i-1] + "</p>";
	document.getElementById("introduce-langue").innerHTML = "<p>" + block_langue[i-1] + "</p>";
	$("#introduce-container").animate({width: "show"}, 500);
	$("#introduce-title").animate({width: "show"}, 500);
	setTimeout(show_intro, 520);
}

function show_intro(){
	$("#introduce-sommaire").animate({height: 'show'}, 300);
	$("#introduce-langue").animate({height: 'show'}, 300);
}

function high(x,i){
	x.setAttribute("fill", "rgba(255,255,255, 0.8)");
	document.getElementById("name-label").innerText= block_name[i-1];
	$("#name-label").stop();
	$("#name-label").fadeIn();
}

function low(x,i){
	x.setAttribute("fill", "rgba(108,164,219,0)");
	$("#name-label").stop();
	$("#name-label").fadeOut();
}

function back(){
	$("#introduce-sommaire").animate({height: 'hide'}, 300);
	$("#introduce-langue").animate({height: 'hide'}, 300);
	setTimeout(hide_intro, 320);
}

function hide_intro(){
	$("#introduce-container").animate({width: "hide"}, 500);
	$("#introduce-title").animate({width: "hide"}, 500);
	for(var j=1;j<=33;j++){
			$("#"+block_id[j-1]).fadeIn();
	}
}