var responseFeed;
var interval=0;
var url="";
var totalImages=0;
var cycleCount=1;
var allImages=[];
var allDescriptions=[];
var allAuthors=[];
window.addEventListener('load',function(){
	window.params =
	{
	    interval: -1,
	    category: '',
	};

	parseUrl();
	url=getUrl();
	
	if(!checkParams()){
		alert('Wrong interval or wrong category given');
        return;
	}

	startApp();
	interval=window.params.interval;

	page = document.getElementById('app-container');
	image = document.getElementById('frontimg');
	description = document.getElementById('picture-description');
	backimg = document.getElementById('backimg');
	if(getCookie("cook")==""||getCookie("cook")==undefined||getCookie("cook")==null){
		cycleCount=0;
	}else{
		cycleCount=getCookie("cook");
	}
	setInterval(function(){
	    startApp();
		setCookie("cook",cycleCount);
	},interval*1000);

}, false);

function checkParams() {
    var params = window.params;
    if (params.category == null || params.category == undefined)
        return false;
    params.category = params.category.toLowerCase();
    if (params.category != 'popular' &&
		params.category != 'upcoming' &&
		params.category != 'fresh' &&
		params.category != 'editors' &&
		params.category != 'custom') return false;
    if (params.interval == null || params.interval == undefined)
        return false;
    if (params.interval < 5)
        return false;
    return true;
}
function getUrl() {
    var par = window.params;
    url = "https://500px.com/";
    if (par.category != "custom"){
        return url + par.category + ".rss";
    }else{
        return url + "search.rss?q="
            + ((par.search == undefined) ? "" : par.search)
            + "&type=photos"
            + "&sort=date";
    }
}
function startApp(){
	//One of the default searches
	if(url=="https://500px.com/popular.rss"||url=="https://500px.com/upcoming.rss"||url=="https://500px.com/fresh.rss"||url=="https://500px.com/editors.rss"){
		var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'"+url+"'";
	
	function createTree(){
	   	$.get(url1, function(data) {
	   		console.log("data:",data);
	   		var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
	   		responseFeed = items;

	   	    var images = $(data.documentElement).find("description").text().match(/<img\s.+>(?=<)/g);
	   	    var srcs = $.map(images, function(img) {
	   	        return $(img).attr("src")
	   	    });

	   	    createImageArray(srcs);
	   	    createDescriptionArray(responseFeed);
	   	    if(getCookie("cook")==""||getCookie("cook")==undefined||getCookie("cook")==null){
	   	    		
	   	    		image.src= allImages[0];
	   	   			description.innerHTML=allDescriptions[0];
	   	   			backimg.src=allImages[cycleCount];

	   	   		}else{

	   	   			cycleCount=getCookie("cook");
	   	   			if(cycleCount>0){
	   	   				cycleCount--;
	   	   			}
	   	   			image.src=allImages[cycleCount];
	   	   			description.innerHTML=allDescriptions[cycleCount];
	   	   			cycleCount++;

	   	   	}
	   	   	cycleCount++;
	   	   		if (cycleCount==allImages.length){
	   	   			cycleCount=0;
	   	   		}
	   	   		setCookie("cook",cycleCount);
	   	      
	   	});
	   
	}
	
	createTree();

	}else{
		//Custom search
		var searchInput = pullSearch(url);
		var url1 = "https://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20xml%20where%20url%20%3D%20%22https%3A%2F%2F500px.com%2Fsearch.rss%3Fq%3D"+searchInput+"%26type%3Dphotos%26sort%3Drelevance%22";
		
		function createTreeCustom(){
	   		$.get(url1, function(data) {
	   			console.log("data:",data);
	   			var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
	   			responseFeed = items;

	   			if(responseFeed.item==undefined){
	   				alert("No results found! Try searching something else.");
	   				return;
	   			}
	   	  
	   	    	setImages(responseFeed);
	   	    	setDescriptions(responseFeed);
	   	   		setAuthors(responseFeed);
	   	   		//console.log("You are at:",getCookie("cook")-1);
	   	   		if(getCookie("cook")==""||getCookie("cook")==undefined||getCookie("cook")==null){

	   	    		image.src= responseFeed.item[cycleCount]["media:content"].url;
	   	   			description.innerHTML=allDescriptions[cycleCount]+ " by "+allAuthors[cycleCount];

	   	   			backimg.src=allImages[cycleCount]
	   	   		}else{
	   	   			
	   	   			cycleCount=getCookie("cook");
	   	   			if(cycleCount>0){
	   	   				cycleCount--;
	   	   			}
	   	   			image.src=responseFeed.item[cycleCount]["media:content"].url;
	   	   			description.innerHTML=allDescriptions[cycleCount]+ " by " + allAuthors[cycleCount-1];
	   	   			cycleCount++;
	   	   		}
	   	   			cycleCount++;
	   	   		if (cycleCount==allImages.length){
	   	   			cycleCount=0;
	   	   		}
	   	   		setCookie("cook",cycleCount);
	   	      
		
	   		});
	   
		}
	createTreeCustom();
	}
}
function setCookie(cname, cvalue) {

    document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setImages(feed){
	for(var i=0;i<feed.item.length;i++){
		allImages[i]=feed.item[i]["media:content"].url;
	}
}
function setDescriptions(feed){
	for(var i=0;i<feed.item.length;i++){
		allDescriptions[i]=feed.item[i].title;
	}
}
function setAuthors(feed){
	for(var i=0;i<feed.item.length;i++){
		allAuthors[i]=feed.item[i].author;
	}
}
function pullSearch(feed){
	var start=0;
	var end =0;
	var foundStart=0;
	var foundEnd=0;
	for(var i=0;i<feed.length;i++){
		if(feed[i]==='=' && foundStart===0){
			//console.log("= found at character: ", i);
			start=i+1;
			foundStart=1;
		}

		if(feed[i]==="&"&&foundEnd===0){
			//console.log("Amp found at :", i);
			end = i;
			foundEnd=1;
		}
	}
	return feed.substring(start,end);
}
function cycle(){
	totalImages = responseFeed.item.length;

	image.src = allImages[cycleCount];
	description.innerHTML=allDescriptions[cycleCount];
	//image.height=window.innerHeight;
	//image.width=window.innerWidth;

	cycleCount++;
	if (cycleCount==allImages.length){
		cycleCount=0;
	}
}
function cycleCustom(){
	totalImages = responseFeed.item.length

	image.src = allImages[cycleCount];
	description.innerHTML=allDescriptions[cycleCount] + " by " + allAuthors[cycleCount];

	cycleCount++;
	if(cycleCount==allImages.length){
		cycleCount=0;
	}
	backimg.src=allImages[cycleCount];

}

function createDescriptionArray(feed){
	for(var i=0;i<feed.item.length;i++){
		allDescriptions[i] = feed.item[i].title;
	}
}
function createImageArray(srcs){
	for(var i=0;i<srcs.length;i++){
		allImages[i] = srcs[i];
	}
}
function getUrlVars() {
	var vars = {};
	var paconsorts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
		
function XML2jsobj(node) {

	var	data = {};

	// append a value
	function Add(name, value) {
		if (data[name]) {
			if (data[name].constructor != Array) {
				data[name] = [data[name]];
			}
			data[name][data[name].length] = value;
		}
		else {
			data[name] = value;
		}
	};
	
	// element attributes
	var c, cn;
	for (c = 0; cn = node.attributes[c]; c++) {
		Add(cn.name, cn.value);
	}
	
	// child elements
	for (c = 0; cn = node.childNodes[c]; c++) {
		if (cn.nodeType == 1) {
			if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3 || cn.childNodes.length == 1&& cn.firstChild.nodeType === 4) {
				// text value
				Add(cn.nodeName, cn.firstChild.nodeValue);
			}
			else {
				// sub-object
				Add(cn.nodeName, XML2jsobj(cn));
			}
		}
	}

	return data;

}

function parseUrl() {
    /// Pattern to get (key=value) pairs from GET request
    var pattern = /(\w{1,}=\w{1,})/g;
    var results = window.location.href.match(pattern);
    var obj = {};

    if (results != null) {
        for (var i = 0; i < results.length; i++) {
            var chunks = results[i].split('=');
            obj[chunks[0]] = chunks[1];
        }
    }
    window.params = obj;
}