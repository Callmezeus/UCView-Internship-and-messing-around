var objMain,windowWidth,windowHeight;
var canvas, stage;
var backColor = '#000000'
var bgImage;
var assets = [];
var images = [];
var manifest = [
	{src:'images/Cnn1.png', id:'logoCNN'},
	{src:'images/loading-png-transparent.png', id:'loadingRot'}
]
var playVideo = 0;
var videoItems = [];
var videoHolder;
var logoHolder,loadingHolder;
var countPlays = 0;
var videoDom1;

function initCNNFeed(feed)
{
	console.log('playNumVids:'+playNumVids);
	objMain = feed;
	loader = new createjs.LoadQueue(true);
	loader.addEventListener('fileload', handleFileLoad);
	loader.addEventListener('complete', handleComplete);
	loader.addEventListener('progress', handleProgress);
	loader.loadManifest(manifest);
}

function handleFileLoad(e){
	if (e.item.type == 'image') { images[e.item.id] = e.result; }
	assets.push(e.item);

}
function handleProgress(e){}
function handleComplete(e)
{
	continueTed(objMain);
}

function continueTed(o)
{
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	console.log('feed:',objMain);

	canvas = document.getElementById('feedContainer');
	//Tomer
	console.log('Canvas Spaghetti:',canvas);
	//Comment
	stage = new createjs.Stage(canvas);

	stage.canvas.height = windowHeight;
	stage.canvas.width = windowWidth;
	//Giving the feed container height and width of available window?
	//is windowHeight / Width = max window size?
	
	var context = canvas.getContext("2d");
	//Make it 2d?
	context.imageSmoothingEnabled = true;
	//Makes image smooth

	var logoHolder = new createjs.Container();
	//Logo Container

	var logoIcon = new createjs.Shape(new createjs.Graphics().beginBitmapFill(images['logoCNN']).drawRect(0,0, 640, 300));
	//logoIcon.scaleX = logoIcon.scaleY = 0.5;
	logoHolder.addChild(logoIcon);
	var sh = windowHeight - windowHeight/5;
	var space = (windowHeight - sh)/2;
	var intendedH = space - space/6;

	loadingHolder = new createjs.Container();
	var loadinIcon = new createjs.Shape(new createjs.Graphics().beginBitmapFill(images['loadingRot']).drawRect(0,0, 200,200));
	loadinIcon.scaleX = loadinIcon.scaleY = 0.2;
	loadingHolder.addChild(loadinIcon);
	loadingHolder.regX = 20;
	loadingHolder.regY = 20;

	loadingHolder.x = windowWidth/2;
	loadingHolder.y = windowHeight/2;

	loadingRotation(false);

	
	logoHolder.scaleX = logoHolder.scaleY = intendedH/300; 
	logoHolder.x = (windowWidth - logoHolder.scaleX*640)/2;
	logoHolder.y = windowHeight - logoHolder.scaleY*300 - space/12;
    //lOGO CODE - Also affects actual output of video
	var bgCont = new createjs.Container();
	if (backColor)
	{
		var shape = new createjs.Shape();
		shape.graphics.beginFill(backColor).drawRect(0,0,windowWidth,windowHeight);
		bgCont.addChild(shape);
		bgCont.alpha = bgAlpha;
		stage.addChild(bgCont);
	}

	videoHolder = new createjs.Container();
	//Create a video contaier element
	videoHolder.shadow = new createjs.Shadow("#000000", 0, 0, 15);
	//Shadow behind video container

	for (var i=0;i<objMain.item.length;i++)
	{
		var newVid = {};
		newVid.url = objMain.item[i].enclosure.url; 
		//Pull the mp4 from rss info feed
		newVid.title = objMain.item[i].title;
		//pulls the title
		newVid.width = 0;//resultat.item[i]['media:content'].width;
		newVid.height = 0; //resultat.item[i]['media:content'].height;
		newVid.type = 'video';//resultat.item[i]['media:content'].type;
		newVid.duration = 'unknown';

		//This loop creates an array of all available videos it can pull from the RSS feed
		//These videos are stored in an array given by the RSS XML

		videoItems.push(newVid);
		//Appends newVid object to array
	}
	videoItems = shuffle(videoItems);
	//Shuffles the array
	console.log('videoItems:',videoItems);
	stage.addChild(logoHolder);
	stage.addChild(videoHolder);	
	stage.addChild(loadingHolder);
	goFurtherVid();

	if (skipNextAd>0)
	{
		window.setTimeout(skipToNext, skipNextAd * 1000);
	}
	window.setInterval(addDuration, 30 * 1000);

}

function xVideosPlayed(numb)
{
	window.external.jsinteract("nextad");
}

function addDuration(numb)
{
	//console.log('called after 30 sec');
	//window.external.jsinteract("add_duration 30");		
}

function skipToNext()
{
	//calling next ad early
	xVideosPlayed(playNumVids);
}

function loadingRotation(set)
{
	if (set)
	{
		loadingHolder.visible = true;
	}else{
		loadingHolder.visible = false;
	}
}

function goFurtherVid()
{
	loadingRotation(true);
	console.log('playing video number: '+playVideo+', url: '+videoItems[playVideo].url);
	loadVideoAndPutTo(videoItems[playVideo].url, videoHolder, videoItems[playVideo].width, videoItems[playVideo].height);
	playVideo = (playVideo+1 >= videoItems.length) ? 0 : playVideo+1;
}

