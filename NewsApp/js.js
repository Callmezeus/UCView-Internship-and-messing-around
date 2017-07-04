var responseFeed;
var CNN;
var BBC;
var NYT;
var Guardian;
var fat="";
var cycleCount=0;

window.addEventListener('load',function(){
		image1 = document.getElementById('test1');
		desc1 = document.getElementById('test1d');
		listo = document.getElementById('list');
		startApp();
		
	}, false);

function startApp(){  
    var d = new Date();
    var hour=d.getHours();
    var displayHour = hour;
    var min =d.getMinutes();
    min=min.toString();
    if(min.length==1){
    	min="0"+min;
    }
    if(hour>12){
	  displayHour = hour-12;
    } 
    var day = d.getDate();
    var month = d.getMonth() +1;
 	var year = d.getFullYear();
	
	createCNNTree();
	createBBCTree();
	createNYTree();
	createGuardTree();
	setTimeout(function(){
		var loading = document.getElementById('loading');
		loading.style.display='none';
		createStartPage();
	},10000);
	setInterval(function(){
		refresh();
		cycleCount++;
		if(cycleCount>=4){
			cycleCount=0;
		}
	},60000);

}
function createStartPage(){
	var i=0;
	for(i=0;i<15;i++){
		if(CNN.item[i]!=undefined){
			var entry1 = document.createElement('img');
			if(CNN.item[i]["media:group"]!=undefined){
				entry1.src = CNN.item[i]["media:group"]["media:content"][0].url;
			}


			var entry2 = document.createElement('a');
			entry2.setAttribute('target',"_new");
			entry2.setAttribute('href', CNN.item[i].link);

			entry2.appendChild(document.createTextNode(CNN.item[i].title));
		
		//var entry3 = document.createElement('p');
		//entry3.appendChild(document.createTextNode(fixDescription(CNN.item[i].description)));
		
			listo.appendChild(entry1);
			listo.appendChild(entry2);
		//listo.appendChild(entry3);
		}
		if(BBC.item[i]!=undefined){
			var entry1 = document.createElement('img');
			if(BBC.item[i]["media:thumbnail"]!=undefined){
				entry1.src = BBC.item[i]["media:thumbnail"].url;
			}

			var entry2 = document.createElement('a');
			entry2.appendChild(document.createTextNode(BBC.item[i].title));
			entry2.setAttribute('target',"_new");
			entry2.setAttribute('href', BBC.item[i].link);

		//var entry3 = document.createElement('p');
		//entry3.appendChild(document.createTextNode(fixDescription(BBC.item[i].description)));

			listo.appendChild(entry1);
			listo.appendChild(entry2);
		//listo.appendChild(entry3);
		}
		if(NYT.item[i]!=undefined){
			var entry1 = document.createElement('img');
		
			if(NYT.item[i]["media:content"]!=undefined){
				entry1.src = NYT.item[i]["media:content"].url;
			}

			var entry2 = document.createElement('a');
			entry2.appendChild(document.createTextNode(NYT.item[i].title));
			entry2.setAttribute('target',"_new");
			entry2.setAttribute('href', NYT.item[i].link);
		//var entry3 = document.createElement('p');
		//entry3.appendChild(document.createTextNode(fixDescription(NYT.item[i].description)));

			listo.appendChild(entry1);
			listo.appendChild(entry2);
		//listo.appendChild(entry3);
		}
		if(Guardian.item[i]!=undefined){
			var entry1 = document.createElement('img');
			if(Guardian.item[i]["media:content"]!=undefined){
				entry1.src = Guardian.item[i]["media:content"]["0"].url;
			}

			var entry2 = document.createElement('a');
			entry2.appendChild(document.createTextNode(Guardian.item[i].title));
			entry2.setAttribute('target',"_new");
			entry2.setAttribute('href', Guardian.item[i].link);

		//var entry3 = document.createElement('p');
		//entry3.appendChild(document.createTextNode(fixDescription(Guardian.item[i].description)));
		
			listo.appendChild(entry1);
			listo.appendChild(entry2);
		//listo.appendChild(entry3);
		}
	}
}
function createCNNTree(){
		var url = "http://rss.cnn.com/rss/cnn_topstories.rss";
		var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'"+url+"'";
	   	$.get(url1, function (data) {
	   		var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
			CNN=items;
		});
	}
	
	function createBBCTree(){
		
		var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Fus_and_canada%2Frss.xml'&diagnostics=true";
	   	$.get(url1, function (data) {
	   		var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
			BBC=items;
		});
	}

	function createNYTree(){
		var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FPolitics.xml'&diagnostics=true";
	   	$.get(url1, function (data) {
	   		var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
			NYT=items;
		});
	}
	function createGuardTree(){
		var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'https%3A%2F%2Fwww.theguardian.com%2Fus-news%2Fus-politics%2Frss'&diagnostics=true";
	   	$.get(url1, function (data) {
	   		var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
			Guardian=items;
		});
	}
