//extensions to Math {{{

//greatest common divisor
Math.gcd = Math.gcd || function (a, b) {
	if (isNaN(a) || isNaN(b)) return NaN;
	var h;
	while (b != 0) {
		h = a % b;
		a = b;
		b = h;
	}
	return a;
}
//least common multiple
Math.lcm = Math.lcm || function (a, b){
	return Math.abs(a*b) / Math.gcd(a,b);
}

Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
}

//}}}

// conversion functions to Fraction {{{

//Converts a string n into a Fraction-Object using the regexp format as pattern
//supported patterns are "a b/c" and TeX input
function strToFraction(n, format){
	return Fraction.fromString(n, format);
}

Fraction.fromString = function(str, format){
	var result = {};
	var n
	var neg = 1;
	if (format === undefined) {
		if (str.indexOf("\\") !== -1) {
			return texToFraction(n);
		}
		if (str.indexOf("/") === -1) {
			return Fraction.fromNumber(parseFloat(str));
		}
		format = /^\s*(-)?\s*(?:(0|[1-9][0-9]*) )?\s*(?:(0|[1-9][0-9]*)\/([1-9][0-9]*))?\s*$/;// a b/c 
	}
	n = format.exec(str);
	if (n && n[0]) {
		if (n[1] === '-'){
			neg = -1;
		}
		if (n[3] !== undefined && n[4] !== undefined) {
			return new Fraction((n[2]) ? parseInt(n[2]) : 0, neg * parseInt(n[3]), parseInt(n[4]));
		} else if (n[4] !== undefined && n[5] !== undefined) {
			return new Fraction((n[2]) ? parseInt(n[2]) : 0, neg * parseInt(n[5]), parseInt(n[6]));
		} else {
			return new Fraction(n[2] * neg, 0, 1);
		}
	} else {
		return NaN;
	}
}
//Converts a string of a fraction in TeX markup into a Fraction-Object
function texToFraction(t) {
	return Fraction.fromTeX(t);
}
Fraction.fromTeX = function(t){
	return Fraction.fromString(t, /^\s*(-)?\s*(0|[1-9][0-9]*)?\s*(?:\\frac(?:([0-9])([1-9])|\{(0|[1-9][0-9]*)\}\{([1-9][0-9]*)\}))?\s*$/);
}

//Converts a Number into a Fraction-Object
function floatToFraction(f){
	return Fraction.fromNumber(f);
}
Fraction.fromNumber = function(f) {
	if (typeof f !== 'number') {
		f = parseFloat(f);
		if (isNaN(f)) return f;
	}
	if (f % 1 === 0) {
		return new Fraction(parseInt(f), 1);
	} else {
		var tmp = f.toString().split(".");
		if (tmp.length == 2) {
			var e = parseInt(tmp[1]), d = Math.pow(10, tmp[1].length);
			if (tmp[0][0] == "-") e*= -1;
			return new Fraction(parseInt(tmp[0]), e, d).reduce();
		} else {
			return NaN;
		}
	}
}

// }}}

// Fisher-Yates shuffle, courtesy of http://bost.ocks.org/mike/shuffle/
Array.prototype.shuffle = Array.prototype.shuffle || function() {
	var m = this.length, t, i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = this[m];
		this[m] = this[i];
		this[i] = t;
	}

	return this;
}

function range(start, end){
	if (start < end) {
		return Array.apply(null, Array(end-start+1)).map(function (_, i) {return start+i;});
	} else {
		return null;
	} 
}

function MillerRabin(n) {
	//(up to  9.080.191)
	if (n % 2 === 0)
		return false;

	var bases = (n < 1373653) ? [2, 3] :[31, 73];

	// find d,j s.t. n - 1 = j * 2^d;
	var d = 0,
	    j = n - 1;
	while (j % 2 === 0) {
		d++;
		j/= 2;
	}

	var a, p;
	for(var i = 0; i < bases.length; i++) {
		a = bases[i];
		//calculate p = a^d mod n
		p = 1;
		while(d > 0) { //TODO binary exponentation
			p = (p * a) % n;
			d--;
		}
		if (p === 1 || p === n - 1) {
			return true;
		}
		for(var r = 1; r < j; r++) {
			p = p * p % n;
			if (p === n - 1) return true;
		}
	}
	return false;
}

function isPrime(n) {
	var smallPrimes =
		[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113];
	var result = true, 
	    i = 0;
	while(i < smallPrimes.length && smallPrimes[i] < n && result) {
		result = (n % smallPrimes[i] !== 0);
		i++;
	}
	
	return result;	
}

// random {{{

//picks n random numbers between min and max
//taken from The Art of Computer Programming
function randomSelection(n, min, max, shuffled){
	var N , t = 0, m = 0, result;
	if (min > max) {
		t = min; min = max; max = t;
		t = 0;
	} else if (min == max) {
		return Array.apply(null, new Array(n)).map(function(){return min;});
	}
	N = max - min +1;
	if (n >= N) {
		result = range(min, max);
		if (n > N) {
			result = result.concat(randomSelection(n - N, min, max, false));
		}
	} else {
		result = new Array(n);
		while(m < n){
			if ((N - t++) * Math.random() < n - m) {
				result[m++] = t + min - 1;
			}
		}
	}
	if (result && shuffled) result.shuffle();
	return result;
}
//generates a random fraction
Fraction.random = function (options) {
	return Fraction.randomFractions(1, options)[0];
}

//generates amount number of Fractions, configurated by options
//the following properties of option are supported:
//	mode - determining which kinds of fractions to return.
//		Possible values: unit|same enumerator|enumerator-multiples|same denominator|denominator-multiples
//		unrecognised mode default to no restrictions
//	enumeratorMin, enumeratorMax - bounds on the enumerator of the generated fractions
//	denominatorMin, denominatorMax - bounds on the denominator of the generated fractions
//	enumerator
//	denominator
//	proper
//	reduced

