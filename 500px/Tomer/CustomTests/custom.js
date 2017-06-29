function createObjects(url){
	var searchInput = pullSearch(url);
	var url1 = "https://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20xml%20where%20url%20%3D%20%22https%3A%2F%2F500px.com%2Fsearch.rss%3Fq%3D"+searchInput+"%26type%3Dphotos%26sort%3Drelevance%22";
	function createTree(){
	   	$.get(url1, function (data) {
	   		console.log("data:",data);
	   		var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
			responseFeed = items;
			console.log("items:",items);
	   		
	   							
	   	});
	}
		
	createTree();
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
