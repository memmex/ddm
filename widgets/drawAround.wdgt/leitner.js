// Flashcards, also called Leitner-System

function Leitner(length, strict) {
	if (length % 1 !== 0 || length <= 0) {
		throw new TypeError("Leitner depth not a positive integer.");
	}
	this.groups = new Array(length);
	for (var i = 0; i < length; i++) {
		this.groups[i] = [];
	}

	//This determines whether a wrong answer will put the card into group 1 (true) or in the previous one (false)
	this.strict = strict;

	this._activeGroup = 0;
}

Object.defineProperty(Leitner.prototype, "cardCount", {
	get: function(){
		return this.groups.reduce(function(v, group){ return v + group.length }, 0);
	}
})

Leitner.prototype.clear = function(){
	this.groups = new Array(length);
	for (var i = 0; i < length; i++) {
		this.groups[i] = [];
	}
	this._activeGroup = 0;
	return this;
}

Leitner.prototype.addCard = function (c) {
	return new FlashCard(c, this);
}

Leitner.prototype.addCards = function(array) {
	for (var i = 0; i < array.length; i++) {
		this.addCard(array[i]);
	}
	return this;
}

Leitner.prototype.nextCard = function(random){
	if (!this.groups[this._activeGroup].length) {
		var group = 0;
		while (group < this.groups.length && !this.groups[group].length){
			group++;		
		}
		if (group === this.groups.length) return null;
		this._activeGroup = group;
	}
	if (random) {
		return this.groups[this._activeGroup][Math.floor(Math.random() * this.groups[this._activeGroup].length)];
	} else {
		return this.groups[this._activeGroup][0];
	}
}

Leitner.prototype.toJSON = function(){
	var decycled = {strict: this.strict, _activeGroup: this._activeGroup};
	decycled.groups = this.groups.map(function(group){return group.map(function(card){ return {content: card.content, fails: card.fails} })});
	return JSON.stringify(decycled);
}

Leitner.fromJSON = function(input){
	if (typeof input === 'string'){
		input = JSON.parse(input, function(k,v) {
			if (typeof isFraction === 'function' && isFraction(v) && v.constructor !== Fraction) {
				return new Fraction(v); 
			} else {
				return v;
			}
		});
	}
	
	if (input.groups){
		var leitner = new Leitner(input.groups.length, input.strict);
		input.groups.forEach(function(group, i){
			group.forEach(function(card){
				new FlashCard(card.content, leitner, i, card.fails);
			}); 
		});
		leitner._activeGroup = input._activeGroup;
		return leitner;
	} else {
		return null;
	}
}

function FlashCard(data, parent, group, fails){
	var group = (group) ? group : 0;
	if (parent.constructor !== Leitner) {
		throw new TypeError("Parent of FlashCard must be a Leitner object.");
	}
	this.fails = +fails || 0;
	this.content = data;
	this.leitner = parent;
	parent.groups[group].push(this);

	Object.defineProperty(this, 'group', {
		get: function(){ return group; },
		set: function(v){
			if (v % 1 === 0 && v >= 0) {
				this.leitner.groups[group].splice(this.leitner.groups[group].indexOf(this), 1);
				group = v;
				if (v < this.leitner.groups.length){
					this.leitner.groups[v].push(this);
				}
			} else {
				if (v % 1 !== 0) {
					throw new RangeError();
				} else {
					throw new TypeError();
				}
			}
		}
	});
}

FlashCard.prototype.move = function(forward) {
	if(forward) {
		this.moveOn();
	} else {
		this.moveBack();
	}
}

FlashCard.prototype.moveOn = function() {
	this.group++;
	return this;
} 

FlashCard.prototype.moveBack = function(){
	this.fails++;
	this.group = (this.leitner.strict || this.group == 0) ? 0 : this.group - 1;
	return this;
}

FlashCard.prototype.remove = function(){
	this.group = this.leitner.groups.length;
	return true;
}

FlashCard.prototype.next = function(){
	return this.leitner.nextCard();
}


//CindyJS-Plugin
if (typeof createCindy === 'function' && createCindy.registerPlugin) {

createCindy.registerPlugin(1, "leitner", function(api) {
	var leitner;
	var currentCard;

	api.defineFunction("initleitner", 1, function(args, modifs) {
		if (typeof cindyDM !== 'undefined') {
			leitner = cindyDM.store("leitner");			
		}
		if (!leitner) 
			leitner = new Leitner(
				api.evaluateAndVal(args[0]).value.real, 
				(modifs.strict && modifs.strict.value)
			);
		if (typeof cindyDM !== 'undefined') {
			cindyDM.store("leitner", leitner);
		}
	});

	api.defineFunction("clearleitner", 0, function(){
		if (leitner) leitner.clear();
	});

	api.defineFunction("newcard", 1, function(args, modif) {
		var data;
		if (leitner) {
			data = api.evaluateAndVal(args[0]);
			new FlashCard(data, leitner);
		}
	});

	api.defineFunction("movecard", 1, function(args, modifs) {
		if (currentCard) {
			if (api.evaluateAndVal(args[0]).value) {
				currentCard.moveOn();
			} else {
				currentCard.moveBack();
			}
		}
	});

	api.defineFunction("nextcard", 0, function(args, modifs) {
		if (leitner) {
			currentCard = leitner.nextCard();
			return (currentCard) ? currentCard.content : api.nada;
		} else {
			return api.nada;
		}
	});

	api.defineFunction("cardcount", 0, function() {
		if (leitner) {
			return {ctype: 'number', value: {real: leitner.cardCount, imag: 0}}
		} else {
			return api.nada;
		}
	});
	
	api.defineFunction("cardcount", 1, function(args, modifs) {
		if (leitner) {
			var group = api.evaluateAndVal(args[0]);
			if (group.ctype === 'number') {
				group = group.value.real;
				if (0 < group && group <= leitner.groups.length) {
					return {ctype: 'number', value: {real: leitner.groups[group-1].length, imag: 0}};
				}
			} else {
				return api.nada;
			}
			return {ctype: 'number', value: {real: leitner.cardCount, imag: 0}};
		} else {
			return api.nada;
		}
	});
});

}