Fraction.randomFractions = function(amount, userOptions){
	var result = new Array(amount), denominator, enumerator, denoms, enums, i = 0, options = {};

	var defaultOptions = {
		mode: "normal",
		proper: false,
		reduced: false,
		mayBeEqual: false,
		enumeratorMin: 1,
		enumeratorMax: 50,
		denominatorMin: 2,
		denominatorMax: 25,
	};
	if (userOptions) {
		if (userOptions.enumerator !== undefined) options.enumerator = userOptions.enumerator;
		if (userOptions.enumerators !== undefined) options.enumerators = userOptions.enumerators;
		if (userOptions.denominator !== undefined) options.denominator = userOptions.denominator;
		if (userOptions.denominators !== undefined) options.denominators = userOptions.denominators;

		if (userOptions.proper) {
			if (userOptions.mode === "same enumerator") {
			
			} else if (userOptions.mode === "same denominator") {
				
			}			
		}

		for (var key in defaultOptions) { // set unset options to default
			if (options[key] === undefined) {
				options[key] = (userOptions[key] !== undefined)
					? userOptions[key] 
					: defaultOptions[key];
			}
		}
	} else {
		options = defaultOptions;
	}

	if (amount > 1 && options.mayBeEqual) {
		for (i; i < amount; i++) {
			result[i] = Fraction.random(options);
		}
		return result;
	}

	switch (options.mode) {
		case "unit":
		case "same enumerator":
			if (options.mode == "unit") {
				enumerator = 1;
			} else {
				if (options.enumerator) {
					enumerator = options.enumerator;
				} else if (options.enumerators) {
					enumerator = options.enumerators[Math.floor(Math.random() * options.enumerators.length)];
				} else {
					if (options.proper 
						&& userOptions.denominatorMax 
						&& !userOptions.enumeratorMax) {

						enumerator = options.enumeratorMin
							+ Math.round(Math.random() 
							* (options.denominatorMax-1- options.enumeratorMin))
					} else {
						enumerator = options.enumeratorMin
							+ Math.round(Math.random() 
							* (options.enumeratorMax - options.enumeratorMin));
					}
				}
			}
			if (options.proper) {
				options.denominatorMin = Math.max(enumerator + 1, options.denominatorMin);
				options.denominatorMax = Math.max(options.denominatorMin + amount, 
						options.denominatorMax);
			}

			var denoms = randomSelection(amount, options.denominatorMin, options.denominatorMax, true);
			for (i=0; i < amount; i++) {
				result[i] = new Fraction(enumerator, denoms[i]);
				if (options.reduced) result[i].reduce();
			}
			break;
		case "enumerator-multiples": //TODO
				enumerator = options.enumerator	|| options.enumeratorMin
					+ Math.round(Math.random() * (options.enumeratorMax - options.enumeratorMin)/amount);

			var denoms = randomSelection(amount, options.denominatorMin, options.denominatorMax, true);
			result[0] = new Fraction(enumerator, denoms[0]);
			for (i=1; i < amount; i++) {
				result[i] = new Fraction(enumerator * Math.ceil(Math.random() * (options.enumeratorMax / enumerator)), denoms[i]);
				if (options.reduced) result[i].reduce();
			}
			break;
		case "same denominator":
			if (options.proper) {
				options.denominatorMin = Math.max(amount + 1, options.denominatorMin);
				options.denominatorMax = Math.max(options.denominatorMin, options.denominatorMax);
			}
			if (options.denominator) {
					denominator = options.denominator;
			} else if (options.denominators) {
				denominator = options.denominators[Math.floor(Math.random() * options.denominators.length)];
			} else {
				denominator = options.denominatorMin
					+ Math.round(Math.random() * (options.denominatorMax - options.denominatorMin));
			}
			if (options.proper) {
				options.enumeratorMax = Math.min(denominator - 1, options.denominatorMax);
				options.enumeratorMin = Math.min(options.enumeratorMax - amount + 1, options.enumeratorMin);
			}

			var enums = randomSelection(amount, options.enumeratorMin, options.enumeratorMax, true);
			for (i=0; i < amount; i++) {
				result[i] = new Fraction(enums[i], denominator);
				if (options.reduced) result[i].reduce();
			}
			break;
		case "denominator-multiples": //TODO
			denominator = options.denominator
					|| options.denominatorMin + Math.round(Math.random() * (options.denominatorMax - options.denominatorMin)/amount);
			var enums = randomSelection(amount, options.enumeratorMin, options.enumeratorMax, true);
			result[0] = new Fraction(enums[0], denominator);
			for (i=1; i<amount; i++) {
				result[i] = new Fraction(enums[i], denominator * Math.ceil(Math.random() * (options.denominatorMax / denominator)));
				if (options.reduced) result[i].reduce();
			}
			break;

		default:
			var m = 0, current, i; 

			if (options.enumerators && options.proper) {
				//prepare for properness
				options.enumerators.sort();
			}
			
			while (m < amount && i++ < amount * 5) {
				if (options.denominator) {
					denominator = options.denominator;
				} else if (options.denominators) {
					denominator = options.denominators[Math.floor(Math.random() * options.denominators.length)];
				} else {
					denominator = options.denominatorMin + Math.round(Math.random() 
							* (options.denominatorMax - options.denominatorMin));
				}
				if (options.proper) { // generate only proper fractions
					if (options.enumerator) {
						enumerator = options.enumerator;
					} else if (options.enumerators) {
						for(i = 0; i < options.enumerators.length; i++) {
							if (options.enumerators[i] >= denominator) break;
						}
						enumerator = options.enumerators[Math.floor(Math.random() * i)];
					} else {
						enumerator = options.enumeratorMin 
							+ Math.round(Math.random() 
								* (Math.min(options.enumeratorMax, denominator - 1) - options.enumeratorMin));
					}
				} else {
					if (options.enumerator) {
						enumerator = options.enumerator;
					} else if (options.enumerators) {
						enumerator = options.enumerators[Math.floor(Math.random() * options.enumerators.length)];
					} else {
						enumerator = options.enumeratorMin
							+ Math.round(Math.random() * (options.enumeratorMax - options.enumeratorMin));
					}
				}
				current = new Fraction(enumerator, denominator);
				if (options.reduced) {
					current.reduce();
				}
				
				if (result.every(function(v){ return !v.equals(current); })) {
					result[m++] = current;
				}
			}
	}
	
	return result;
}

// }}}

function Fraction(){
	var tmp = 0;
	this.whole = 0;

	if (arguments.length) {
		if (arguments.length == 1) {
			tmp = arguments[0];
			if (isFraction(tmp)) {
				this.whole = tmp.whole || 0;
				this.enumerator = tmp.enumerator || 0;
				this.denominator = tmp.denominator;
			} else {
				tmp = null;
				switch(typeof arguments[0]) {
					case "number":
						tmp = Fraction.fromNumber(arguments[0]);
						break;
					case "string":
						tmp = Fraction.fromString(arguments[0]);
						break;
					case "object":
						if (arguments[0].constructor === Array) {
							switch(arguments[0].length) {
								case 2:
									this.enumerator = arguments[0][0];
									this.denominator= arguments[0][1];
								break;
								case 3:
									this.whole = arguments[0][0];
									this.enumerator = arguments[0][1];
									this.denominator= arguments[0][2];
								break;
								default:
									this.enumerator = 0;
									this.denominator = 1;

							}
								
						}
						break;
					default:
						this.enumerator = 0;
						this.denominator = 1;
				}
				if (isFraction(tmp)) {
					this.whole = tmp.whole;
					this.enumerator = tmp.enumerator;
					this.denominator = tmp.denominator;
				}
			}
		} else {
			if (arguments.length > 2) {
				tmp = 1;
				this.whole = arguments[0];
			} 
			this.enumerator = arguments[tmp];
			this.denominator = arguments[tmp+1];
		}
	} else {
		this.enumerator = 0;
		this.denominator = 1;
	}
	this.fixSign();
}

// getter/setter {{{

