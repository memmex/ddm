createCindy.registerPlugin(1, "cindyTeX", function(api){

	var initM = api.getInitialMatrix();
	var zIndex = 1;
	
	function extract(from) {
		if (from.ctype && from.value !== undefined) {
			if (from.ctype == "number") return from.value.real;
			if (from.ctype == "string") return from.value;
		}
		return null;
	}

	api.defineFunction("drawtex", 3, function(args, modifs){
		//can I have extract_point, please?
		var pt = api.evaluateAndVal(args[0]);
		pt = {x: extract(pt.value[0]), y: extract(pt.value[1])};
		var o = {
			id: api.instance.canvas.id + '-' + extract(api.evaluate(args[2])),
			tex: api.evaluate(args[1]).value,
    			
			left: pt.x * initM.a - pt.y * initM.b + initM.tx, // stolen from drawtext
			top: pt.x * initM.c - pt.y * initM.d - initM.ty
		};
		var val;
		for (var key in modifs) {
			switch (key) {
				case "color":
					val = api.evaluate(modifs.color);
					o.color = "rgb(" + val.value.map(function(v){
						return +extract(v) * 100 + "%";
					}).join(",") + ")";
					break;
				case "offset":
					val = api.evaluate(modifs.offset);
					o.xoffset = extract(val.value[0]);
					o.yoffset = extract(val.value[1]);
				break;
				default:
					o[key] = extract(api.evaluate(modifs[key]));
			}
		}
		render(o); 
	});

	api.defineFunction("cleartex", 0, function(args, modifs) {
		var divs = document.querySelectorAll(".cindyTeX"); //returns a NodeList, NOT an array
		for (var i = 0; i < divs.length; i++) {
			if (divs.item(i).parentElement) {
				divs.item(i).parentElement.removeChild(divs.item(i));
			}
		}

	});
	
	api.defineFunction("cleartex", 1, function(args, modifs) {    
		var id = extract(api.evaluate(args[0]));
		var div = document.getElementById('cindyTeX-' + api.instance.canvas.id + '-' + id);
		if (div && div.parentElement) {
			div.parentElement.removeChild(div);
		} 
	});
	
	api.defineFunction("toptex", 1, function(args, modifs) {
		var id = api.instance.niceprint(api.evaluate(args[0])).replace(/\W/g, '');
		var div = document.getElementById('cindyTeX-' + api.instance.canvas.id + '-' + id);
		
		if (div) {
			if (modifs.zIndex !== undefined) {
				div.style.zIndex = extract(api.evaluate(modifs[key]));
			} else {
				div.style.zIndex = zIndex++;
			}
		}
		return api.nada;
	});

	
	function render (o){
		// check if the div identified by id already exists
		var div = document.getElementById('cindyTeX-' + o.id);
		if (!div) { // if not, create it
			div = document.createElement("div");
			div.id = 'cindyTeX-' + o.id;
			div.className = "cindyTeX";
			div.style.pointerEvents = "none"; //pass mouse Events to the canvas
			div.style.position = "absolute";
			// this may improve performance
			div.style.WebkitTransform = "translateZ(0)";
			div.style.WebkitTransformStyle = "preserve-3d";
			div.style.WebkitBackfaceVisibility = "hidden";		

			div.dataset.rawtex = o.tex; //save the raw TeX
			try{
				katex.render(o.tex, div, {displayMode: o.displayMode}); // render
			} catch(e) {
				div.innerHTML = o.tex;
			}
			((api.instance.canvas.offsetParent) ? api.instance.canvas.offsetParent : document.body)
				.appendChild(div);
		} else if (div.dataset.rawtex !== o.tex) { //if the TeX changed, render it
			try{
				katex.render(o.tex, div, {displayMode: o.displayMode}); // render
			} catch(e) {
				div.innerHTML = o.tex;
			}

			div.dataset.rawtex = o.tex;
		}

		div.style.fontSize = (o.size !== undefined) ? Math.round(+o.size * 10) / 10 + "px" : "20px";
		//prevent 1px dot at o.size = 0;
		div.style.display = (o.size === 0) ? "none" : "block";
		div.style.color = o.color || "inherit";
		div.style.opacity = (o.alpha !== undefined) ? +o.alpha : 1;
		//not supported by katex:
		//if (o.bold) div.style.fontWeight = "bold";
		//if (o.italics) div.style.fontStyle = "italic";
		
		//move
		var newTop, newLeft;
		newTop = api.instance.canvas.offsetTop + o.top - div.offsetHeight;
		newLeft = api.instance.canvas.offsetLeft + o.left;
		
		if (o.align == "right") {
			newLeft-= div.offsetWidth;
		} else if (o.align == "mid") {
			newLeft-= Math.round(div.offsetWidth / 2);
		}

		if (o.xoffset) newLeft+= +o.xoffset;
		if (o.yoffset) newTop+= -o.yoffset;

		div.style.left = newLeft + "px";
		div.style.top = newTop + "px";
	}	
});
