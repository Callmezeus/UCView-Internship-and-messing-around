var responseFeed;

function createVideoCall(url){
	var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'"+url+"'";
	function getWithJQ2(){
	   	$.get(url1, function (data) {
	   		console.log("data:",data);
	   		var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
			responseFeed = items;
			console.log("items:",items);
		
	   		initCNNFeed(responseFeed);
	   							
	   	});
	}

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
			initCNNFeed(responseFeed);			
		}
	}			
	getWithJQ2();

}
		
function getVideosFeed()
{
	alert('no');
	console.log(responseFeed);			
	return responseFeed;
}
			
			
		
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
		
function XML2jsobj(node) {

	var	data = {};
			
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
			if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
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
		
