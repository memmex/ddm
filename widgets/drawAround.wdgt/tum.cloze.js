;(function($) {
$.widget("tum.cloze", {
	_faded: false,
	
	options: {
		inputStyle: "border: 0px; border-bottom: 2px solid #232323; border-radius: 2px;"
			+ " -webkit-appearance: none; font: inherit; background: 0;"
			+ " padding-left: 0.3em; padding-right: 1.2em; background: 0;",

		wrongStyle: "background-color: #FD696D; color: #000;",

		correctStyle: "background: #83DE5C;",
		
		fadeStyle: "border-bottom: 2px solid transparent; background: 0;"
			+" text-align: center; padding: 0 0.75em; color: #227400;"
			+ " transition: all 0.5s ease-in; -webkit-transition: all 0.5s ease-in;",

		correctorStyle: "display: inline-block; margin-left: -1em; width: 1em;"
			+ " height: 1em; vertical-align: middle; text-align: center;"
			+ " pointer-events: none; transition: all 0.5s ease-in;"
			+ " -webkit-transition: all 0.5s ease-in;",

		fadedCorrectorStyle: "color: transparent; width: 0; height: 0; margin-left: 0;",

		ignoreCase: true,
	},

	fadeOut: function(){
		var wdgt = this;
		this.check();
		$(this.element)
			.find("input.cloze-ins")
			.each(function(){
				if (this.dataset.correct !== "false") {
					this.setAttribute('style',
						this.getAttribute('style') + wdgt.options.fadeStyle
					);
					$(this).next('.cloze-corrector').attr('style', 
						wdgt.options.correctorStyle + wdgt.options.fadedCorrectorStyle
					);
				} 
			 });
		this._checkButton.css("transition-timing-function", "cubic-bezier(0.6, -0.28, 0.735, 0.045)")
			.css("right", -this._checkButton.outerWidth(true)-10);
		this._faded = true;
	},

	fadeIn: function(event){
		var wdgt = this;
		$(this.element).find('.cloze-corrector').attr("style", this.options.correctorStyle);
		$(this.element).find('input.cloze-ins').each(function(){
			wdgt._setInputStyle(this, 
				(this.dataset.correct === "false")
					? ((this.value.length) ? wdgt.options.wrongStyle : '')
					: wdgt.options.correctStyle
			);
		});
		this._checkButton
			.css("transition-timing-function", "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
			.css("right", 0);
	},

	_autoFadeOut: function(event) {
		if (!this._faded) {
			if (event && event.relatedTarget !== undefined) {
				if (event.relatedTarget === null) {
					if (!$(this.element).children("input.cloze-ins")
						.filter(function(){return this.dataset.correct === "false";})
						.length
					) {
						this.fadeOut();
					}	
				}
			}
		}
	},

	_autoFadeIn: function(event) {
		if (this._faded) {
			this.fadeIn();
		}
	},

	_checkOne: function(input){
		var value = input.value.trim();
		if (this.options.ignoreCase) {
			value = value.toLowerCase();
		}
		var expected = input.dataset.expected.split(";");
		
		for( var i = 0; i < expected.length; i++) {
			if (this.options.ignoreCase) {
				if (value == expected[i].toLowerCase()){
					input.value = expected[i];
					return true;
				}
			} else if (value == expected[i]) {
				return true;
			}
		}
		return false;
	},

	_markOne: function(input, correct) {
		var elem = $(input);
		var corrector = elem.next('.cloze-corrector');
		input.dataset.correct = correct;
		if (correct) {
			this._setInputStyle(input, this.options.correctStyle);
			corrector.html('&#x2713;');
		} else {
			if (input.value.length == 0) {
				this._setInputStyle(input, '');
				corrector.html('<span style="-webkit-transform: scale(-1, 1); transform: scale(-1, 1); display:inline-block;">&#x270e;</span>');
			} else {
				this._setInputStyle(input, this.options.wrongStyle);
				corrector.html('&#x2717;');
			}
		}	
	},

	check: function() {
		var wdgt = this;
		var wrongs = 0;
		document.activeElement.blur();
		$(this.element)
			.find("input.cloze-ins")
			.each(function(index){
				if (!wdgt._checkOne(this)) wrongs++;
				wdgt._markOne(this, wdgt._checkOne(this));
			});
		if (this.DM) {
			this.DM.log(this._values());
		}
		return !wrongs;
	},		
	
	_getTextWidth: function(of) {
		return Math.max(0, Math.round(this._textWidthHelper.html(of).width()));
	},
	_setInputStyle: function(elem, css){
		var calcText = (elem === document.activeElement) ? elem.value+ 'm' : elem.value;
		elem.setAttribute("style", this.options.inputStyle
			+ "min-width: " + elem.dataset.minSize + "px; "
			+ "width: " + this._getTextWidth(calcText) + "px; "
			+ css);
	},

	_values: function(){
		var wdgt = this;
		var values = [];
		$(this.element)
			.find("input.cloze-ins")
			.each(function(index){
				values.push(this.value.trim())
			}
		);
		return values;
	},

	_create: function(){
		// we will use this div to set the inputs to the current text-width
		this._textWidthHelper = $('<div style="' + this.options.inputStyle + '; display: inline; visibility: hidden;"></div>');
			
		var wdgt = this; // as this in functions refers to other stuff, we save this here

		// this is the check button
		this._checkButton = $('<button style="display: block; margin-top: 5px; position: absolute; top: 0; right: 0; transition: all 0.5s;" class="orange">überprüfen</button>')
			.on("touchend click", function(e){
				e.preventDefault();
				e.stopImmediatePropagation();
				if(wdgt.check()) {
					wdgt.fadeOut();
				}
			});
		//data-management
		var saved = [];
		if (typeof DataManager !== "undefined") {
			function numbers(str) {
				var hash = 0, len = str.length, i = 0;
				if (!len) return hash;
				for (i; i < len; ++i) {
					hash = hash * 31 + str.charCodeAt(i);
				}
				return hash;
			}	
			this.DM = new DataManager('cloze-' + numbers($(this.element).html()));

			this.DM.onSave = function(){
				DM.log(this._values());
			};

			saved = (this.DM.data.history.length) 
					? this.DM.data.history[this.DM.data.history.length-1].data 
					: [];
		}

		$(this.element)
			.prepend(this._checkButton)
			.append(this._textWidthHelper)
			.on('input', function(e){
				// live mark as correct
				if (wdgt._checkOne(e.target)) {
					wdgt._markOne(e.target, true);
					// focus next input
					$(e.target).nextAll('input.cloze-ins').first().focus();
				} else {
					//wdgt.fadeIn();
					//resize
					wdgt._setInputStyle(e.target, '');
					//if it was correct and now it is wrong
					if (e.target.dataset.correct === "true")
						wdgt._markOne(e.target, false);
				}
			})
			.on("focusin focusout", function(e) {
//				document.body.scrollTop = Math.round(
//					$(wdgt.element).find("input.cloze-ins").first().offset().top	
//				);
				//put button into view
				window.setTimeout(function(){
					wdgt._checkButton
						.css("top", document.body.scrollTop)
				}, 500);
			})
			.find("ins")
			.replaceWith(function(index){
				var width = wdgt._getTextWidth(this.innerHTML.split(";")[0]);
				return '<input class="cloze-ins" type="text" '
					+ 'id="cloze-ins' + index + '"'
					+ 'data-expected="' + this.innerHTML + '" '
					+ 'data-min-size="' + width + '" '
					+ 'style="' + wdgt.options.inputStyle + ';'
					+ ' width: ' + width + 'px; min-width: ' + width + 'px" '
					+ ((saved[index]) ? 'value="' + saved[index] + '"' : '')
					+ '/>'
					+ '<div class="cloze-corrector" style="' 
					+ wdgt.options.correctorStyle + '">'
					+ '<span style="-webkit-transform: scale(-1, 1); transform: scale(-1, 1); display:inline-block;">&#x270e;</span>'
					+ '</div>';
			});

			//if we play in-page, autofade on focus/blur
			if (location.href.indexOf('autoplay') !== -1){
				document.addEventListener("focusout", this._autoFadeOut);
				document.addEventListener("touchend", this._autoFadeIn);
			}
	},
	_destroy: function(){
		$(this.element)
			.children()
			.remove(this._checkButton)
			.remove(this._textWidthHelper)
			.filter("input.cloze-ins")
			.replaceWith(function(){
				return '<ins>' + $(this).data('expected') + '</ins>';	
		});
		document.removeEventListener("focusout", this._autoFadeOut);
		document.addEventListener("touchend", this._autoFadeIn);
	},
})
})(jQuery);
