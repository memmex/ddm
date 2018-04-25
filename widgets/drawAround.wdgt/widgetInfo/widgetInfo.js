/**
 * 
 * Usage:
 *  1. Copy widgetInfo.js and widgetInfo.css into the same directory
 *  2. Include widgetInfo.js in your HTML-File via
 *
 *  		<script src="PATH/TO/widgetInfo.js"></script>
 *	 
 *	If you wish to scale the size of the widget down when the info panel opens, use the attribute data-scale-content:
 *
 *  		<script src="PATH/TO/widgetInfo.js" data-scale-content></script>
 *	
 *  3. In your <BODY>, add a <DIV> with the id 'widgetInfo'
 *
 *	  	<div id="widgetInfo"></div>
 *
 *  4. Write the information about your widget into the <DIV>, use HTML-Markup to format it
 *
 *  		<div id="widgetInfo"><h3>A heading</h3><em>This is emphed</em><p>This is a parapgraph</p></div>
 *
 *  	(If you also load katex and its auto-renderer, the usual TeX-Delimiters ($..$, $$..$$, \(..\), \[..\]) for Mathmode work.
 *
 *		<link rel="stylesheet" type="text/css" href="PATH/TO/katex/katex.min.css" />
 *		<script src="PATH/TO/katex/katex.min.js"></script>
 *		<script src="PATH/TO/katex/contrib/auto-render.min.js"></script>
 *  	)
 *  5. done!
 *  
 */

