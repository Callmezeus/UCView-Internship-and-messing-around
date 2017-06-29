var day1= {};
var day2= {};
var day3= {};
var day4= {};
var day5= {};
var day6= {};
var day7= {};
var day8= {};
var day9= {};
var day10= {};
var holder= [];
var descriptions= [];
var responseFeed;
//This is the ugliest thing i've ever coded
window.addEventListener('load',function(){
	window.params =
	{
		//Parameters available to give in url bar
	    state: '',
	    city: '',
	    zip: '',
	};
	startApp();
	parseUrl();
	if(!checkParams()){
		alert("Please input a city/state Format:.../index.html?city=fair lawn&state=nj OR a valid zip code");
		return;
	}
	//Some Jquery / html stuff you can (and should) delete
	$(".container").width(window.innerWidth/7);
	$(".container").height(window.innerHeight/4);
	icon = document.getElementById("icon");
	icon.width=window.innerWidth/1;
	icon.height=window.innerHeight/2.5;
	//till here

	var day1desc = document.getElementById('day1desc');
	var day2desc = document.getElementById('day2desc');
	var day3desc = document.getElementById('day3desc');
	var day4desc = document.getElementById('day4desc');
	var day5desc = document.getElementById('day5desc');
	var day6desc = document.getElementById('day6desc');
	var day7desc = document.getElementById('day7desc');
	var day8desc = document.getElementById('day8desc');
	var day9desc = document.getElementById('day9desc');
	var day10desc = document.getElementById('day10desc');


}, false);
//funtion used to check the parameters given in the url bar...
function checkParams(){
	var par = window.params;
	//Zip will take priority; anything else that's entered will be ignored
	if(par.zip==null||par.zip==undefined||par.zip==""){
		//if there is no zip, state takes priority, can work without city 
		if(par.state==null||par.state==undefined||par.state==""){
			//if all else is invalid, city will be checked
			//Doesn't require state to be inputted, unless there are towns with same name
			if(par.city==null||par.city==undefined||par.city==""){
				//error: nothing inputted
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}	
	}else{
		return true;
	}
}
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
function startApp(){
	var obj = getUrlVars();
	var params = obj;
	var city = params.city;
	var state= params.state;
	var zip = params.zip;
	//This is where zip will take priority; if there is a zip, other inputs are ignored
	if(zip==null||zip==""||zip==undefined){	
		var url1="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+city+"%2C%20"+state+"%22)&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	}else{
		var url1="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+zip+"%22)&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	}
	$.get(url1, function(data) {
		//Anything logged is data stuff for clarity; feel free to remove any;
	   	console.log("data:",data);
	   	var items = XML2jsobj(data.getElementsByTagName('channel')[0]);
	   	console.log("items: ",items);
	   	//Response feed contains data for 10 days of weather
	   	responseFeed = items.item["yweather:forecast"];
	   	if(responseFeed==undefined||responseFeed==null||responseFeed==""){
	   		alert("invalid zip/city/state, please try again");
	   		return;
	   	}
	   	superUgly(responseFeed);
	   	makeDescriptions(responseFeed);
	   	//Try not to look at this ugly stuff, more HTML stuff that can be changed
	   	//After better html/css is substituded 
	   	day1desc.innerHTML = descriptions[0];
	   	day2desc.innerHTML = descriptions[1];
	   	day3desc.innerHTML = descriptions[2];
	   	day4desc.innerHTML = descriptions[3];
	   	day5desc.innerHTML = descriptions[4];
	   	day6desc.innerHTML = descriptions[5];
	   	day7desc.innerHTML = descriptions[6];
	   	day8desc.innerHTML = descriptions[7];
	   	day9desc.innerHTML = descriptions[8];
	   	day10desc.innerHTML = descriptions[9];
	   	//This log will tell you where the weather is being taken from: state/city
	   	console.log("This is " + items.description);
	   	//Current weather; updated every hour? Yahoo API is a bit slow
	   	console.log("The current weather: ",items.item["yweather:condition"]);


	});
}
function makeDescriptions(feed){
	//This function was just for testing, can be removed; not that important
	for(var i=0;i<holder.length;i++){
		descriptions[i]=feed[i].date + "-" + feed[i].day
		+" will have a high of: " + feed[i].high
		+" and a low of: "+ feed[i].low + " you can expect: "
		+feed[i].text;
	}
}
function superUgly(feed){
	//Super ugly way to populate objects
	day1 = feed[0];
	day2 = feed[1];
	day3 = feed[2];
	day4 = feed[3];
	day5 = feed[4];
	day6 = feed[5];
	day7 = feed[6];
	day8 = feed[7];
	day9 = feed[8];
	day10 = feed[9];
	holder =[day1,day2,day3,day4,day5,day6,day7,day8,day9,day10];
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