Object.defineProperty(Fraction.prototype, "numerator", {
	get: function(){ return this.enumerator; },
	set: function(newValue){ this.setEnumerator(newValue); }
}); 

Fraction.prototype.setEnumerator = function(to){
	if (isInteger(to)) {
		this.enumerator = to;
	}
	return this;
}
Fraction.prototype.setDenominator = function(to){
	if (isInteger(to)) {
		this.denominator = to;
	}
	return this;
}
Fraction.prototype.setWhole = function(to){
	if (isInteger(to)) {
		this.whole = to;
	}
	return this;
}

// }}}

// conversion functions from Fraction {{{

Fraction.prototype.toFloat = function(){
	this.fixSign();
	return this.whole + this.enumerator/this.denominator;
}
Fraction.prototype.toString = function(){
	this.fixSign();
	var result = "";
	result+= (this.whole) ? this.whole + " " : "";
	if (this.enumerator) {
		if (result && this.enumerator < 0) {
			result+= this.enumerator * (-1) + "/" + this.denominator;
		} else {
			result+= this.enumerator + "/" + this.denominator;
		}
	} else if (!result && this.denominator) {
		result+= "0/" + this.denominator;
	}
	return (result) ? result : "0";
}

Fraction.prototype.toKaTeXString = function(options) {
	if (typeof katex === "object") {
		return katex.renderToString(this.toTeX(options));
	}
}

Fraction.prototype.toTeX = function(options){
	if (!options) options = 0;
	this.fixSign();
	
	var result = '';
	if (options.color){
		result+= "\\color{" + options.color + "} {";
	}
	if (options.decimal) {
		var decimals = this.toDecimal();

		result+= decimals.int;
		if (decimals.period || decimals.preperiod) {
			result+= "{,}" + decimals.preperiod;
			if (decimals.period)
				result+= "\\overline{" + decimals.period + "}";
		}
		if (options.color) result+= "}";
		return result;
	}

	if (this.whole) {
		if (options.wholeColor) {
			result+= "{\\color{" + options.wholeColor + "} " + this.whole + "}";
		} else {
			result+= this.whole;
		}
		result+= "\\,";
	}
	if (this.enumerator) {
		if (!this.whole && this.enumerator < 0) {
			result+= "-";
		}
		result+= "\\frac{";
		if (options.enumeratorColor) {
			result+= "\\color{" + options.enumeratorColor + "}{"
		}
		result+= (this.enumerator < 0) ? this.enumerator * (-1) : this.enumerator;
		if (options.enumeratorColor) result+= "}"
		result+= "}";
		
		result+= "{";
		if (options.denominatorColor) {
			result+= "\\color{" + options.denominatorColor + "}{"
		}
		result+= this.denominator + "}";
		if (options.denominatorColor) result+= "}";

	} else if (!result && this.denominator) {
		if (!options.forceFraction) {
			result+= "0";
		} else {
			result+= "\\frac{";
			if (options.enumeratorColor) {
				result+= "\\color{" + options.enumeratorColor + "}"
			}
			result+= "0}{";
			if (options.denominatorColor) {
				result+= "\\color{" + options.denominatorColor + "}{"
			}
			result+= this.denominator + "}";
			if (options.denominatorColor) result+= "}";
		}
	}
	if (options.color) result+= "}";
	if (result) {
		if (options.delimiter) { 
			result = options.delimiter + result + options.delimiter;
		} else if (options.leftDelimeter && options.rightDelimiter) {
			result = options.leftDelimeter + result + options.rightDelimiter;
		} else if (typeof options === 'string') {
			result = options + result + options;
		}
	} else {
		result+= '0';
	}
	return result;
}

Fraction.prototype.toMathML = function(decimal){//TODO toTeX options
	this.fixSign();
	if (!this.whole && !this.enumerator) return '<math xmlns="http://www.w3.org/1998/Math/MathML"><mn>0</mn></math>';
	
	var result = '<math xmlns="http://www.w3.org/1998/Math/MathML" decimalpoint=",">';

	if (decimal) {
		var decimals = this.toDecimal();

		if (decimals.period) {
			result+= '<mn>' + decimals.int + ',' + decimals.preperiod
				+ '<span style="text-decoration: overline">' + decimals.period + '</span></mn>';	
		} else {
			result+= '<mn>' 
				+ decimals.int 
				+ ((decimals.preperiod) ? ',' + decimals.preperiod : '')
				+ '</mn>';
		}	
	} else {
		if (this.whole) {
			if (this.whole < 0) {
				result+= "<mn><mo>-</mo>" + ((-1) * this.whole) + "</mn> "
			} else {
				result+= "<mn>" + this.whole + "</mn> "
			}
		}
		if (this.enumerator) {
			if (!this.whole && this.enumerator < 0) {
				result+= "<mo>-</mo>";
			}		
			result+= "<mfrac>"
				+ "<mn>" + ((this.enumerator < 0) ? (-1) * this.enumerator : this.enumerator) + "</mn>"
				+ "<mn>" + this.denominator + "</mn></mfrac>";
		}
	}
	return result + '</math>';
}

Fraction.prototype.toDecimal = function(){
	var work = this.clone().properize().reduce();
	var result = {
		"int": work.whole,
		"preperiod": "",
		"period": ""
	};
	if (work.enumerator) {
		var dividend = 10 * ((work.enumerator < 0) ? -work.enumerator : work.enumerator);
		var remainders = [dividend]; //actually, remainders*10
		var periodStart = -1;

		while (dividend) {
			result.preperiod+= Math.floor(dividend / work.denominator);

			dividend = dividend % work.denominator * 10;
			periodStart = remainders.indexOf(dividend);
			
			if (periodStart !== -1) {
				result.period = result.preperiod.slice(periodStart);
				result.preperiod= result.preperiod.slice(0, periodStart);
				break;
			}
			remainders.push(dividend);
		}

	}
	return result;	
}

// }}}

Fraction.prototype.clone = function(){
	return new Fraction(this.whole, this.enumerator, this.denominator);
}

// comparison {{{

Fraction.prototype.is = function(what) {
	return isFraction(what) 
		&& this.whole === what.whole
		&& this.enumerator === what.enumerator
		&& this.denominator === what.denominator;
}

Fraction.prototype.compare = function(to) {
	if (!isFraction(to)) {
		if (!isNaN(to)) {
			to = Fraction.fromNumber(to);
		} else {
			return false;
		}
	}
	var x = to.clone().pullIn().raise(this.denominator).enumerator;
	var y = this.clone().pullIn().raise(to.denominator).enumerator;

	return  +(x < y) || +(x === y) - 1;
}

Fraction.prototype.equals = function(what) {
	return (this.compare(what) === 0);
}

// }}}


// raising/reducing {{{
//
Fraction.prototype.isReduced = function(){
	return Math.gcd(this.enumerator, this.denominator) === 1;
}

Fraction.prototype.isReduceable = function(by) {
	if (by === undefined) {
		return !this.isReduced();
	}

	return (this.enumerator % by === 0) && (this.denominator % by === 0);
}

