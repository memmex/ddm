/*
 * Put <script src="cindyEasings.js" data-scriptid="YOURINITSCRIPTID"></script> before your createCindy.
 */
(function(){
	var code = document.createTextNode(`
cubicBezier(t, P1, P2) := 3*(1-t)^2*t*P1 + 3*(1-t)*t^2*P2 + t^3*[1,1];

getCubicBezierYFromX(x, P1, P2) := (
	// binary search for x...
	regional(tolerance, l, u, P, t);
	tolerance = 0.001;
	
	l = 0; u = 1; t = 0.5;

	if(0 < x & x <= 1,

		P = cubicBezier(t, P1, P2);

		while(|x - P_1| > tolerance,
			if(x > P_1, l = t, u = t);
			t = (l+u) / 2;
			P = cubicBezier(t, P1, P2);
		);
	, // else
		if (x <= 0,
			P = [0, 0];
		, // else
			P = [1, 1];
		);
	);
	P_2
);
getCubicBezierYFromX(x, x1, y1, x2, y2) := getCubicBezierYFromX(x, [x1, y1], [x2, y2]);

// These timing function take 
//	a value t between 0 and 1 (representing the percentage of time passed in the animation)
// and return
//	a value between 0 and 1 (representing the percentage of progression/output)
//
// You can use negative t values if you wish to delay the animation. Values above 1 get clamped to 1.
//
// In the tick script, you would calculate the t via something like this:
//	t = (seconds() - startTime) / animationDuration;
//
// use the value that the timing function like this:
// 	animatedXY = startXY + timingFunctionResult * (endXY - startXY)
//
// and stop the animation once t reaches 1.
//
//

// CSS-Standard
ANItimingLinear(t) := max(0, min(1, t));
ANItimingEase(t):= getCubicBezierYFromX(t, [0.25, 0.1], [0.25, 1.0]);
ANItimingEaseIn(t):= getCubicBezierYFromX(t, [0.42, 0], [1, 1]);
ANItimingEaseInOut(t):= getCubicBezierYFromX(t, [0.42, 0], [0.58, 1]);
ANItimingEaseOut(t):= getCubicBezierYFromX(t, [0, 0], [0.58, 1]);

// www.easings.net
ANItimingEaseInSine(t):= getCubicBezierYFromX(t, 0.47, 0, 0.745, 0.715);
ANItimingEaseOut(t):= getCubicBezierYFromX(t, 0.39, 0.575, 0.565, 1);
ANItimingInOutSine(t):= getCubicBezierYFromX(t, 0.445, 0.05, 0.55, 0.95);

ANItimingEaseInQuad(t):= getCubicBezierYFromX(t, 0.55, 0.085, 0.68, 0.53);
ANItimingEaseOutQuad(t):= getCubicBezierYFromX(t, 0.25, 0.46, 0.45, 0.94);
ANItimingEaseInOutQuad(t):= getCubicBezierYFromX(t, 0.455, 0.03, 0.515, 0.955);

ANItimingEaseInCubic(t):= getCubicBezierYFromX(t, 0.55, 0.055, 0.675, 0.19);
ANItimingEaseOutCubic(t):= getCubicBezierYFromX(t, 0.215, 0.61, 0.355, 1);
ANItimingEaseInOutCubic(t):= getCubicBezierYFromX(t, 0.645, 0.045, 0.355, 1);

ANItimingEaseInQuart(t):= getCubicBezierYFromX(t, 0.895, 0.03, 0.685, 0.22);
ANItimingEaseOutQuart(t):= getCubicBezierYFromX(t, 0.165, 0.84, 0.44, 1);
ANItimingEaseInOutQuart(t):= getCubicBezierYFromX(t, 0.77, 0, 0.175, 1);

ANItimingEaseInQuint(t):= getCubicBezierYFromX(t, 0.755, 0.05, 0.855, 0.06);
ANItimingEaseOutQuint(t):= getCubicBezierYFromX(t, 0.23, 1, 0.32, 1);
ANItimingEaseInOutQuint(t):= getCubicBezierYFromX(t, 0.86, 0, 0.07, 1);

ANItimingEaseInExpo(t):= getCubicBezierYFromX(t, 0.95, 0.05, 0.795, 0.035);
ANItimingEaseOutExpo(t):= getCubicBezierYFromX(t, 0.19, 1, 0.22, 1);
ANItimingEaseInOutExpo(t):= getCubicBezierYFromX(t, 1, 0, 0, 1);

ANItimingEaseInCirc(t):= getCubicBezierYFromX(t, 0.6, 0.04, 0.98, 0.335);
ANItimingEaseOutCirc(t):= getCubicBezierYFromX(t, 0.075, 0.82, 0.165, 1);
ANItimingEaseInOutCirc(t):= getCubicBezierYFromX(t, 0.785, 0.135, 0.15, 0.86);

ANItimingEaseInBack(t):= getCubicBezierYFromX(t, 0.6, -0.28, 0.735, 0.045);
ANItimingEaseOutBack(t):= getCubicBezierYFromX(t, 0.175, 0.885, 0.32, 1.275);
ANItimingEaseInOutBack(t):= getCubicBezierYFromX(t, 0.68, -0.55, 0.265, 1.55);

//define your own via http://cubic-bezier.com

`);

	var scriptId, scriptElement;

	if (document.currentScript) {
		scriptId = document.currentScript.dataset.scriptid;
	}		
	if (!scriptId) scriptId = 'csinit';
	
	scriptElement = document.getElementById(scriptId);
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
