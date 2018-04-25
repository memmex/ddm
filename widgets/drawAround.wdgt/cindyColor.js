/*
 * Put <script src="cindyColor.js" data-scriptid="YOURINITSCRIPTID"></script> before your createCindy.
 */
(function(){
	var code = document.createTextNode(`
iBruLeColors = [
	[(82,136,188)/255, (48,110,171)/255, (12,90,166)/255, (9,69,128)/255, (5,54,100)/255], //blue
	[(255,185,99)/255, (255,166,57)/255, (255,140,0)/255, (197,108,0)/255, (155,85,0)/255], //orange
	[(179,109,212)/255, (158, 62,204)/255, (145, 19,204)/255, (123, 5,178)/255, (95, 3,138)/255], //violett
	[(90,177,171)/255, (24,156,146)/255, (0,128,119)/255, (0, 95, 88)/255, (0, 60, 56)/255], // torquoise
	[(255,242,153)/255, (255,237,114)/255, (245,224, 80)/255, (221,198, 44)/255, (170,151, 22)/255], // minion
	[(186,104, 43)/255, (152, 74, 16)/255, (117, 50, 0)/255, (80, 34, 0)/255, (42, 18, 0)/255], // brown
	[(255,246,255)/255, (253,181,253)/255, (248,131,248)/255, (240, 90,240)/255, (225, 52,225)/255], //magenta
	[(131,222,92)/255, (99,204,53)/255, (67,186,16)/255, (48,150,5)/255, (34,116,0)/255], //green
	[(253,105,109)/255, (236,62,66)/255, (215,19,24)/255, (173,6,10)/255, (133,0,3)/255], //red
	[(224, 224, 224)/255, (172, 172, 172)/255, (128, 128, 128)/255, (78, 78, 78)/255, (36, 35, 35)/255] //grey
];

iBruLeColor(name) := iBruLeColor(name, 0);

iBruLeColor(name, brightness) := (
	if (!isinteger(brightness) % brightness < -2 % brightness > 2, brightness = 0);
	brightness = -brightness + 3;

	if (contains(["blue", "blau"], name), name = 1);
	if (contains(["orange"], name), name = 2);
	if (contains(["violet", "violett", "lila"], name), name = 3);
	if (contains(["torquoise", "torquois", "türkis"], name), name = 4);
	if (contains(["minion", "yellow", "gelb"], name), name = 5);
	if (contains(["brown", "braun"], name), name = 6);
	if (contains(["magenta", "telekom"], name), name = 7);
	
	if (contains(["green", "grün"], name), name = 8);
	if (contains(["red", "rot"], name), name = 9);
	if (contains(["grey", "gray", "grau"], name), name = 10);
	
	if (contains(["black", "schwarz"], name), name = 10; brightness = 5);

	if (!isinteger(name) % name < 1 % name > 10, name = 1);

	iBruLeColors_name_brightness
);

iBruLeRandomColor() := iBruLeRandomColor(7, 0);
iBruLeRandomColor(max) := iBruLeRandomColor(max, 0);
iBruLeRandomColor(max, brightness) := (
	if(!isinteger(max) % max < 1 % max > 10,
		max = 7
	);
	if (!isinteger(brightness) % brightness < -2 % brightness > 2, brightness = 0);
	
	brightness = -brightness + 3;
	iBruLeColors_(randomint(max) + 1)_brightness;
);

`);


	var scriptId = document.currentScript.dataset.scriptid;
	if (!scriptId) scriptId = 'csinit';
	
	var scriptElement = document.getElementById(scriptId);
	if (!scriptElement) {
		scriptElement = document.createElement("script");
		scriptElement.id = scriptId;
		scriptElement.type = "text/x-cindyscript";
		document.head.appendChild(scriptElement);
	}
	if (scriptElement.firstChild) {
		scriptElement.insertBefore(code, scriptElement.firstChild);
	} else {
		scriptElement.appendChild(code);
	}
	
})();
