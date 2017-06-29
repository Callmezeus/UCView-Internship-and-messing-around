var responseFeed;
var allTitles=[];
var allAuthors=[];
var allDescriptions=[];
var allUrls=[];
var allImages=[];
var allDates=[];
var cycleCount=0;

window.addEventListener('load',function(){
		window.params =
		{
		    interval: 1,

		};
		//Pull the HTML elements and sets them into JS objects
		title = document.getElementById('headline');
		description = document.getElementById('desc');
		author=document.getElementById('author');
		image = document.getElementById('picture');
		time = document.getElementById('footerTime');
		fDate = document.getElementById('footerDate');
		artDate = document.getElementById('art-date');
		//obj will contain all variables passed through url
		obj = getUrlVars();
		interval=obj.interval;
		if(!checkParams()){
			//Error Case : can set interval min to be whatever
			alert("Interval must be greater than or equal to 5! Format: .../index.html?interval=10");
			return;
		}
		startApp();
		
	}, false);

function checkParams(){

	if(obj.interval<5 || obj.interval==undefined || isNaN(obj.interval)){
		return false;
	}else{
		return true;
	}
}
function startApp(){
	function reqListener () {
	  responseFeed=oReq.response;
	  setup();
	  title.innerHTML=allTitles[cycleCount];
	  description.innerHTML=allDescriptions[cycleCount];
	  //author.innerHTML=allAuthors[0]; Author not used in this app
	  document.getElementById('link').href = allUrls[cycleCount];
	  image.src=allImages[cycleCount];
	  //set time/date
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
	  time.innerHTML=displayHour+":"+min;
	  fDate.innerHTML=month+"."+day+'.'+year;
	  artDate.innerHTML=allDates[cycleCount];
	  //Completed one cycle
	  cycleCount++;
	  if(cycleCount>=allTitles.length){
		//occurs at last article
		cycleCount=0;
	  }
	}
	//pulls feed and translates to JS objects
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.responseType="json";
	oReq.open("GET", "https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=9a9c9037fecf4bcb9e49ffa581f8713b");
	oReq.send();
	//Runs a cycle
	var timer=setInterval(function(){
	  	reqListener();
	  },interval*1000);
	//After 20 minutes refresh feed, pulling new articles if any and restarts the cycle
	setTimeout(function(){
		window.clearInterval(timer);
		cycleCount=0;
		startApp();
	},1200000);
}
//get Interval / any other inputted variables from URL given
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
//Sets the arrays containing all information about the articles for later use
function setup(){
	setTitles();
	setAuthors();
	setDescriptions();
	setUrls();
	setImages();
	setDates();
}
function setDates(){
	for(var i=0;i<responseFeed.articles.length;i++){
		allDates[i]=fixDate(responseFeed.articles[i].publishedAt);
	}
}
function fixDate(feed){
	return (feed.substring(5,7)+"."+feed.substring(8,10)+"."+feed.substring(0,4));
}

function setTitles(){
	for(var i=0;i<responseFeed.articles.length;i++){
		allTitles[i]=responseFeed.articles[i].title;
	}
}
function setAuthors(){
	for(var i=0;i<responseFeed.articles.length;i++){
		allAuthors[i]=responseFeed.articles[i].author;
	}
}
function setDescriptions(){
	for(var i=0;i<responseFeed.articles.length;i++){
		allDescriptions[i]=responseFeed.articles[i].description;
	}
}
function setUrls(){
	for(var i=0;i<responseFeed.articles.length;i++){
		allUrls[i]=responseFeed.articles[i].url;
	}
}
function setImages(){
	for(var i=0;i<responseFeed.articles.length;i++){
		allImages[i]=responseFeed.articles[i].urlToImage;
	}
}


