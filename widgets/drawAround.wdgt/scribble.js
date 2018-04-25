;var Scribble = { _addOpener: function() { var el = document.createElement('div'); el.id = "scribbleOpener"; el.style.position = "fixed"; el.style.width = "44px"; el.style.paddingRight = "5px"; el.style.height = "44px"; el.style.left = 0; el.style.bottom = 0; el.style.zIndex = 100; el.style.WebkitTapHighlightColor = "transparent"; var i = document.createElement('i'); i.style.display = "block"; i.style.position = "absolute"; i.style.left = "11px"; i.style.top = "11px"; i.style.paddingTop = "2px"; i.style.lineHeight = "18px"; i.style.width = "20px"; i.style.height = "18px"; i.style.textAlign = "center"; i.style.color = "#232323"; i.style.transform = "scale(-1, 1)"; i.style.fontStyle = "normal"; i.style.fontSize = "24px"; i.style.fontFamily = "Palatino"; i.innerHTML = "✎"; el.appendChild(i); document.body.appendChild(el); Scribble.opener = el; Scribble.openerContent = i; }, _addCanvas: function(){ Scribble.canvas = document.createElement('canvas'); Scribble.canvas.id = "scribbleCanvas"; Scribble.canvas.style.position = "absolute"; Scribble.canvas.style.top = 0; Scribble.canvas.style.left = 0; Scribble.canvas.style.background = "transparent"; Scribble.canvas.style.opacity = 0.5; Scribble.canvas.style.pointerEvents = "none"; Scribble.canvas.style.transition = "opacity 400ms linear"; document.body.appendChild(Scribble.canvas); }, autoLoad: function(){ var cscr = document.currentScript; var passOn; if (!!cscr) { passOn = cscr.dataset.passOnCindy; } Scribble.init(); if (!!passOn) { passOn = document.getElementById(passOn); if (!!passOn) { Scribble.initPassOn(passOn); } } }, clear: function() { Scribble.Cindy.evokeCS("clear()"); }, init: function(){ Scribble._addCanvas(); Scribble._addOpener(); Scribble.Cindy = createCindy({ ports:[{element: Scribble.canvas, fill: "window"}], scripts: {init: ' roundedrectangle(tl, w, h, r):= roundedrectangle(tl, tl + [w,-h], r); roundedrectangle(tl, br, r):=( regional(tr, bl, step, mult); tr = [br.x, tl.y]; bl = [tl.x, br.y]; r = min([r, |tl.x-br.x|/2, |tl.y-br.y|/2]); step = min([4, round(4 * pi * r)]); mult = 90/step; polygon( apply(0..step, r * [sin(# * mult°), cos(# * mult°)] + tr + [-r, -r]) ++ [tr.xy + [0, -r], br.xy + [0, r]] ++ apply(step..(2 * step), r * [sin(# * mult°), cos(# * mult°)] + br + [-r, r]) ++ [br.xy + [-r, 0], bl.xy + [r, 0]] ++ apply((2 * step)..(3 * step), r * [sin(# * mult°), cos(# * mult°)] + bl + [r, r]) ++ [bl.xy + [0, r], tl.xy + [0, -r]] ++ apply((3 * step)..(4 * step), r * [sin(# * mult°), cos(# * mult°)] + tl + [r, -r]) ); ); indexOf(haystack, needle) := ( regional(i, r, n); r = 0; i = 1; n = length(haystack); while(i <= n, if(needle == haystack_i, r = i; i = n + 1, i = i+1; ); ); r ); allSmallerEqual(v,w) := ( regional(result, i); i = 1; result = true; while(result & (i <= length(v)), result = result & (v_i <= w_i); i = i+1; ); result ); iBruLeColors = [ [(82,136,188)/255, (48,110,171)/255, (12,90,166)/255, (9,69,128)/255, (5,54,100)/255], [(255,185,99)/255, (255,166,57)/255, (255,140,0)/255, (197,108,0)/255, (155,85,0)/255], [(179,109,212)/255, (158, 62,204)/255, (145, 19,204)/255, (123, 5,178)/255, (95, 3,138)/255], [(90,177,171)/255, (24,156,146)/255, (0,128,119)/255, (0, 95, 88)/255, (0, 60, 56)/255], [(255,242,153)/255, (255,237,114)/255, (245,224, 80)/255, (221,198, 44)/255, (170,151, 22)/255], [(186,104, 43)/255, (152, 74, 16)/255, (117, 50, 0)/255, (80, 34, 0)/255, (42, 18, 0)/255], [(255,246,255)/255, (253,181,253)/255, (248,131,248)/255, (240, 90,240)/255, (225, 52,225)/255], [(131,222,92)/255, (99,204,53)/255, (67,186,16)/255, (48,150,5)/255, (34,116,0)/255], [(253,105,109)/255, (236,62,66)/255, (215,19,24)/255, (173,6,10)/255, (133,0,3)/255], [(224, 224, 224)/255, (172, 172, 172)/255, (128, 128, 128)/255, (78, 78, 78)/255, (36, 35, 35)/255] ]; iBruLeColor(name) := iBruLeColor(name, 0); iBruLeColor(name, brightness) := ( if (!isinteger(brightness) % brightness < -2 % brightness > 2, brightness = 0); brightness = -brightness + 3; if (contains(["blue", "blau"], name), name = 1); if (contains(["orange"], name), name = 2); if (contains(["violett", "lila"], name), name = 3); if (contains(["torquoise", "torquois", "türkis"], name), name = 4); if (contains(["minion", "yellow", "gelb"], name), name = 5); if (contains(["brown", "braun"], name), name = 6); if (contains(["magenta", "telekom"], name), name = 7); if (contains(["green", "grün"], name), name = 8); if (contains(["red", "rot"], name), name = 9); if (contains(["grey", "gray", "grau"], name), name = 10); if (contains(["black", "schwarz"], name), name = 10; brightness = 5); if (!isinteger(name) % name < 1 % name > 10, name = 1); iBruLeColors_name_brightness ); iBruLeRandomColor() := iBruLeRandomColor(7, 0); iBruLeRandomColor(max) := iBruLeRandomColor(max, 0); iBruLeRandomColor(max, brightness) := ( if(!isinteger(max) % max < 1 % max > 10, max = 7 ); iBruLeColor_(randomint(max) + 1)_brightness; ); cubicBezier(t, P1, P2) := 3*(1-t)^2*t*P1 + 3*(1-t)*t^2*P2 + t^3*[1,1]; getCubicBezierYFromX(x, P1, P2) := ( regional(tolerance, l, u, P, t); tolerance = 0.001; l = 0; u = 1; t = 0.5; if(0 < x & x <= 1, P = cubicBezier(t, P1, P2); while(|x - P_1| > tolerance, if(x > P_1, l = t, u = t); t = (l+u) / 2; P = cubicBezier(t, P1, P2); ); , if (x <= 0, P = [0, 0]; , P = [1, 1]; ); ); P_2 ); getCubicBezierYFromX(x, x1, y1, x2, y2) := getCubicBezierYFromX(x, [x1, y1], [x2, y2]); ANItimingLinear(t) := max(0, min(1, t)); ANItimingEase(t):= getCubicBezierYFromX(t, [0.25, 0.1], [0.25, 1.0]); ANItimingEaseIn(t):= getCubicBezierYFromX(t, [0.42, 0], [1, 1]); ANItimingEaseInOut(t):= getCubicBezierYFromX(t, [0.42, 0], [0.58, 1]); ANItimingEaseOut(t):= getCubicBezierYFromX(t, [0, 0], [0.58, 1]); ANItimingEaseInSine(t):= getCubicBezierYFromX(t, 0.47, 0, 0.745, 0.715); ANItimingEaseOut(t):= getCubicBezierYFromX(t, 0.39, 0.575, 0.565, 1); ANItimingInOutSine(t):= getCubicBezierYFromX(t, 0.445, 0.05, 0.55, 0.95); ANItimingEaseInQuad(t):= getCubicBezierYFromX(t, 0.55, 0.085, 0.68, 0.53); ANItimingEaseOutQuad(t):= getCubicBezierYFromX(t, 0.25, 0.46, 0.45, 0.94); ANItimingEaseInOutQuad(t):= getCubicBezierYFromX(t, 0.455, 0.03, 0.515, 0.955); ANItimingEaseInCubic(t):= getCubicBezierYFromX(t, 0.55, 0.055, 0.675, 0.19); ANItimingEaseOutCubic(t):= getCubicBezierYFromX(t, 0.215, 0.61, 0.355, 1); ANItimingEaseInOutCubic(t):= getCubicBezierYFromX(t, 0.645, 0.045, 0.355, 1); ANItimingEaseInQuart(t):= getCubicBezierYFromX(t, 0.895, 0.03, 0.685, 0.22); ANItimingEaseOutQuart(t):= getCubicBezierYFromX(t, 0.165, 0.84, 0.44, 1); ANItimingEaseInOutQuart(t):= getCubicBezierYFromX(t, 0.77, 0, 0.175, 1); ANItimingEaseInQuint(t):= getCubicBezierYFromX(t, 0.755, 0.05, 0.855, 0.06); ANItimingEaseOutQuint(t):= getCubicBezierYFromX(t, 0.23, 1, 0.32, 1); ANItimingEaseInOutQuint(t):= getCubicBezierYFromX(t, 0.86, 0, 0.07, 1); ANItimingEaseInExpo(t):= getCubicBezierYFromX(t, 0.95, 0.05, 0.795, 0.035); ANItimingEaseOutExpo(t):= getCubicBezierYFromX(t, 0.19, 1, 0.22, 1); ANItimingEaseInOutExpo(t):= getCubicBezierYFromX(t, 1, 0, 0, 1); ANItimingEaseInCirc(t):= getCubicBezierYFromX(t, 0.6, 0.04, 0.98, 0.335); ANItimingEaseOutCirc(t):= getCubicBezierYFromX(t, 0.075, 0.82, 0.165, 1); ANItimingEaseInOutCirc(t):= getCubicBezierYFromX(t, 0.785, 0.135, 0.15, 0.86); ANItimingEaseInBack(t):= getCubicBezierYFromX(t, 0.6, -0.28, 0.735, 0.045); ANItimingEaseOutBack(t):= getCubicBezierYFromX(t, 0.175, 0.885, 0.32, 1.275); ANItimingEaseInOutBack(t):= getCubicBezierYFromX(t, 0.68, -0.55, 0.265, 1.55); strokeLength(st) := ( regional(l); l = 0; repeat(length(st)-1, l = l + |st_#, st_(#+1)|; ); l ); closestStrokeTo(X) := ( regional(m, d, i); i = 0; m = 9999; repeat(length(strokes), si, forall(strokes_si, P, d = |P - X|; if (d < m, i = si; m = d; ); ); ); [i, m] ); strokesCrossed(A, B) := ( regional(s,j, i, n, mu, result, P, Q); result = []; n = length(history_historyPos); if(n > 0, j = 1; while(j <= n, s = history_historyPos_j; i = 1; while(i <= length(strokes_s), if(i > 1, P = strokes_s_(i-1); Q = strokes_s_i; mu = linearsolve([Q - P, A - B], A - P); if(!isundefined(mu), if(allSmallerEqual(zerovector(2), mu) & allSmallerEqual(mu, [1,1]), result = result :> s; i = length(strokes_s); ); ); ); i = i+1; ); j = j + 1; ); ); sort(result); ); pruneStrokes() := ( strokes = strokes_(1..strokeId-1); strokePens = strokePens_(1..strokeId-1); strokeColors = strokeColors_(1..strokeId-1); ); pruneHistory() := ( if(length(history) >= historyPos, history = history_(1..(historyPos - 1)); ); ); addStroke(start) := ( historyPos = historyPos + 1; if(historyPos == 2, strokeId = 1; strokes = []; strokePens = []; strokeColors = []; history = [[], [1]]; , pruneHistory(); strokeId = if(length(history_(-1)) > 0, history_(-1)_(-1) + 1, 1); pruneStrokes(); history = history :> (history_(-1) :> strokeId); ); strokes = strokes :> [start]; strokePens = strokePens :> selectedPen; strokeColors = strokeColors :> selectedColor; ); deleteStroke(i) := ( if (1 <= i & i <= length(strokes), historyPos = historyPos + 1; pruneHistory(); history = history :> (history_(-1) -- [i]); ); ); undo() := ( historyPos = max([1, historyPos - 1]); ); redo() := ( historyPos = min([historyPos + 1, length(history)]); ); clear() := ( if(length(history_historyPos) > 0, historyPos = historyPos + 1; pruneHistory(); history = history :> []; ); ); drawColorPicker() := ( regional(left, top, r, s, btn, t, shift); r = colorPicker_2; top = colorPicker_1_2 + r; left = colorPicker_1_1 - r; repeat(length(colorMap), shift = if(clickedColor == #, [0, -0.12], [-0.12, 0]); if(selectedColor == #, s = [[0.2,-0.2] * r * nextColorAni, (2 + 0.4 * nextColorAni) * r]; t = roundedrectangle([left + (# - 1) * 3 * r, top + shift_1] - s_1, s_2, s_2, 0.3); btn = roundedrectangle([left + (# - 1) * 3 * r, top + shift_2] - s_1, s_2, s_2, 0.3); , if(lastColor == #, s = [[0.2,-0.2] * r * lastColorAni, (2 + 0.4 * lastColorAni) * r]; t = roundedrectangle([left + (# - 1) * 3 * r, top + shift_1] - s_1, s_2, s_2, 0.3); btn = roundedrectangle([left + (# - 1) * 3 * r, top + shift_2] - s_1, s_2, s_2, 0.3); , t = roundedrectangle([left + (# - 1) * 3 * r, top + shift_1], 2*r, 2*r, 0.3); btn = roundedrectangle([left + (# - 1) * 3 * r, top + shift_2], 2 * r, 2 * r, 0.3); )); fill(t, color->iBruLeColors_(colorMap_#_1)_(colorMap_#_2 + 1)); fill(btn, color->iBruLeColors_(colorMap_#_1)_(colorMap_#_2)); ); ); drawHistoryControls() := ( regional(left, top, r, shift, enabled); r = 0.8; top = historyControls_1_2 + r; left = historyControls_1_1 - r; enabled = [historyPos > 1, historyPos < length(history), length(history_historyPos) > 0]; repeat(2, shift = if((# == clickedHistoryControl) & enabled_#, [0, -0.12], [-0.12, 0]); drawtext([left, top + shift_2] + [0,-2 * r-0.1], if(# == 1, " ⃔", " ⃕"), align->"mid", size->42, family->"Helvetica Neue", color->iBruLeColor("grey", if(enabled_#, -1, 1)) ); left = left + 3 * r; ); shift = if((3 == clickedHistoryControl) & enabled_3, [0, -0.12], [-0.12, 0]); drawtext([left, top + shift_2] + [3.5*r,-r*1.3], "Alles löschen", align->"mid", family->"Helvetica Neue", bold->true, size->16, color->iBruLeColor("grey", if(enabled_3, -1, 1)) ); ); drawColorPickerOLDTOMUCHLIKEAPPLE() := ( regional(left, top, r); top = colorPicker_1_2; left = colorPicker_1_1; r = colorPicker_2; repeat(length(colorMap), fill(circle([left + (# - 1) * 3 * r, top], r), color->iBruLeColors_(colorMap_#_1)_(colorMap_#_2) ); if (selectedColor == #, draw(circle([left + (# - 1) * 3 * r, top], 0.85 * r), color->(1,1,1), size->2); ); ); ); horizontalZacky(from, to, n, a) := ( regional(res, width); width = (to.x - from.x) / n; apply(1..(n+1), from + [width * (# - 1), if(mod(#, 2) == 1, 0, a)] ); ); drawPens() := ( regional(left, top, r, h, body, bodyH, tip, mask); r = penPicker_2; top = penPicker_1_2; left = penPicker_1_1; repeat(length(penSizes)-2, left = penPicker_1_1 - r + (#-1) * 3 * r; bodyH = [1, 2.75]; if(clickedPen == #, bodyH = bodyH - [0.17, 0.17]); if(selectedPen == #, bodyH = bodyH + [nextPenAni, nextPenAni]; ); if(lastPen == #, bodyH = bodyH + [lastPenAni, lastPenAni]; ); body = polygon([ [left, (screen_3).y - 1], [left, (screen_3).y + bodyH_1], [left + r, (screen_3).y + bodyH_2], [left + 2 * r, (screen_3).y + bodyH_1], [left + 2 * r, (screen_3).y - 1] ]); h = max([bodyH_1 + 0.2, bodyH_2 - penSizes_#/25 * 2.75 / r]); mask = polygon([ [left, (screen_3).y - 1], [left, (screen_3).y + h], [left + 2 * r, (screen_3).y + h], [left + 2 * r, (screen_3).y - 1] ]); tip = body -- mask; body = body ~~ mask; h = bodyH_2 - penSizes_#/25/2 * 2.75 / r; mask = polygon([ [left, (screen_3).y - 1], [left, (screen_3).y + h], [left + 2 * r, (screen_3).y + h], [left + 2 * r, (screen_3).y - 1] ]); tip = tip ~~ mask ++ circle([left + r, (screen_3).y + h], penSizes_#/17/2); draw(body, size->1, color->(35,35,35)/255); fill(body, color->(1,1,1)); fill(tip, color->if(selectedPen == #, iBruLeColors_(colorMap_selectedColor_1)_(colorMap_selectedColor_2), (35,35,35)/255) ); if(# == 2, connect(horizontalZacky( [left, (screen_3).y + bodyH_1], [left + 2 * r, (screen_3).y + bodyH_1], 4, -0.24), color->(35,35,35)/255 ); ); ); drawMarkerPen(penPicker_1_1 - r + 2 * 3 * r); drawEraser(penPicker_1_1 - r + 3 * 3 * r); ); drawMarkerPen(left) := ( regional(body, tip, bodyH); bodyH = [1.5, 0.75]; if(clickedPen == 3, bodyH = bodyH - [0.17, 0]); if(selectedPen == 3, bodyH = bodyH + [nextPenAni, 0]; ); if(lastPen == 3, bodyH = bodyH + [lastPenAni, 0]; ); body = roundedrectangle( [left, (screen_3).y + bodyH_1], 2 * penPicker_2, bodyH_1 + 1, 0.2 ); tip = polygon([ [left + 0.15, (screen_3).y + bodyH_1], [left + 0.15, (screen_3).y + bodyH_1 + 0.75 * bodyH_2], [left + 2 * penPicker_2 - 0.15, (screen_3).y + bodyH_1 + bodyH_2], [left + 2 * penPicker_2 - 0.15, (screen_3).y + bodyH_1] ]); fill(tip, color->if(selectedPen == 3, iBruLeColors_(colorMap_selectedColor_1)_(colorMap_selectedColor_2), (35,35,35)/255) ); draw(body, size->1, color->(35,35,35)/255); fill(body, color->(1,1,1)); ); drawEraser(left) := ( regional(body, tip, bodyH); bodyH = [1.5, 0.65]; if(clickedPen == 4, bodyH = bodyH - [0.17, 0]); if(selectedPen == 4, bodyH = bodyH + [nextPenAni, 0]; ); if(lastPen == 4, bodyH = bodyH + [lastPenAni, 0]; ); body = polygon([ [left, (screen_3).y - 1], [left, (screen_3).y + bodyH_1], [left + 2 * r, (screen_3).y + bodyH_1], [left + 2 * r, (screen_3).y - 1] ]); tip = roundedrectangle( [left + 0.05, (screen_3).y + bodyH_1 + bodyH_2], 2 * penPicker_2 - 0.1, bodyH_1 + 1, 0.2 ); fill(tip, color->if(selectedPen == 4, iBruLeColor("magenta", 1), (1,1,1)) ); draw(tip, size->1, color->(35,35,35)/255); draw(body, size->1, color->(35,35,35)/255); fill(body, color->(1,1,1)); draw([ [left, (screen_3).y + bodyH_1 - 0.4], [left + 2 * r, (screen_3).y + bodyH_1 - 0.4] ], size->1, color->(35,35,35)/255); ); drawControls() := ( if(controlsVisible, if(controlsAnimating, gsave(); translate([0, controlsAni_1]); ); drawColorPicker(); drawPens(); drawHistoryControls(); if(controlsAni, grestore(); ); ); ); toggleControls(visible) := ( if(visible, controlsVisible = true); controlsAnimatingIn = visible; startAnimation("controls"); ); startAnimation(what) := ( if(what == "pens", penStartTime = seconds(); penAnimating = true; lastPenAni = 1; nextPenAni = 0; ); if(what == "colors", colorStartTime = seconds(); colorAnimating = true; lastColorAni = 1; nextColorAni = 0; ); if(what == "controls", controlsStartTime = seconds(); controlsAnimating = true; ); playanimation(); ); tickAnimation() := ( if(penAnimating, animatePens(); ); if(colorAnimating, animateColors(); ); if(controlsAnimating, animateControls(); ); ); animatePens() := ( regional(t); t = (seconds() - penStartTime) / penAnimationDuration; if (0 <= t, lastPenAni = 1 - ANItimingEaseOut(t); nextPenAni = ANItimingEaseOut(t); ); if(t >= 1, penAnimating = false; endAnimation(); ); ); animateColors() := ( regional(t); t = (seconds() - colorStartTime) / colorAnimationDuration; if (0 <= t, lastColorAni = 1 - ANItimingEaseOut(t); nextColorAni = ANItimingEaseOut(t); ); if(t >= 1, colorAnimating = false; endAnimation(); ); ); animateControls() := ( regional(t, s); t = (seconds() - controlsStartTime) / controlsAnimationDuration_(if(controlsAnimatingIn, 1, 2)); if (0 <= t, if(controlsAnimatingIn, s = ANItimingEaseOut(t); controlsAni = [-5 + 5 * s, 0.5 * s]; , s = ANItimingEaseIn(t); controlsAni = [-5 * s, 0.5 - 0.5 * s]; ); ); if(t >= 1, if(!controlsAnimatingIn, controlsVisible = false; ); controlsAnimating = false; endAnimation(); ); ); endAnimation() := ( doStopAnimation = !penAnimating & !colorAnimating & !controlsAnimating; ); strokes = []; strokeId = 0; screen = screenbounds(); historyControls = [[(screen_3).x - 10, (screen_3).y + 1.5]]; clickedHistoryControl = 0; historyPos = 1; history = [[]]; strokeColors = []; lastColor = 0; clickedColor = 0; selectedColor = 2; colorPicker = [[(screen_3).x - 25, (screen_3).y + 1.5], 0.8]; colorMap = [[10, 4], [1, 3], [3, 3], [2, 3], [5, 3]]; strokePens = []; lastPen = 0; clickedPen = 0; selectedPen = 1; penPicker = [[(screen_3).x - 35, (screen_3).y + 1], 0.5]; penSizes = [3, 5, 20, 10]; penAlphas = [1, 0.9, 0.7, 0]; eraserPen = 4; strokeToErase = []; eraserStroke = []; drawing = false; mouseDown = [0,0]; penAnimating = false; penStartTime = 0; penAnimationDuration = 0.3; lastPenAni = 0; nextPenAni = 1; colorAnimating = false; colorStartTime = 0; colorAnimationDuration = 0.15; lastColorAni = 0; nextColorAni = 1; controlsVisible = false; controlsAnimating = false; controlsStartTime = 0; controlsAnimationDuration = [0.4, 0.2]; controlsAni = [-5, 0]; doStopAnimation = false; ',draw: ' if(controlsVisible, fill(screen(), color->(1,1,1), alpha->controlsAni_2); ); forall(history_historyPos, i, connect(strokes_i, size->penSizes_(strokePens_i), alpha->penAlphas_(strokePens_i), color->iBruLeColors_(colorMap_(strokeColors_i)_1)_(colorMap_(strokeColors_i)_2) ); ); drawControls(); if(doStopAnimation, stopanimation(); doStopAnimation = false; ); ',mousedown: ' mouseDown = mouse(); if (mouse().y <= (screen_3).y + 2, if(historyControls_1_1 - 0.8 * 1.5 <= mouseDown.x & mouseDown.x <= historyControls_1_1 - 0.8 * 1.5 + 13 * 0.8, clickedHistoryControl = min([3, round((mouseDown.x - historyControls_1_1) / 0.8 / 3) + 1]); ); if(colorPicker_1_1 - colorPicker_2 * 1.5 <= mouseDown.x & mouseDown.x <= colorPicker_1_1 - colorPicker_2 * 1.5 + length(colorMap) * colorPicker_2 * 3, clickedColor = round((mouseDown.x - colorPicker_1_1) / colorPicker_2 / 3) + 1; ); if(penPicker_1_1 - penPicker_2 * 1.5 <= mouseDown.x & mouseDown.x <= penPicker_1_1 - penPicker_2 * 1.5 + length(penSizes) * penPicker_2 * 3, clickedPen = round((mouseDown.x - penPicker_1_1) / penPicker_2 / 3) + 1; ); , drawing = true; if(selectedPen == eraserPen, drawing = false; eraserStroke = [mouseDown]; ); if (drawing, addStroke(mouseDown); ); ); ',mousedrag: ' if(drawing, strokes_strokeId = strokes_strokeId :> mouse().xy; if (length(strokes_strokeId) > 2, strokes_strokeId_(-2) = (strokes_strokeId_(-3) + strokes_strokeId_(-1) + mouse())/3 ); ); if(selectedPen == eraserPen, eraserStroke = eraserStroke :> mouse(); if(length(eraserStroke) > 1, strokeToErase = strokesCrossed(eraserStroke_(-2), eraserStroke_(-1)); if(length(strokeToErase) > 0, deleteStroke(strokeToErase_1); eraserStroke = [mouse()]; ); ); ); ',mouseup: ' mouseUp = mouse(); if (|mouseDown - mouseUp| <= 1, if (mouseUp.y <= (screen_3).y + 2.5, if(clickedColor > 0, lastColor = selectedColor; selectedColor = clickedColor; if(lastColor != selectedColor, startAnimation("colors"); ); ); if(clickedPen > 0, lastPen = selectedPen; selectedPen = clickedPen; javascript("Scribble.passThisOn = " + if(selectedPen == 4, "false", "true") + ";"); if(lastPen != selectedPen, startAnimation("pens"); ); ); if(clickedHistoryControl > 0, if(clickedHistoryControl == 1, undo(), if(clickedHistoryControl == 2, redo(), if(clickedHistoryControl == 3, clear() ))); ); ); ); clickedPen = 0; clickedColor = 0; clickedHistoryControl = 0; drawing = false; ',tick: ' tickAnimation(); '}, geometry:[] }); Scribble.opener.addEventListener("click", Scribble.showHide); }, initPassOn: function(element){ Scribble.canvas.addEventListener("mousedown", Scribble.passOnFunction); Scribble.canvas.addEventListener("mousemove", Scribble.passOnFunction); Scribble.canvas.addEventListener("mouseup", Scribble.passOnFunction); Scribble.canvas.addEventListener("touchstart", Scribble.passOnFunction); Scribble.canvas.addEventListener("touchmove", Scribble.passOnFunction); Scribble.canvas.addEventListener("touchend", Scribble.passOnFunction); Scribble.passOnTo = element; }, passOnFunction: function(e) { if(Scribble.passThisOn) { if (e.type.indexOf("touch") !== -1) { /*Scribble.passOnTo.dispatchEvent(new TouchEvent(e.type, e)); Safari-Fix:*/ var te = new UIEvent(e.type, e); te.touches = e.touches; te.targetTouches = e.targetTouches; te.changedTouches = te.changedTouches; Scribble.passOnTo.dispatchEvent(te); } else { Scribble.passOnTo.dispatchEvent(new MouseEvent(e.type, e)); } } }, showHide: function(e) { Scribble.visible = !Scribble.visible; Scribble.openerContent.innerHTML = (Scribble.visible) ? "×" : "✎"; Scribble.canvas.style.opacity = (Scribble.visible) ? 1 : 0.5; Scribble.canvas.style.pointerEvents = (Scribble.visible) ? "auto" : "none"; /*Scribble.canvas.style.boxShadow = (Scribble.visible) ? "inset 0 0 20px #808080" : "none";*/ Scribble.Cindy.evokeCS("toggleControls(" + Scribble.visible + ");"); }, canvas: undefined, opener: undefined, openerContent: undefined, passThisOn: true, visible: false }; Scribble.autoLoad(); 