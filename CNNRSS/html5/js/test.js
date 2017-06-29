var responseFeed;
var articles=[];
var totalArticles=0;
var cycleCount=1;
window.addEventListener('load',function(){

	page = document.getElementById('app-container');
	title = document.getElementById('article-title');
	description = document.getElementById('article-description');
	thumbnail = document.getElementById('article-thumbnail');
	icon = document.getElementById('cnnIcon');


}, false);
setInterval(function(){
	update();
},30);
setInterval(function(){
	cycle();
},5000);
function createObjects(url){
	var url = "http://rss.cnn.com/rss/cnn_topstories.rss";
	var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'"+url+"'";
	function createTree(){
	   	$.get(url1, function (data) {
	   		console.log("data:",data);
	   		var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
			responseFeed = items;

			createArticleCycle();
			shuffle();
			
			title.innerHTML= articles[0].title;
			description.innerHTML=fixDescription(articles[0].description);
			thumbnail.src = articles[0].src;
			document.getElementById('article-url').href = articles[0].href;
			


			thumbnail.width=window.innerWidth/3;
			thumbnail.height=window.innerHeight/3;
			icon.width=window.innerWidth = window.innerHeight*(4/3)/5;
			icon.height=window.innerHeight/5;
			
			console.log("items:",items);
	   		
	   							
	   	});
	}
/*
	function createCall() {
		google.load("feeds", "1", {callback:function(){

			feed = new google.feeds.Feed(url);
			feed.setNumEntries(numEntries);
			feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
			feed.load(buildData);
		}});
	};
			
	var buildData = function(result){
		if (!result.error)
		{
			var items = XML2jsobj(result.xmlDocument.getElementsByTagName('channel')[0]);
			console.log(result.xmlDocument.getElementsByTagName('channel')[0]);
			responseFeed = items;
				
		}
		Not relevant in app
	}
	*/			
	createTree();
}

/*		
function getVideosFeed()
{
	alert('no');
	console.log(responseFeed);			
	return responseFeed;
}
Never Used
*/
function fixDescription(desc){
	var k=1;
	for(var i=1;i<desc.length;i++){
		if(desc[i]=='<'){
			return desc.substring(0,i);
		}
	}
}
function cycle(){
	totalArticles=responseFeed.item.length;
	title.innerHTML= articles[cycleCount].title;
	description.innerHTML=fixDescription(articles[cycleCount].description);
	thumbnail.src = articles[cycleCount].src;
	document.getElementById('article-url').href = articles[cycleCount].href;



	thumbnail.width=window.innerWidth/3;
	thumbnail.height=window.innerHeight/3;
	icon.width=window.innerWidth = window.innerHeight*(4/3)/5;
	icon.height=window.innerHeight/5;
	cycleCount++;
	if (cycleCount==totalArticles){
		cycleCount=0;
	}
	console.log(cycleCount);

}
function createArticleCycle(){
		for(var i=0;i<responseFeed.item.length;i++){
			var newArticle = {};
			newArticle.title=responseFeed.item[i].title;
			newArticle.description=responseFeed.item[i].description;
			newArticle.src = responseFeed.item[i]["media:group"]["media:content"][0].url;
			newArticle.href = responseFeed.item[i].guid;

			articles.push(newArticle);
		}
	}
function shuffle() {
  	var currentIndex = articles.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  	while (0 !== currentIndex) {

    // Pick a remaining element...
    	randomIndex = Math.floor(Math.random() * currentIndex);
    	currentIndex -= 1;

    // And swap it with the current element.
   		temporaryValue = articles[currentIndex];
   		articles[currentIndex] = articles[randomIndex];
    	articles[randomIndex] = temporaryValue;
  	}
}			
function update(){
	var picHeight = window.innerHeight/3;
	var picWidth = picHeight*(4/3);
	thumbnail.height=picHeight;
	thumbnail.width=picWidth;


	var iconHeight = window.innerHeight/8;
	var iconWidth = iconHeight*(4/3);
	icon.width=iconWidth;
	icon.height=iconHeight;
		
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