WidgetInfo = {
	appendDivWithId : function (id, parent){
		var div = document.createElement('div');
		div.id = id;
		if (parent) {
			parent.appendChild(div);
		} else {
			document.body.appendChild(div);
		}
		return div;
	},

	scaleContent: function(by) {
		if (this.contentDiv) {
			if (!by) {
				by = 1 - WidgetInfo.infoDiv.fixedOffsetWidth / document.body.offsetWidth;
			}
			this.contentDiv.style.transform = "scale(" + by + ")";
			this.contentDiv.style.WebkitTransform = "scale(" + by + ")";
		}
	},

	show: function(event) {
		WidgetInfo.infoDiv.style.right = 0;
		WidgetInfo.shaderDiv.style.visibility = 'visible';
		WidgetInfo.shaderDiv.style.opacity = 1;
		WidgetInfo.scaleContent();
		if (WidgetInfo.DM) {
			WidgetInfo.DM.log(WidgetInfo.fileName + ":show");
		}
	},
	
	hide: function(event) {
		WidgetInfo.infoDiv.style.right = '-100%';
		WidgetInfo.shaderDiv.style.visibility = 'hidden';
		WidgetInfo.shaderDiv.style.opacity = 0;
		WidgetInfo.scaleContent(1);
		WidgetInfo._hideResetConfim();
		if (WidgetInfo.DM) {
			WidgetInfo.DM.log(WidgetInfo.fileName + ":hide");
		}
	},

	dragging: false,

	_startDragging: function(event){
		WidgetInfo.dragging = true;
		WidgetInfo.dragOrient = event.changedTouches[0].pageX;
		WidgetInfo.dragStart = {x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY};
		WidgetInfo.dragMax = WidgetInfo.dragStart.x;
		//disable transition
		WidgetInfo.infoDiv.classList.add('notransition');	
		WidgetInfo.shaderDiv.classList.add('notransition');
		if (WidgetInfo.contentDiv)
			WidgetInfo.contentDiv.classList.add('notransition');
	},

	_closeDragStart: function(event) {
		var distance = event.changedTouches[0].pageX - WidgetInfo.infoDiv.offsetLeft;
		if (0 < distance && distance < 44){
			WidgetInfo._startDragging(event);
		} 
	},
	
	_shaderDragStart: function(event) {
		var distance = event.changedTouches[0].pageX - WidgetInfo.infoDiv.offsetLeft;
		if (0 < distance) {
			WidgetInfo._startDragging(event);	
		} 
	},

	_closeDrag: function(event) {
		event.preventDefault();
		event.stopPropagation();
		if (!WidgetInfo.dragging) {
			WidgetInfo._closeDragStart(event); // if we swipe from the shader into the infoDiv, start dragging
		}
		if (WidgetInfo.dragging) {
			WidgetInfo.dragMax = Math.max(WidgetInfo.dragMax, event.changedTouches[0].pageX); 
			
			if (Math.abs(event.changedTouches[0].pageX - WidgetInfo.dragOrient) > 20) {
				WidgetInfo.dragOrient = event.changedTouches[0].pageX;
			}
			var distance = (event.changedTouches[0].pageX - WidgetInfo.dragStart.x);
			if (distance > 0) {
				WidgetInfo.shaderDiv.style.opacity = 1 - (distance / WidgetInfo.infoDiv.fixedOffsetWidth);
				if (WidgetInfo.contentDiv) 
					WidgetInfo.scaleContent(1 - (WidgetInfo.infoDiv.fixedOffsetWidth - distance ) / document.body.offsetWidth);
				WidgetInfo.infoDiv.style.right = -distance + 'px';
			}
		}
	},

	_closeDragStop: function(event) {
		if (WidgetInfo.dragging) {
			WidgetInfo.dragging = false;
			WidgetInfo.infoDiv.classList.remove('notransition');	
			WidgetInfo.shaderDiv.classList.remove('notransition');
			if (WidgetInfo.contentDiv) 
				WidgetInfo.contentDiv.classList.remove('notransition');
			// do not close if the user changes their mind 
			var d =  event.changedTouches[0].pageX - WidgetInfo.dragOrient;
			if (Math.abs(d) > 20) {
				WidgetInfo[d < 0 ? 'show' : 'hide']();
				// if we tap, close (since we set dragging only if we started on the left border, this equals a tap on the left border
			} else if (Math.abs(WidgetInfo.dragStart.x - WidgetInfo.dragMax) < 20){
				WidgetInfo.hide();
			} else {
				// if we move move than 80 pixels, close fully, else open fully again
				if (WidgetInfo.dragStart.x + 80 <= event.changedTouches[0].pageX) {
					WidgetInfo.hide();
				} else {
					WidgetInfo.show();
				}
			}
		}
	},

	_showResetConfim: function (event) {
		document.getElementById('widgetInfoDMResetConfirm').style.display = "block";	
	},
	_hideResetConfim: function () {
		var div = document.getElementById('widgetInfoDMResetConfirm');
		if (div) 
			div.style.display = "none";
	},

	_resetDM: function (e) {
		DataManager.instances.forEach(function(DM) {
			if (DM.userResettable)
				DM.reset();
		});
		location.reload();
	},

	// add the button and the functionalities
	init: function(){
		var div, target;
		// Infoarea
		var infoDiv = document.getElementById('widgetInfo');
		
		if (!infoDiv) return false;

		infoDiv.lang = "de-DE";
		this.infoDiv = infoDiv;

		if (this.contentDiv) {
			infoDiv.parentNode.removeChild(infoDiv);
			document.body.innerHTML = '<div id="widgetContent">' + document.body.innerHTML + '</div>';
			document.body.appendChild(infoDiv);
			this.contentDiv = document.getElementById('widgetContent');
		}
		this.infoDiv.fixedOffsetWidth = infoDiv.offsetWidth;
	
		document.body.style.overflowX = "hidden";

		//shader
		div = this.appendDivWithId('widgetInfoShader');
		div.addEventListener('click', this.hide); //this is for desktop
		div.addEventListener('touchstart', this._shaderDragStart);
		div.addEventListener('touchmove', this._closeDrag);
		div.addEventListener('touchend', function(event) {
			if (this.dragging) {
				this._closeDragStop(event);
			} else {
				this.hide();
			}
		});
		this.shaderDiv = div;	

		// add the i Button
		div = document.createElement('i');
		div.innerHTML = 'i';
		target = this.appendDivWithId('widgetInfoOpener');
		target.appendChild(div);
		target.addEventListener('click', this.show); //this is for desktop
		target.addEventListener('touchend', this.show);

		if (typeof DataManager === "function") {
			this.DM = new DataManager("widgetInfo");
			this.DM.userResettable = false;
			this.fileName = location.href.slice(location.href.lastIndexOf('/') + 1);
			
		}	

		//math
		if (typeof renderMathInElement === "function") {
			renderMathInElement(infoDiv, {delimiters: [
				{left: "$$", right: "$$", display: true},
				{left: "\\[", right: "\\]", display: true},
				{left: "\\(", right: "\\)", display: false},
				{left: "$", right: "$", display: false}
			]});
		}

		infoDiv.addEventListener('touchstart', this._closeDragStart);
		infoDiv.addEventListener('touchmove', this._closeDrag);
		infoDiv.addEventListener('touchend', this._closeDragStop);

		// Add the ">" for closing
		target = this.appendDivWithId('widgetInfoCloser', infoDiv);
		target.innerHTML = '&#x27e9;';
		target.addEventListener('click', this.hide);

		//append reset button for DataManager
		if (typeof DataManager !== "undefined") {
			infoDiv.appendChild(document.createElement('hr'));
			div = this.appendDivWithId('widgetInfoDMReset', infoDiv);
			target = document.createElement('button');
			target.className = "dark blue";
			target.innerHTML = "Aufgabe zurücksetzen";
			target.addEventListener('click', this._showResetConfim);
			div.appendChild(target);

			target = document.createElement('button');
			target.className = "red";
			target.innerHTML = "Fortschritt löschen";
			target.addEventListener('click', this._resetDM);

			this.appendDivWithId('widgetInfoDMResetConfirm', div).appendChild(target);

		}
	}
};

//load our stylesheet
(function(){
var fileref = document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");

WidgetInfo.contentDiv = 'scaleContent' in document.currentScript.dataset;

var scriptsrc = document.currentScript.src;
scriptsrc = scriptsrc.slice(0, scriptsrc.lastIndexOf('/')+1);

fileref.setAttribute("href", scriptsrc + "widgetInfo.css");
document.head.appendChild(fileref);
})();

document.addEventListener("DOMContentLoaded", WidgetInfo.init.bind(WidgetInfo));