Fraction.prototype.reduce = function(by){
	if (by === undefined) {
		by = Math.abs(Math.gcd(this.enumerator, this.denominator));
	} else {
		if (!this.isReduceable(by)) {
			return this;
		}
	}
	this.enumerator/= by;
	this.denominator/= by;
	return this;
}

Fraction.prototype.raise = function(by){
	if (isInteger(by)) {
		this.enumerator*= by;
		this.denominator*= by;
	}
	return this;
}

Fraction.prototype.raiseToDenominator = function(newDenominator) {
	if (newDenominator % this.denominator === 0) {
		this.raise(newDenominator / this.denominator);
	}
	return this;
}



Fraction.prototype.getReducers = function(){
	var result = [];
	for (var i = 2; i <= Math.gcd(this.enumerator, this.denominator); i++) {
		if (this.isReduceable(i))
			result.push(i);
	}
	return result;
}

// }}}

Fraction.prototype.pullIn = function() {
	this.fixSign();
	this.enumerator+= this.whole * this.denominator;
	this.whole = 0;
	return this;
}

Fraction.prototype.fixSign = function() {
	if (this.denominator < 0) {
		this.raise(-1);
	}

	if (this.whole && this.enumerator && (this.whole < 0) !== (this.enumerator < 0)) {
		this.whole*= -1;
	}
	return this;
}

Fraction.prototype.isProper = function () {
	return (this.enumerator < this.denominator);
}

Fraction.prototype.properize = function () {
	this.fixSign();
	var w = this.enumerator/this.denominator;
	w = Math[(w < 0) ? 'ceil' : 'floor'](w);
	this.whole+= w;
	this.enumerator-= w * this.denominator;
	return this;
}

// arithmetic {{{

Fraction.prototype.invert = function() {
	this.fixSign().pullIn();
	if (this.enumerator) {
		var tmp = this.denominator;
		this.denominator = this.enumerator;	
		this.enumerator = tmp;
	} 
	return this;
}

Fraction.prototype.add = function(b){
	if (typeof b === 'number') {
		b = Fraction.fromNumber(b);
	}
	if (isFraction(b)){
		var tmp = b.clone().pullIn().raise(this.denominator);
		this.pullIn().raise(b.denominator);
		this.enumerator+= tmp.enumerator;
		this.properize().reduce();
	}
	return this;
}
Fraction.prototype.addTo = function(b){
	if (isFraction(b)) {
		b.add(this);
	} 
	return this;
}

Fraction.prototype.subtract = function(b) {
	if (typeof b === 'number') {
		b = Fraction.fromNumber(b);
	}
	if (isFraction(b)) {
		this.add(b.clone().multiply(-1));
	}
	return this;
}
Fraction.prototype.subtractFrom = function(b) {
	if (isFraction(b)){
		b.subtract(this);
	}
	return this;
}

Fraction.prototype.multiply = function(b) {
	if (typeof b === 'number') {
		b = floatToFraction(b);	
	}
	if (isFraction(b)) {
		this.pullIn();
		this.enumerator *= b.clone().pullIn().enumerator;
		this.denominator *= b.denominator;
		this.properize().reduce();
	}
	return this;
}
Fraction.prototype.multiplyTo = function(b) {
	if (isFraction(b)){
		b.multiply(this);
	}
	return this;
}

Fraction.prototype.divide = function(b) {
	if (typeof b === 'number' && b) {
		b = floatToFraction(b);	
	}
	if (isFraction(b) && !b.equals(0)) {
		this.multiply(b.clone().invert());
	}
	return this;
}
Fraction.prototype.divideTo = function(b) {
	if (isFraction(b)){
		b.devide(this);
	}
	return this;
}

Fraction.prototype.pow = function(e) {
	if (isInteger(e)) {
		this.pullIn();
		if (e < 0) {
			e*= -1;
			this.invert();
		}
		this.enumerator = Math.pow(this.enumerator, e);
		this.denominator = Math.pow(this.denominator, e);
		this.properize().reduce();
	}
	return this;	
}

// }}}

// visualization {{{

