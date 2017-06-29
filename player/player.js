window.addEventListener('load',function(){
	//Video Container
	video =document.getElementById('video');
	playButton = document.getElementById('play-button');
	pbar = document.getElementById('pbar');
	pbarContainer=document.getElementById('pbar-container');
	timeField = document.getElementById('time-field');
	soundButton = document.getElementById('sound-button');
	sbarContainer = document.getElementById('sbar-container');
	sbar = document.getElementById('sbar');
	fullscreenButton = document.getElementById('fullscreen-button');

	timeField.innerHTML = getFormattedTime() + ' / ' + duration();
	
	video.load();
	video.addEventListener('canplay',function(){
		video.addEventListener('click',playOrPause,false);
		
		playButton.addEventListener('click',playOrPause,false);
		pbarContainer.addEventListener('click',skip,false);
		updatePlayer();
		soundButton.addEventListener('click',muteOrUnmute,false);
		sbarContainer.addEventListener('click',changeVolume,false);
		fullscreenButton.addEventListener('click',fullscreen,false);
	}, false);
	

},false);
// Functionality for play/pause button
function playOrPause(){
	if(video.paused){
		video.play();
		playButton.src='images/pause.png';
		update=setInterval(updatePlayer,30);
	}else{
		video.pause();
		playButton.src='images/play.png';
		window.clearInterval(update);
	}
}
//Updates the player time values
function updatePlayer(){
	var percentage= (video.currentTime/video.duration)*100;
	pbar.style.width=percentage + '%';
	timeField.innerHTML = getFormattedTime() + ' / ' + duration();
	if(video.ended){
		window.clearInterval(update);
		playButton.src='images/replay.png'
	}
}
//Function to determine format visual output of video length
function duration(){
	var seconds = Math.round(video.duration);
	var minutes = Math.floor(seconds/60);
	seconds -= minutes*60;
	if(seconds.toString().length==1){
		seconds = '0' +seconds;
	}
	return minutes + ':' + seconds;
}
//Clicking on progress bar
function skip(ev){
	var mouseX = ev.pageX-pbarContainer.offsetLeft;
	var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
	width=parseFloat(width.substr(0,width.length -2));

	video.currentTime=(mouseX/width)*video.duration;
	updatePlayer();
}
// Updates the current elapsed time whenever skipped / actual video plays
function getFormattedTime(){
	var seconds = Math.round(video.currentTime);
	var minutes = Math.floor(seconds/60);
	if(minutes>0){
		seconds-=minutes*60;
	}
	if(seconds.toString().length==1){
		seconds = '0' + seconds;
	}
	return minutes + ':' + seconds;
}
function muteOrUnmute(){
	if(!video.muted){
		video.muted=true;
		soundButton.src="images/mute.png"
		sbar.style.display = 'none';

	}else{
		video.muted=false;
		soundButton.src ="images/sound.png"
		sbar.style.display = 'block';
		
	}
}
function changeVolume(ev){
	var mouseX = ev.pageX-sbarContainer.offsetLeft;
	var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0,width.length-2));

	video.volume = (mouseX/width);
	sbar.style.width=(mouseX/width)*100 + '%';
	video.muted=false;
	soundButton.src ="images/sound.png"
	sbar.style.display = 'block';

}
function fullscreen(){
	if(video.requestFullscreen){
		video.requestFullscreen();
	}else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	}else if(video.msRequestFullscreen){
		video.msRequestFullscreen();
	}else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}