function paused()
{
	if (videoDom1)
	{
		if (videoDom1.paused)
		{
			videoDom1.play();
		}else{
			videoDom1.pause();
		}
	}
}

function loadVideoAndPutTo(url, mc, wid, heig)
{
	//var videoDom = $('<video width="320" height="240" autoplay style="display:none;"><source src="'+url+'" type="video/mp4" ></video>') .appendTo(document.body)[0];

	//var videoDom1 = $('<video class="js-video" id="playingVideo" preload="auto" autoplay style="display:none;"><source src="'+url+'" type="video/mp4"></video>').appendTo(document.body)[0];
	videoDom1 = $('<video class="js-video" id="playingVideo" preload="auto" style="display:none;" ><source src="'+url+'" type="video/mp4"></video>')[0];//.appendTo(document.body)[0];
	$(document.body).append(videoDom1);
	//$('.js-video').get(0).volume = 0;
	//$('.js-video').prop("volume", 0);
	//$('.js-video').volume = 0;
	//videoDom1.volume = 0;
	//videoDom1.muted = true;
	videoDom1.play();
	console.log('videosssssssssssss:',videoDom1.volume);
	console.log('Length',videoDom1.duration);
	console.log('???');
	//videoDom1 is the current video that is playing...
	//player.js has many methods to manipulate time and structure of the current video
					
	var sw = windowWidth - windowWidth/5;
	var sh = windowHeight - windowHeight/5;	
	var imgRatio = sw/sh;
	//Makes the video the size of 1/5 of the total given window space

	var vw;
	var vh;
	var rat = wid/heig;
	if (rat >= imgRatio)
	{
		vw = sw;
		vh = vw/rat;			  
	}
	else 
	{
		vh = sh;
		vw = vh * rat;
	}	

	vh = sh;
	vw = sw;

	var bitmap;
	var videoFirstPlay = true;

	stage.update();

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener('tick', tick);

	$(function() {
   		 $("video").each(function(){ this.volume = 0; });
	});

	$(function () {

		$(".js-video").bind("ended", function ()
		{
			console.log('video stopped');
			bitmap = new createjs.Bitmap();
			videoHolder.removeAllChildren();
			videoDom1.src = "";
			videoDom1.load();			
			$( ".js-video" ).remove();
			videoIsStopped();

		});

		$(".js-video").bind("playing", function ()
		{
			loadingRotation(false);
			if (videoFirstPlay)
			{
				
				if (muteVideo == 'true')
				{
					console.log('trying to mute');
					//$('.js-video').get(0).volume = 0;
					//$('.js-video').prop("volume", 0);
					//var vid = document.getElementById("playingVideo");
					//vid.volume = 0;
					videoDom1.volume = 0;

				}else{
					videoDom1.volume = setVolume;
					//$('.js-video').get(0).volume = setVolume;
					//$('.js-video').prop("volume", setVolume);
				}
				videoFirstPlay = false;
			}
			console.log('started playing',videoDom1.volume);
		});

		$(".js-video").bind("stalled", function ()
		{
			loadingRotation(true);
		});

		$(".js-video").bind("canplay", function ()
		{
			loadingRotation(false);
		});

	    $(".js-video").bind("loadedmetadata", function () {
	    	bitmap = new createjs.Bitmap($('.js-video')[0]);
	    	//bitmap = new createjs.Bitmap(images['logoTED']);
	    	//console.log('bitmap:',bitmap);
	    	
	        var width = this.videoWidth;
	        var height = this.videoHeight;
	        //bitmap.width = width;
	       // bitmap.height = height;

	        videoHolder.addChild(bitmap);

	        var det = {};
	        det.width = width;
	        det.height = height;
	        det.vwidth = vw;
	        det.vheight = vh;

	        var imgRat = width/height;
			var vw1;
			var vh2;
			var ratt = vw/vh;
			if (imgRat >= ratt)
			{
				vw1 = vw;
				vh1 = vw/imgRat;			  
			}
			else 
			{
				vh1 = vh;
				vw1= vh * imgRat;
			}
			//videoHolder.addChild(bitmap);
			videoHolder.scaleX = vw1/width;
			videoHolder.scaleY = vh1/height;
			console.log(vw1+' '+vw+' '+vh1+' '+vh)
			//console.log('scale:'+width*videoHolder.scaleX+', '+videoHolder*bitmap.scaleY);
			//console.log('sw:'+windowWidth+', sh:'+windowHeight)
			det.fwidth = vw1;
			det.fheight = vh1;
			videoHolder.x = Math.abs((windowWidth - width*videoHolder.scaleX)/2);
			videoHolder.y = Math.abs((windowHeight - height*videoHolder.scaleY)/2);
			//console.log('videoHolder.x:'+videoHolder.x+', y:'+videoHolder.y);
	        // ...
	        //console.log('width:'+bitmap.width+', height:'+bitmap.height);	        
	        //console.log('width:'+bitmap.width+', height:'+bitmap.height);
	    });

	});
}

function videoIsStopped()
{
	countPlays++;
	currentVideo = null;
	if (countPlays==playNumVids)
	{
		countPlays=0;
		console.log(' calling function after '+playNumVids+' videos.');
		//xVideosPlayed(playNumVids);
	}
	goFurtherVid();
	console.log('going to next video');
}
/*
$(function () {

    $(".js-video").bind("loadedmetadata", function () {
        var width = this.videoWidth;
        var height = this.videoHeight;
        // ...
        console.log('width:'+width+', height:'+height);

    });

});*/

function tick()
{
	loadingHolder.rotation+=15;
	stage.update();
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}