Fraction.prototype.visualize = function(userOptions) {
	var defaultOptions = {
		mode: "rectangle",
		color: "#5288bc",
		totalWidth: false,
		totalHeight: false,
		widthOfPiece: 80,
		heightOfPiece: 0,
		margin: 10,
		bar: false,
		autoRaise: true,
		grid: true,
		subpixels: false,
		fillMode: "normal", // || "random"
	};
	var options = {};
	if (userOptions) {
		for (var key in defaultOptions) { // set unset options to default
			options[key] = (userOptions[key] === undefined)
				? defaultOptions[key] 
				: userOptions[key];
		}
	} else {
		options = defaultOptions;
	}


	var work = this.clone().properize(), i, j, result = "", unit;
	var randomcolored = 0;

// {{{ circle
	if (options.mode == "pizza" || options.mode == "circle") {
		var cirows = Math.ceil(Math.sqrt((work.whole + ((work.enumerator) ? 1 : 0))));
		if (!options.totalWidth && !options.totalHeight) {
			unit = (options.heightOfPiece) ? options.heightOfPiece : options.widthOfPiece;
		} else {
			if (options.totalHeight) {
				unit = Math.floor(options.totalHeight / 2 - options.margin);
			} else {
				unit = Math.floor(options.totalWidth / 2 / cirows - options.margin);
			}
		}

		var strokeColor, topping;
		if (options.mode == "pizza") {
			strokeColor = '#c56c00'; 
			options.color = '#ffb963';
			topping = Math.ceil(Math.random() * 10);
			if (topping !== 10) topping = '0' + topping;
			topping = '<defs><pattern id="topping" patternUnits="userSpaceOnUse" width="100" height="100">'
				+ '<image xlink:href="img/randomtopping_' + topping + '.jpg" x="0" y="0" width="100" height="100" />'
				+ '</pattern></defs>';
		} else {
			strokeColor = '#232323'; 
		}

		//center
		var cx, cy;
		cy = unit + options.margin;
		cx = unit + options.margin;

		var circlePoint = function(cx, cy, r, f){
			return (cx + r * Math.cos(2 * Math.PI * f - Math.PI / 2)) + ',' + 
				(cy + r * Math.sin(2 * Math.PI * f - Math.PI / 2));
		};
		
		for (i = 0; i < work.whole; i++) {
			// whole circles
			result+= '<svg style="width: ' + 2 * (unit + options.margin) + 'px; '
				+ 'height: ' + 2 * (unit + options.margin) + 'px;">';
			
			if (options.grid && !(work.denominator == 1)) {	
				for (j = 0; j < Math.max(+options.grid, work.denominator); j++) {
					result+= '<path class="circle-segment" style="stroke: ' 
						+ strokeColor + '; stroke-width: 2; '
						+ 'fill: ' + options.color + '" d="'
						+ 'M ' + cx + ',' + cy + ' '
						+ 'L ' + circlePoint(cx, cy, unit,
							j / Math.max(+options.grid, work.denominator))
						+ ' '
						+ 'A' + unit + ',' + unit + ' 1 0,1 ' 
						+ circlePoint(cx, cy, unit, 
							(j+1)/Math.max(+options.grid, work.denominator)) 
						+ ' '
						+ 'z"></path>';
				}
			} else {
				result+= '<circle cx="' + cx + '" cy="' + cy + '" r="' + unit + '" '
					+ 'style="stroke: ' +  strokeColor + '; stroke-width: 2; fill: ' 
					+ options.color + '"></circle>';
			}
			result+='</svg>';
			if (!options.bar && (i+1) % cirows == 0) {
				result+= '</br>';
			}
		}
		if (work.enumerator || !(work.whole || work.enumerator)) {
			work.whole = 0;
			
			result+= '<svg style="width: ' + 2 * (unit + options.margin) + 'px;'
				+'height: ' + 2 * (unit + options.margin) + 'px;">';
			//fill the circle with white
			result+= '<circle cx="' + cx + '" cy="' + cy + '" r="' + unit
				+ '" style="fill: #fff;"></circle>';
	

			if (options.grid === true) {			
				//draw the segmentations
				for (i = 0; i < work.denominator; i++) {
					result+= '<path class="circle-segment" style="stroke: ' 
						+  strokeColor + '; stroke-width: 1.5;';
					
					if (options.fillMode == "random" 
							&& randomcolored < work.enumerator) {
						result+= ' fill: ';
						if ((work.denominator - i) * Math.random() 
								< work.enumerator - randomcolored) {
							randomcolored++;
							result+= options.color;
						} else {
							result+= 'none';
						}
						result+= ';" d="';
					} else {
						result+= ' fill: ' 
							+ ((i < work.enumerator) ? options.color : 'none')
							+ ';" d="';
					}

					result+= 'M ' + cx + ',' + cy + ' '
						+ 'L ' + circlePoint(cx, cy, unit, i / work.denominator) 
						+ ' '
						+ 'A' + unit + ',' + unit + ' 1 0,1 '
						+ circlePoint(cx, cy, unit, (i+1)/work.denominator) + ' ';
					result+= '"></path>';
				}
			} else {
				//draw the segment of the fraction
				result+= '<path style="fill: ' + options.color + '" d="M' + cx+ ',' + cy 
					+ ' L' + cx + ',' + options.margin + ' ';
				// take the long way if > 1/2,clockwise
				result+= 'A' + unit + ',' + unit +  ' 1 '
					+ +(work.enumerator * 2 > work.denominator) + ',1 ';
				result+= circlePoint(cx, cy, unit, work.toFloat()) + ' z">';
				result+= '</path>';

			}
			
			if (options.grid && options.grid !== true) {
				console.log("gridding");
				for (i = 0; i < options.grid; i++) {
					result+= '<path style="stroke: ' 
						+  strokeColor + '; stroke-width: 1.5; fill: none;" '
						+ 'd="M ' + cx + ',' + cy + ' '
						+ 'L ' 
						+ circlePoint(cx, cy, unit, i / options.grid) 
						+ ' '
						+ 'A' + unit + ',' + unit + ' 1 0,1 '
						+ circlePoint(cx, cy, unit, (i+1)/options.grid)
						+ ' "></path>';

				}
			}
			// draw the border of the circle
			result+= '<circle cx="' + cx + '" cy="' + cy + '" r="' + unit + '" '
				+ 'style="stroke: ' +  strokeColor + '; stroke-width: 2; fill: none"></circle>';	

			result+='</svg>';
		}
// }}}
	} else if (options.mode === "discrete") { // discrete {{{
		if (!options.submode) options.submode = "circles";
		if (work.whole == 0) {
			//defaults todo: missing total, pieces
			if (options.submode == "squares" || options.submode == "circles") {
				if (options.widthOfPiece) {
					options.heightOfPiece = options.widthOfPiece;
				} else if (options.heightOfPiece) {
					options.widthOfPiece = options.heightOfPiece;
				} else {
					options.widthOfPiece = 10;
					options.heightOfPiece = 10;
				}
			}
			result+= '<svg style="width: ' + options.totalWidth + 'px; height: ' + options.totalHeight + 'px;">';

			var filled, x, y, piecePos = [], test;
			
			for(i = 0; i < work.denominator; i++ ) {

				//calculate x,y position
				//
				//get x, s.t. x >= lastX and there is enough room for the remaining work.denominator - i - 1 pieces
				//get y, s.t. the piece will not be too close to any previous piece and there is enough room ...
				//the room problem can be solved via a grid of possible positions, but this removes some randomness
				
				x = Math.round(Math.random() * (options.totalWidth - options.widthOfPiece) + options.widthOfPiece / 2);
				y = Math.round(Math.random() * (options.totalHeight - options.heightOfPiece) + options.heightOfPiece / 2);
				console.log(x + " - " + y);
				test = true;

				test = piecePos.reduce(function(pv, cv) { 
					return pv && (Math.abs(x - cv.x) >= options.widthOfPiece 
								|| Math.abs(y - cv.y) >= options.heightOfPiece); 
				}, true);
				if(!test) {
					i--;
					continue;
				}

				piecePos.push({x: x, y: y});
				
				//do we fill this piece?
				if (options.fillMode == "random") {
					if ((work.denominator - i) * Math.random() < work.enumerator - randomcolored) {
						randomcolored++;
						filled = true;
					} else {
						filled = false;
					}
				} else {
					filled = (i < work.enumerator);
				}
				//draw
				switch (options.submode) {
					case "squares":
					case "rects":
					case "rectangles":
						result+= '<rect x="' + (x - options.widthOfPiece/2) + '"'
							+ ' y="' + (y - options.heightOfPiece/2) + '"'
							+ ' width="' + options.widthOfPiece + '"'
							+ ' height="' + options.heightOfPiece + '"' 
							+ ' style="stroke: #232323;'
							+ ' fill: ' 
							+ ((filled) ? options.color : 'transparent')
							+ ';"></rect>';
						break;
						
					case "circles":
					default:
						result+= '<circle cx="' + x + '" cy="' + y + '"'
							+ ' r="' + options.widthOfPiece/2 + '"'
							+ ' style="stroke: #232323;'
							+ ' fill: ' 
							+ ((filled) ? options.color : 'transparent')
							+ ';"></circle>';
						break;

				
				}
			}

			result+= '</svg>';
		}	
	
// }}}
	} else { // rectangle/chocolate {{{

		if (!options.bar) {
			//find a factor of the denominator close to its square root
			var cols = Math.round(Math.sqrt(work.denominator));
			i = 0;
			while (work.denominator % cols) {
				if (i++ % 2) {
					cols+= i;				
				} else {
					cols-= i;
				}
			}
			var rows = work.denominator / cols;
			// we want landscape
			if (cols < rows) {
				i = cols; cols = rows; rows = i;
			}
			if (options.mode == "chocolate" && options.autoRaise) {
				// no too thin chocolates
				if (rows < 3) {
					return work.raise(4 - rows).visualize(options);
				}		
			}
		} else {
			var cols = work.denominator;
			var rows = 1;
		}
		var filledColumns = Math.floor(work.enumerator / rows);
		var partialColumn = work.enumerator % rows;

		unit = {};
		
		//side-length in px of the rectangle representing 1/denominator
		if (!options.totalWidth) {
			unit.w = options.widthOfPiece;
		} else {
			unit.w = (options.totalWidth 
					/ (work.whole + ((work.enumerator) ? 1 : 0)) - 2 * options.margin) 
				/ cols;
			if (!options.subpixels) unit.w = Math.floor(unit.w);
		}
		var chrows = 1;
	/*	if (options.mode == "chocolate") {
			chrows = Math.ceil(Math.sqrt(rows/cols)*Math.sqrt(work.whole + ((work.enumerator) ? 1 : 0)));
			unit.w = Math.floor((options.totalWidth / chrows - 2 * options.margin) / cols); //TODO fix
		}*/

		if (!options.totalHeight && !options.heightOfPiece) {
			unit.h = unit.w;
		} else {
			if (!options.totalHeight) {
				unit.h = options.heightOfPiece;
			} else {
				unit.h = Math.floor((options.totalHeight - 2 * options.margin) / rows);
			}
		}
		if (options.mode == "chocolate") { // chocolate {{{
			var chocolateColors = {
				"milk": {stroke: '#492b12', light: '#714821', shadow: '#492b12', plain: '#613a18'},
				"dark": {stroke: '#351f0d', light: '#513418', shadow: '#351f0d', plain: '#462a11'},
				"white": {stroke: '#c8a472', light: '#f1d3a8', shadow: '#c8a472', plain: '#d7b88b'}
			};
			
			if (!chocolateColors[options.color]) {
				options.color = 'milk';
			}
			var colors = chocolateColors[options.color];

			var svg = '<svg xmlns="http://www.w3.org/2000/svg" '
				+ 'style="width: ' + (unit.w * cols + options.margin) + 'px; height: ' + (unit.h * rows + options.margin) + 'px; padding-left: ' + options.margin+ 'px; padding-top: ' + options.margin +'px">' 

				+ '<style>.' + options.color + ' .stroked{stroke: ' + colors.stroke + '; stroke-width: 2;} </style>'

				+ '<defs><pattern class="' + options.color + '" id="'+ options.color +'-piece" width="110" height="110" patternUnits="userSpaceOnUse">'
				+ '<rect x="0" y="0" width="110" height="110" style="fill: ' + colors.plain +'"></rect>'
				+ '<rect rx="1" ry="1" x="5" y="5" width="100" height="100" style="fill: '+ colors.light +'" class="stroked"></rect>'
				+ '<path d="M5,5 m0,100 l100,0 l0,-100 z" style="fill: ' + colors.shadow +'"></path>'
				+ '<path d="M5,5 l12.5,12.5" class="stroked"></path>'
				+ '<rect x="17.5" y="17.5" width="77" height="77" style="fill: ' + colors.plain + '" class="stroked"></rect>'
				+ '</pattern></defs>';
			//scaling
			svg+= '<g class="' + options.color + '" transform="scale(' + (unit.w / 110) + ',' + (unit.h / 110) + ')">';
			unit = 110;
			
			for (i = 0; i < work.whole; i++) {
				// whole rectangles
				result+= svg 
					+ '<rect x="0" y="0" style="fill: url(#' + options.color + '-piece)" class="stroked"'
					+ ' width="' + (cols * unit) + '" height="' + (rows * unit)  + '"></rect>'
					+ '</svg>';
				if(options.mode == "chocolate" & (i+1)%cirows===0) {
					result+='</br>';
				}
			}

			if (work.enumerator || !(work.enumerator || work.whole)) {

				result+= svg
					+ '<path style="stroke-dasharray: 11,11;" class="stroked" d="';
				// dash unconvered rows 
				for (i = 0; i <= rows; i++) {
					//draw up to the chocolate
					var end = filledColumns * unit;
					if (i && i <= partialColumn) end+= unit;
										
					// only draw if the chocolate doesn't touch the border
					if (!(i && i <= partialColumn && filledColumns + 1 == cols)) {
						result+= 'M' + (cols * unit - 5.5) + ',' + (i * unit + 2*(i == 0)) + ' ' 
							+ 'L'+ (end + 10) + ',' + (i * unit + 2*(i == 0)) + ' ';//if we draw at y=0, the stroke gets halfed
					}
				}

				i = filledColumns + (filledColumns > 0 && work.enumerator > 0); // paint the left border if needed
				//dash uncovered columns
				for (i; i <= cols; i++) {
					var end = (i == filledColumns+1) ? ((partialColumn) * unit) : 0;
					result+= 'M' + (i * unit + 2*(i == 0)) + ',' + (rows * unit - 5.5) + ' '
						+ 'L'+ (i * unit + 2*(i == 0))+ ',' + (end + 10) + ' '
				}

				result+= '"></path>';

				result+= '<path style="fill: url(#' + options.color + '-piece); stroke-linejoin: round" class="stroked" d="M0,0 ';
				
								
				var breakLine = function(currentX, currentY, length, horizontal, exact){
					var minWidth = 11, maxWidth = 16,
					    variation = 0, tmp, path = "";
					var progress = 0;
					
					while (progress < length - minWidth) {
						tmp = Math.random() * 7;
						//prevent smooth breaks
						variation = (tmp < variation-1.5) ? tmp : tmp + 3;

						progress+= Math.min(minWidth + Math.round(Math.random() * (maxWidth - minWidth)), length - progress);

						if (exact && progress >= length - minWidth) progress = length;
												
						if (horizontal) {
							path+= ' L' + (currentX + progress) + ',' + (variation + currentY - 5);
						} else {
							path+= ' L' + (variation + currentX - 5) + ',' + (currentY - progress); 
						}
					}	
					return path + ' ';
				}
				//move the pen to the bottom and then the number of filled Columns to the right.
				if (filledColumns) {
					result+= 'l0,' + rows * unit + ' '
						+ 'l' + (filledColumns * unit) + ',0 '
		
					//move the pen up in zigzags, until the top or the last piece of the partially filled column is reached
					result+= breakLine(filledColumns * unit, rows * unit, (rows - partialColumn) * unit, false, (partialColumn == 0));
				} else {
					result+= 'l0,' + partialColumn * unit;
				}		
				//zigzag one piece to the right, then to the top
				if (partialColumn){
					result+= breakLine(filledColumns * unit, partialColumn * unit, unit, true);
					if (filledColumns+1 < cols) {
						result+= breakLine((filledColumns + 1) * unit, partialColumn * unit, partialColumn * unit, false, true);
					} else {
						result+= 'L' + cols * unit + ',' + partialColumn * unit + ' '
							+ 'l0,-' + partialColumn * unit + ' ';
					}
				}

				result+= ' z"></path></g></svg>';
			}// }}} 
		} else { // rectangle {{{

			var css = "display: inline-block; margin: " + options.margin + "px;"
				+ " width: " + (unit.w * cols + 2) + "px;"
				+ " height: " + (unit.h * rows + 2) + "px;"; //+2 for border

			if (options.grid) {
				css+= " background: ";
				//vertical lines
				css+= "linear-gradient(0deg, #232323 2px, transparent 2px) 0 2px / " 
					+ unit.w + "px " + unit.h + "px repeat, ";
				//horizontal lines
				css+= "linear-gradient(90deg, #232323 2px, transparent 2px) 0 0 / "
					+ unit.w + "px " + unit.h + "px repeat,";
			} else {
				css+= " border: 2px solid #232323; background: ";
			}

			for (i = 0; i < work.whole; i++) {
				// whole rectangles
				result+= '<div class="visualization" style="' + css + ' '
					+ options.color + '"></div>';
			}

			var singleFill = function(i){
				return "linear-gradient(90deg, " + options.color + ", " + options.color + ") "
					+ ((i % cols) * unit.w) + "px " + (Math.floor(i/cols) * unit.h) + "px / " 
					+ unit.w + "px " + unit.h + "px no-repeat,"
			}

			if (work.enumerator) {
				if (options.fillMode == "random") {
					for (i = 0; i < work.denominator; i++) {
						if ((work.denominator - i) * Math.random() < work.enumerator - randomcolored) {
							randomcolored++;
							css+= singleFill(i);
						} 
					}
				} else if (options.fillMode.constructor === Array) {
					if (options.fillMode.length < work.enumerator) {
						console.log("Your visualization is missing entries!");
					}
					options.fillMode.forEach(function(cv) {
						css+= singleFill(cv);
					});					
				} else {
					//fill columns that are covered totally with a horizontal gradient with color stop at the fullColumn
					if (filledColumns) {
						css+= "linear-gradient(90deg, " + options.color + " " + 100 * filledColumns / cols + "%, " +
							"transparent " + 100 * filledColumns / cols + "%)";
						css+= " 0 0 / 100% 100% no-repeat,"; //position / size 
					} 
					//fill partial filled column with a vertical gradient filling from top
					if (partialColumn){
						css+= "linear-gradient(180deg, " + options.color + " " + 100 * partialColumn / rows + "%, " +
							"transparent " + 100* partialColumn / rows + "%)";
						css+= " "+ (filledColumns * unit.w) + "px 0 / " + unit.w + "px 100% no-repeat,"
					}
				}
				result+= '<div class="visualization" style="' + css + ' #fff;"></div>';
			} else if (!work.whole) {
				//empty rect
				result+= '<div class="visualization" style="' + css + ' #fff;"></div>';

			}
		}
	}
	return result;
}
// }}}
// }}}