function refresh(){
	switch(cycleCount){
		case 0:
			console.log("CNN refreshes here");
			fat = CNN.item[0].link;
			console.log("Cnn first article: ", fat);
			createCNNTree();
			var i=0;
			setTimeout(function(){
				while(CNN.item[i].link!=fat){
					console.log("New Artile Found!");
					var entry1 = document.createElement('img');

					if(CNN.item[i]["media:group"]["media:content"]!=undefined){
						entry1.src = CNN.item[i]["media:group"]["media:content"][0].url;
					}

					var entry2 = document.createElement('a');
					entry2.setAttribute('target',"_new");
					entry2.setAttribute('href', CNN.item[i].link);

					entry2.appendChild(document.createTextNode(CNN.item[i].title));
					/*
					var entry3 = document.createElement('p');
					entry3.appendChild(document.createTextNode(fixDescription(CNN.item[i].description)));
					$("#list").prepend(entry3);
					*/
					$("#list").prepend(entry2);
					$("#list").prepend(entry1);

					i++;
					if(i>=5){
						break;
					}
				}
			},5000);
			break;
		case 1:
			console.log("BBC refreshes here");
			fat = BBC.item[0].link;
			console.log("BBC first article: ", fat);
			createBBCTree();
			var i=0;
			setTimeout(function(){
				while(BBC.item[i].link!=fat){
					console.log("New Artile Found!");
					var entry1 = document.createElement('img');
					if(BBC.item[i]["media:thumbnail"]!=undefined){
						entry1.src = BBC.item[i]["media:thumbnail"].url;
					}

					var entry2 = document.createElement('a');
					entry2.appendChild(document.createTextNode(BBC.item[i].title));
					entry2.setAttribute('target',"_new");
					entry2.setAttribute('href', BBC.item[i].link);
					

					/*var entry3 = document.createElement('p');
					entry3.appendChild(document.createTextNode(fixDescription(BBC.item[i].description)));

					$("#list").prepend(entry3);
					*/
					$("#list").prepend(entry2);
					$("#list").prepend(entry1);
					i++;
					if(i>=5){
						break;
					}
				}
			},5000);
			break;
		case 2:
			console.log("NYT refreshes here");
			fat = NYT.item[0].link;
			console.log("NYT first article: ", fat);
			createNYTree();
			var i=0;
			setTimeout(function(){
				while(NYT.item[i].link!=fat){
					console.log("New Artile Found!");
					var entry1 = document.createElement('img');
					
					if(NYT.item[i]["media:content"]!=undefined){
						entry1.src = NYT.item[i]["media:content"].url;
					}

					var entry2 = document.createElement('a');
					entry2.appendChild(document.createTextNode(NYT.item[i].title));
					entry2.setAttribute('target',"_new");
					entry2.setAttribute('href', NYT.item[i].link);
					
					/*var entry3 = document.createElement('p');
					entry3.appendChild(document.createTextNode(fixDescription(NYT.item[i].description)));

					$("#list").prepend(entry3);
					*/
					$("#list").prepend(entry2);
					$("#list").prepend(entry1);
					i++;
					if(i>=5){
						break;
					}
				}
			},5000);

			break;
		case 3:
			console.log("Guardian refreshes here");
			fat = Guardian.item[0].link;
			console.log("Guardian first article: ", fat);
			createGuardTree();
			var i=0;
			setTimeout(function(){
				while(Guardian.item[i].link!=fat){
					console.log("New Artile Found!");
					var entry1 = document.createElement('img');
					if(Guardian.item[i]["media:content"]!=undefined){
						entry1.src = Guardian.item[i]["media:content"]["0"].url;
					}

					var entry2 = document.createElement('a');
					entry2.appendChild(document.createTextNode(Guardian.item[i].title));
					entry2.setAttribute('target',"_new");
					entry2.setAttribute('href', Guardian.item[i].link);
					

					/*var entry3 = document.createElement('p');
					entry3.appendChild(document.createTextNode(fixDescription(Guardian.item[i].description)));
					$("#list").prepend(entry3);
					*/
					$("#list").prepend(entry2);
					$("#list").prepend(entry1);

					i++;
					if(i>=5){
						break;
					}
				}
			},5000);
			break;
		default:
			alert("An error that should never happen somehow happened please refresh");
			break;
	}
}
/*
function fixDescription(desc){
	var i=0;
	var counter=0;
	var length = desc.length;
	for(i=0;i<desc.length;i++){
		if(desc[i]=='<'){
			while(desc[counter]!='>'){
				counter++;
			}
			break;
		}
		
	}
	if(counter!=0){
		return desc.substring(counter+1,length);
	}else{
		return desc;
	}
}
*/
//Sets the arrays containing all information about the articles for later use
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