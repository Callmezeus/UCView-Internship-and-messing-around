var pm =false;
var fucker="";
window.addEventListener('load',function(){
	htmlHour=document.getElementById('hour');
	htmlMinutes=document.getElementById('minutes');
	preface=document.getElementById('preface');
	epiface=document.getElementById('epiface');
	startApp();
})
function startApp(){
	var d = new Date();
	var hour=d.getHours();
	var displayHour = hour;
	var min =d.getMinutes();
	if(hour>12){
		displayHour = hour-12;
		pm=true;
	}else{
		pm=false;
	}
	var day = d.getDate();
	var month = d.getMonth() +1;
	var year = d.getFullYear();

	displayHour = hourToText(displayHour);
	min = minutesToText(min);
	
	preface.innerHTML=RNG();
	htmlHour.innerHTML=displayHour;
	htmlMinutes.innerHTML=min;
	if(pm){
		fucker="IN THE AFTERNOON ";
			if(displayHour>=7){
				fucker="IN THE EVENING ";
			}
	}else{
		fucker="IN THE MORNIN ";
	}
	epiface.innerHTML=fucker + RNG2()+ RNG3() +RNG4();
	setInterval(function(){
		refreshTime();
	},300)
}
function refreshTime(){
	var d = new Date();
	var hour=d.getHours();
	var displayHour = hour;
	var min =d.getMinutes();
	if(hour>12){
		displayHour = hour-12;
		pm=true;
	}else{
		pm=false;
	}
	var day = d.getDate();
	var month = d.getMonth() +1;
	var year = d.getFullYear();

	displayHour = hourToText(displayHour);
	min = minutesToText(min);
	
	
	htmlHour.innerHTML=displayHour;
	htmlMinutes.innerHTML=min;
	
}
function RNG(){
	var gaben=Math.floor((Math.random() * 12) + 1);
	switch(gaben){
		case 1:
			return "I'D FUCKING SAY IT'S";
		case 2:
			return "WELL TARNATION FLUMMERY IT'S";
		case 3:
			return "GEE GOLLY IT'S";
		case 4:
			return "NO FUCKING WAY IT'S";
		case 5:
			return "HOW THE FUCK IS IT";
		case 6:
			return "OBSCURE HALF LIFE 3 REFERENCE IT'S";
		case 7:
			return "OMAE WA MOU SHINDEIRU IT'S";
		case 8:
			return "IN SOME FUCKED UP WORLD IT'S";
		case 9:
			return "AAAAAAAAAAAAAAAAH IT'S";
		case 10:
			return "WHAT, WERE YOU EXPECTING SOMETHING ELSE? IT'S";
		case 11:
			return "SNAP CRACKLE POP IT'S";
		case 12:
			return "CRINGEY SHITTY ONE LINER IT'S"
	}
}
function RNG2(){
	var plz=Math.floor((Math.random()*19) + 1);
	switch(plz){
		case 1:
			return "YOU LAZY";
		case 2:
			return "YOU STUPID";
		case 3:
			return "YOU INSECURE";
		case 4:
			return "YOU IDIOTIC";
		case 5:
			return "YOU SLIMY";
		case 6:
			return "YOU SLUTTY";
		case 7:
			return "YOU SMELLY";
		case 8:
			return "YOU POMPOUS";
		case 9:
			return "YOU COMMUNIST";
		case 10:
			return "YOU DICKNOSE";
		case 11:
			return "YOU PIE-EATING";
		case 12:
			return "YOU RACIST";
		case 13:
			return "YOU ELITIST";
		case 14:
			return "YOU WHITE TRASH";
		case 15:
			return "YOU DRUG-LOVING";
		case 16:
			return "YOU BUTTERFACE";
		case 17:
			return "YOU TONE DEAF";
		case 18:
			return "YOU UGLY";
		case 19:
			return "YOU CREEPY";
		default:
			return "YOU";
		
	}
}
function RNG3(){
	var my=Math.floor((Math.random()*19) + 1);
	switch(my){
		case 1:
			return " DOUCHE ";
		case 2:
			return " ASS ";
		case 3:
			return " TURD ";
		case 4:
			return " RECTUM ";
		case 5:
			return " BUTT ";
		case 6:
			return " COCK ";
		case 7:
			return " SHIT ";
		case 8:
			return " SHIT ";
		case 9:
			return " CROTCH ";
		case 10:
			return " BITCH ";
		case 11:
			return " FUCKING ";
		case 12:
			return " PRICK ";
		case 13:
			return " SLUT ";
		case 14:
			return " TAINT ";
		case 15:
			return " FUCK ";
		case 16:
			return " DICK ";
		case 17:
			return " BONER ";
		case 18:
			return " SHART ";
		case 19:
			return " NUT ";
		default:
			return " FUCKING ";
	}
}
function RNG4(){
	var money=Math.floor((Math.random()*19) + 1);
	switch(money){
		case 1:
			return "PILOT";
		case 2:
			return "CANOE";
		case 3:
			return "CAPTAIN";
		case 4:
			return "PIRATE";
		case 5:
			return "HAMMER";
		case 6:
			return "KNOB";
		case 7:
			return "BOX";
		case 8:
			return "JOCKEY";
		case 9:
			return "NAZI";
		case 10:
			return "WAFFLE";
		case 11:
			return "GOBLIN";
		case 12:
			return "BLOSSUM";
		case 13:
			return "BISCUIT";
		case 14:
			return "CLOWN";
		case 15:
			return "SOCKET";
		case 16:
			return "MONSTER";
		case 17:
			return "HOUND";
		case 18:
			return "DRAGON";
		case 19:
			return "BALLOON";
		default:
			return "FUCK";
	}
}
function minutesToText(min){
	switch(min){
		case 0:
				return "O' CLOCK";
		case 1:
				return "O' ONE";
		case 2:
				return "O' TWO";
		case 3:
				return "O' THREE";
		case 4:
				return "O' FOUR";
		case 5:
				return "O' FIVE";
		case 6:
				return "O' SIX";
		case 7:
				return "O' SEVEN";
		case 8:
				return "O' EIGHT";
		case 9:
				return "O' NINE";
		case 10:
				return "TEN";
		case 11:
				return "ELEVEN";
		case 12:
				return "TWELVE";
		case 13:
				return "THIRTEEN";
		case 14:
				return "FOURTEEN";
		case 15:
				return "FIFTEEN";
		case 16:
				return "SIXTEEN";
		case 17:
				return "SEVENTEEN";
		case 18:
				return "EIGHTEEN";
		case 19:
				return "NINETEEN";
		case 20:
				return "TWENTY";
		case 21:
				return "TWENTY ONE";
		case 22:
				return "TWENTY TWO";
		case 23:
				return "TWENTY THREE";
		case 24:
				return "TWENTY FOUR";
		case 25:
				return "TWENTY FIVE";
		case 26:
				return "TWENTY SIX";
		case 27:
				return "TWENTY SEVEN";
		case 28:
				return "TWENTY EIGHT";
		case 29:
				return "TWENTY NINE";
		case 30:
				return "THIRTY";
		case 31:
				return "THIRTY ONE"
		case 32:
				return "THIRTY TWO";
		case 33:
				return "THIRTY THREE";
		case 34:
				return "THIRTY FOUR";
		case 35:
				return "THIRTY FIVE";
		case 36:
				return "THIRTY SIX";
		case 37:
				return "THIRTY SEVEN";
		case 38:
				return "THIRTY EIGHT";
		case 39:
				return "THIRTY NINE";
		case 40:
				return "FORTY";
		case 41:
				return "FORTY ONE"
		case 42:
				return "FORTY TWO";
		case 43:
				return "FORTY THREE";
		case 44:
				return "FORTY FOUR";
		case 45:
				return "FORTY FIVE";
		case 46:
				return "FORTY SIX";
		case 47:
				return "FORTY SEVEN";
		case 48:
				return "FORTY EIGHT";
		case 49:
				return "FORTY NINE";
		case 50:
				return "FIFTY";
		case 51:
				return "FIFTY ONE"
		case 52:
				return "FIFTY TWO";
		case 53:
				return "FIFTY THREE";
		case 54:
				return "FIFTY FOUR";
		case 55:
				return "FIFTY FIVE";
		case 56:
				return "FIFTY SIX";
		case 57:
				return "FIFTY SEVEN";
		case 58:
				return "FIFTY EIGHT";
		case 59:
				return "FIFTY NINE";
	}
}
function hourToText(hour){
	switch(hour){
		case 1:
				return "ONE";
		case 2:
				return "TWO";
		case 3:
				return "THREE";
		case 4:
				return "FOUR";
		case 5:
				return "FIVE";
		case 6:
				return "SIX";
		case 7:
				return "SEVEN";
		case 8:
				return "EIGHT";
		case 9:
				return "NINE";
		case 10:
				return "TEN";
		case 11:
				return "ELEVEN";
		case 12:
				return "TWELVE";															
	}
}