// numberline {{{

Fraction.prototype.numberline = function(userOptions) {
	var defaultOptions = {
		start: 0,
		end: 0,
		division: 0,
		labels: 0,
		grid: 0,
		width: 500,
		height: 28,
		color: '#0C5AA6',
		reduceLabels: false,
		labelSize: "0.8em",
		labelStart: true,
		labelEnd: true,
		label: [],
		tickStart: true,
		tickEnd: true,
		tickHeight: '75%',
		labelTickHeight: '100%',
		decimal: false,
		marker: "triangle", // "circle" || "tick" || "triangle" || // "rhombus"

		_exposeInternal: false,
	};
	var options = {};
	if (userOptions) {
		for (var key in defaultOptions) { // set unset options to default
			options[key] = (userOptions[key] === undefined) ? defaultOptions[key] : userOptions[key];
		}
	} else {
		options = defaultOptions;
	}

	if (!options.division) {
		options.division = this.denominator;
	}
	if (options.labels > options.division || (options.labels > 1 && Math.gcd(options.labels, options.division) == 1)) {
		options.labels = options.division;
	}	
	options.end = (!options.end) ? new Fraction(this.clone().properize().whole + 1, 1) : new Fraction(options.end); 
	options.start = new Fraction(options.start);

	if (options.start.compare(options.end) !== -1)
		options.start = new Fraction(this.clone().properize().whole, 1);


	var coverage = options.end.clone().subtract(options.start).pullIn();
	var multiple = coverage.enumerator * options.division;
	multiple*= (options.grid) ? options.grid : 1;
//	options.width -= (options.width % multiple); //no subpixel positions of labels or lines
	var unit = options.width * coverage.denominator / (coverage.enumerator * options.division);
//	unit = Math.round(options.width / (coverage.toFloat() * options.division));
	var labelunit = unit * options.division / options.labels;
	var offset = Math.round(unit/3);
	
	var firstDivision = new Fraction(Math.floor(options.start.toFloat() * options.division), options.division); 

	var fractionToPos = function(f, u) {
		if (u === undefined) u = unit;
		return Math.round(f.clone().subtract(options.start).multiply(u * options.division).toFloat() + offset);
	};
	var posToFraction = function(p) {
		return options.start.clone().add(new Fraction((p - offset-1), unit * options.division));
	};


	var result = '<div class="numberline" style="position: relative; width: ' + (options.width + offset + 4) + 'px;'
		+'margin: calc(2*' + options.labelSize + ' + 12px); text-align: left;">';

	result+= '<div class="nl_line" style="position: relative; height: ' + options.height + 'px; '
		+ 'background: linear-gradient(180deg, #4e4e4e 2px, transparent 2px) 0 ' + (options.height-2)/2 + 'px,';

	if (options.tickStart && options.division % options.start.denominator !== 0) {
		result+= 'linear-gradient(90deg, #4e4e4e 2px, transparent 2px) ' + (offset) + 'px center/ 100% ' + options.tickHeight + ' no-repeat,';
	}

	if (options.tickEnd && options.division % options.end.denominator !== 0) {
		result+= 'linear-gradient(90deg, #4e4e4e 2px, transparent 2px) ' + fractionToPos(options.end) + 'px center'
			+ ' / 100% ' + options.tickHeight + ' no-repeat,';
	}
	//Divisions
	result+= ' linear-gradient(90deg, #4e4e4e 2px, transparent 2px) ' + fractionToPos(firstDivision) + 'px center'
		+'/' + unit + 'px ' + options.tickHeight + ' repeat-x';

	if (options.labels && options.tickHeight !== options.labelTickHeight){
		result+= ', linear-gradient(90deg, #4e4e4e 2px, transparent 2px) ' + fractionToPos(firstDivision) + 'px center'
		+'/' + labelunit + 'px ' + options.labelTickHeight + ' repeat-x';
	}
	
		
	result+= ';"></div>';
	//Grid
	if (options.grid) {
		result+= '<div class="nl_grid" style="position: absolute; top: 50%;  left: 0.5px;'
			+' transform: translateY(-50%); -webkit-transform: translateY(-50%);'
			+ 'width: calc(100% + ' + offset +'px); height: calc(' + options.height + 'px + 4*' + options.labelSize + ' - 1px);'
			+ 'background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px) 0 '
			+ 'calc(50% + ' + (unit * options.division) / options.grid/2 + 'px)'
			+ ' / 100% ' + (unit * options.division) / options.grid + 'px,'
			+ 'linear-gradient( 90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px) ' + (offset) + 'px 0' 
			+ ' / ' + (unit * options.division) / options.grid + 'px 100%;"></div>';
	}

	
	//Arrow
	result+= '<div style="position: absolute; font-size: 18px; color: #4e4e4e; height: ' + options.height +'px; top: 1px;'
		+ 'width: ' + offset + 'px; right: -' + offset +'px;'
		+ 'background: linear-gradient(180deg, #4e4e4e 2px, transparent 2px) 0 ' + ((options.height-2)/2-1) + 'px">'
		+ '<span style="position: absolute; top: calc(50% - 7px); left: ' + offset + 'px; width: 0; height: 0;'
			+ 'border-top: 6px solid transparent; border-bottom: 6px solid transparent;'
			+ 'border-left: 12px solid #4e4e4e; border-right: 12px solid transparent;"></span>'
		+ '</div>';

	//Marker
	var markerWidth = Math.min(unit, options.height);
	var markerCss = 'transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); top: 50%;';
	switch(options.marker) {
		case "circle":
			markerCss+= 'width: ' + markerWidth/2 + 'px; height: ' + markerWidth/2 + 'px; line-height: ' + markerWidth/2 + 'px;'
				+ ' border-radius: 100%; background-color: ' + options.color + ';'
			break;
		case "triangle":
			markerWidth-= markerWidth % 6;
			markerCss+= 'width: 0; height: 0; margin-top: -1px;'
				+ 'border-top: ' + markerWidth/2 + 'px solid ' + options.color + ';'
				+ 'border-bottom: ' + markerWidth/2 + 'px solid transparent;'
				+ 'border-left: ' + markerWidth/3 + 'px solid transparent;'
				+ 'border-right: ' + markerWidth/3 + 'px solid transparent;';
			break;
		default:
			markerCss+= 'width: 2px; height: ' + options.tickHeight + '; background-color: ' + options.color + ';';
	}
	result += '<span style="left: ' + (fractionToPos(this) + 1) + 'px; position: absolute; display: block;' 
		+ markerCss + '" class="nl_marker"></span>';


	// Labels
	var labelCss = 'position: absolute; display: block; transform: translateX(-50%); -webkit-transform: translateX(-50%);'
		+ 'font-size: ' + options.labelSize;
	var currentLabel, pos, step, lastPos;

	if (options.labelStart) {
		result += '<span class="nl_label" style="left: ' + (1 + offset) + 'px; ' + labelCss + '">' 
			+ options.start.clone().properize()[(typeof katex === "object") ? 'toKaTeXString' : 'toMathML']({decimal: options.decimal})
			+ '</span>';
	}
	if (options.labelEnd) {
		result += '<span class="nl_label" style="left: '
			+  Math.round(coverage.clone().multiply(unit * options.division).toFloat() + offset + 1) + 'px; ' + labelCss + '">' 
			+ options.end.clone().properize()[(typeof katex === "object") ? 'toKaTeXString' : 'toMathML']({decimal: options.decimal})
			+ '</span>';
	} 

	options.label.forEach(function(v) {
		if (!isFraction(v)) v = new Fraction(v);
		result += '<span class="nl_label" style="left: ' + (fractionToPos(v) + 1) + 'px; ' + labelCss + '">' 
			+ v.clone().properize()[(typeof katex === "object") ? 'toKaTeXString' : 'toMathML']({decimal: options.decimal})
			+ '</span>';

	});

	if (options.labels > 0) {
		currentLabel = new Fraction(Math.floor(options.start.toFloat() * options.labels), options.labels);
		pos = fractionToPos(currentLabel) + 1;
		step = new Fraction(1, options.labels);	
		lastPos = new Fraction(Math.floor(options.end.toFloat() * options.labels), options.labels);
		
		pos+= labelunit;
		lastPos = fractionToPos(lastPos) + 1;
		
		if (options.labels % options.end.denominator === 0) {
			lastPos-= 2; // this prevents the doubling of the end value
		}
		
		while (pos <= lastPos) {
			currentLabel.add(step); //this reduces, so...
			if (!options.reduceLabels) 
				currentLabel.raiseToDenominator(options.labels);
			result += '<span class="nl_label" style="left: ' + pos + 'px; ' + labelCss + '">' 
				+ ((typeof katex === "object") 
						? currentLabel.toKaTeXString({decimal: options.decimal}) 
						: currentLabel.toMathML({decimal: options.decimal})		
				)
				+ '</span>';
			pos+= labelunit;
		}
	}
	
	if (!options._exposeInternal) {
		return result + '</div>';
	} else {
		return {
			HTML: result + '</div>',
			options: options,
			coverage: coverage,
			unit: unit,
			labelUnit: labelunit,
			labelCss: labelCss,
			markerCss: markerCss,
			offset: offset,
			fractionToPos: fractionToPos,
			posToFraction: posToFraction,
		};
	}
}

// }}}
// }}}

// checks {{{

function isFraction(f) {
	return f 
		&& (f.denominator !== undefined && isInteger(f.denominator))
		&& (f.enumerator  !== undefined && isInteger(f.enumerator));
}
function isMixed(f) {
	return isFraction(f) && f.whole;
}
function isInteger(i){
	return (typeof i === 'number' && (i % 1) === 0);
}
function isFloat(i) {
	return (typeof i === 'number' && (i % 1) !== 0);
}

// }}}

// Cindy interface {{{

if (typeof createCindy === 'function' && createCindy.registerPlugin) {

	Fraction.prototype.toCindyObject = function() {
		var tmp = this.clone().pullIn();

		return {
			ctype : "list",
			value: [
				{ctype: "number", value: {real: tmp.enumerator, imag: 0}},
				{ctype: "number", value: {real: tmp.denominator, imag: 0}}
			]
		};

	}

	createCindy.registerPlugin(1, "Fractions", function(api) {

		function cdy2js(obj){
			var tmp;
			tmp = api.evaluateAndVal(obj);
			switch (tmp.ctype) {
				case "number":
					tmp = tmp.value.real;
					break;
				case "list":
					tmp = {ctype: "", value: tmp.value.map(cdy2js)};
				default:
					tmp = tmp.value;
			}
			return tmp;
		}

		api.defineFunction("randomfraction", 1, function(args, modifs) {
			var options = {}, result, amount;
			for (var key in modifs) { 
				options[key] = cdy2js(modifs[key]);

			}
			amount = api.evaluateAndVal(args[0]);
			amount = (amount.ctype == "number") ? amount.value.real : 1;
			result = Fraction.randomFractions(amount, options).map(function(cv) {
				return cv.toCindyObject();
			});
			return (amount === 1) ? result[0] : {ctype: "list", value: result};
		});
	});

}

// }}}
