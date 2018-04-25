var fractionTranslator = {
	_zahlen: ["null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", 
		"zehn",	"elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn",
		"zwanzig"],
	_brueche: ["REAVERS!", "eintel", "halbe", "drittel", "viertel", "fünftel", "sechstel", "siebtel", "achtel", "neuntel", 
		"zehntel", "elftel", "zwölftel", "dreizehntel", "vierzehntel", "fünfzehntel", "sechzehntel", "siebzehntel", "achtzehntel", "neunzehntel", 
		"zwanzigstel"],
	_powersOf10: ["null", "zehn", "hundert", "tausend"],
	_bruchsuffix: "stel",

	intToWordBelow100: function(i, isDenominator, part){
		if (i < 100) {
			if (i < 21){
				return (isDenominator) ? this._brueche[i] : (!part && i == 1) ? "eins" : this._zahlen[i];
			}
			var einer = i % 10;
			var zehner = i - einer;
			return ((einer > 0) ? this._zahlen[einer] + "und" : "") + this._zahlen[zehner] + ((isDenominator) ? this._bruchsuffix : "");
		} else {
			return i;
		}
	},

	intToWord: function(i, isDenominator){
		var result = "", stelle = (i - (i % 1000))/1000;
		if (i == 0) {
			return this._zahlen[0];
		}

		if (stelle > 0) {
			if (stelle > 999) { return i; }
			if (stelle > 99) {
				result+= this._zahlen[(stelle - (stelle % 100))/100] + this._powersOf10[2];
				stelle = stelle % 100;
			}
			result+= this.intToWordBelow100(stelle, false, true)+this._powersOf10[3];	
		}

		stelle = i % 1000;
		if (stelle > 99) {
			result+= this._zahlen[(stelle - (stelle % 100))/100]+this._powersOf10[2];
			stelle = stelle % 100;
		}
		if (isDenominator) {
			switch (stelle) {
				case 0:
					result+= this._bruchsuffix;
					break;
				case 2:
					result+= (result) ? "zweitel" :  "halbe";
					break;
				default:
					result+= this.intToWordBelow100(stelle, true);
			}
			result = this._capitalize(result);
		} else {
			result+= this.intToWordBelow100(stelle);	
		}
		return result;
	},

	// searches haystack for needle in the first bound elements
	_indexOfBounded: function(haystack, needle, bound) {
		bound = Math.min(bound, haystack.length);
		for (var i = 0; i < bound; i++) {
			if (haystack[i] === needle) 
				return i;
		}
		return -1;
	},

	// tests s vs. the 9 cases "zehn", "zwanzwig", "dreißig", ...
	_quickFindMultipleOfTen: function(s) {
		for (i = 10; i < this._zahlen.length; i+= 10) {
			if (this._zahlen[i] == s) return i;
		}
		return -1;
	},

	wordToIntBelow100: function(s, isDenominator) {
		var result = 0, tmp;
		var i = s.indexOf("und");
		if (i !== -1){ // einerUNDzehner
			// Einer parsen (< 10 !)
			tmp = this._indexOfBounded(this._zahlen, s.slice(0, i), 10);
			if (tmp !== -1) {
				result+= tmp;
			} else {
				return NaN;
			}
			// Zehner parsen
			if (isDenominator) {
				i = this._quickFindMultipleOfTen(s.slice(i + 3, -this._bruchsuffix.length)); // "und".length == 3
			} else {
				i = this._quickFindMultipleOfTen(s.slice(i + 3)); // "und".length == 3
			}
			return (i !== -1) ? result + i : NaN;
		} else { // < 20 or % 10 == 0 
			// Zehner parsen
			if (isDenominator) {
				i = this._quickFindMultipleOfTen(s.slice(0, -this._bruchsuffix.length));
			} else {
				i = this._quickFindMultipleOfTen(s);
			}
			if (i !== -1) {
				return i;
			} else {
				i = this._indexOfBounded(this[isDenominator ? '_brueche' : '_zahlen'], s, 20);
				if (i !== -1) {
					return i;
				} else if (!isDenominator && s === "eins") {
					return 1; 
				} else if (isDenominator && s === "halb") {
					return 2;
				}
			}
			return NaN;
		}
	},

	wordToInt: function(s, isDenominator) {
		s = "" + s;
		s = s.toLowerCase()
			.replace(/\s*und\s*/g, "und")

		var negative = false;

		if (s.substr(0, 6) == "minus ") {
			negative = true;
			s = s.slice(6);
		}

		var result = 0;
		var i = s.indexOf("tausend");
		var tmp;
		if (i !== -1) {
			if (i === 0) {// "[ein]tausend..."
				result+= 1000;
			} else {
				tmp = this.wordToInt(s.slice(0, i));
				if (!isNaN(tmp) && i < 1000) {
					result+= tmp * 1000;
				} else {
					return NaN;
				}
			}
			s = s.slice(i + 7); // "tausend".length == 7
		}
		i = s.indexOf("hundert");
		if (i !== -1) {
			if (i === 0) { // "[ein]hundert..."
				result+= 100;
			} else {
				tmp = this._indexOfBounded(this._zahlen, s.slice(0, i), 10);
				if (tmp !== -1) {
					result+= tmp * 100;
				} else {
					return NaN;
				}	
			}
			s = s.slice(i + 7); // "hundert".length == 7
		}
		if (s.length) {  // noch Zehner und/oder Einer
			if (s.indexOf("und") === 0) { // z.B. "tausendundeins"
				s = s.slice(3); //"und".length == 3
			}
			tmp = this.wordToIntBelow100(s, isDenominator);
			if (!isNaN(tmp)) {
				result+= tmp;
			} else {
				return NaN;
			}
		}
		if (negative) result*= -1;
		return result;
	},

	wordToFloat: function (s) {
		var result, decimals;
		
		s = "" + s;
		s = s.toLowerCase();
		var i = s.indexOf(" komma ");
		if (i !== -1){
			result = this.wordToInt(s.slice(0, i));
			s = s.slice(i + 7); //" komma ".length == 7
			if (s.length) {
				decimals = s.split(" ");
				for (var i = 0; i < decimals.length; i++) {
					result += this.wordToInt(decimals[i]) / Math.pow(10, i+1);
				}
			}
		} else {
			result = this.wordToInt(s);
		}
		return result;
	},

	wordToFraction: function (s){
		var result = new Fraction(), tmp, i = 0, negative = false; 
		
		s = "" + s;
		s = s.toLowerCase()
			.replace(/\s*und\s*/g, "und");

		s = s.split(" ");

		if (s.length) {
			if (s[0] == "minus") {
				negative = true;
				i = 1;
			}
		} else {
			return NaN;
		}
	
		if (s.length == 3 + negative) {
			tmp = parseInt(s[i]) || this.wordToInt(s[i]);
			if (!isNaN(tmp)) {
				i++;
				result.whole = tmp;
			} else {
				return NaN;
			}
		}
		tmp = parseInt(s[i]) || this.wordToInt(s[i]);
		if (!isNaN(tmp)) {
			i++;
			result.enumerator = tmp * ((negative) ? -1 : 1);
		} else {
			if (s.length == 1 + negative){
				if (s[+negative].slice(-7) == "einhalb"){
					tmp = s[+negative].slice(0, -7);
					i = tmp.indexOf("und");
					tmp = (i !== -1 && i === tmp.length - 3) ? this.wordToInt(tmp.slice(0, -3)) : this.wordToInt(tmp);
					if (!isNaN(tmp)) {
						return new Fraction(tmp, 1, 2);
					} else {
						return NaN;
					}
				} else if (s[+negative] == "anderthalb"){
					return new Fraction(1, 1, 2);					
				}
			}
			return NaN;
		}
		if (i < s.length) {
			if (s[i].slice(-3) == "tel" || s[i].slice(-5) == "halbe" || s[i].slice(-4) == "halb"){
				tmp = this.wordToInt(s[i], true);
				return (!isNaN(tmp)) ? result.setDenominator(tmp) : NaN;
			} else {
				return NaN;
			}
		}
		return result;
	},	

	translate: function(f, decimal) { //TODO decimal
		if (typeof f === "string") {
			f = f.trim().toLowerCase();
			if (f.slice(-3) == "tel" || f.slice(-5) == "halbe" || f.slice(-4) == "halb"){
				return this.wordToFraction(f);	
			} else {
				return this.wordToFloat(f);
			}
		} else if (typeof f === "number") {
			if (isInteger(f)){
				return this.intToWord(f);
			} else {
				var tmp = f.toString().split(".");
				if (tmp.length == 2) {
					var result = this.intToWord(parseInt(tmp[0]))
						+ " Komma ";
					for (var i = 0; i < tmp[1].length; i++) {
						result+= this.intToWordBelow100(tmp[1].charAt(i)) 
							+ ((i !== tmp[1].length-1) ? " " : "");
					}
					return result;
				} else {
					return NaN;
				}
			}
		} else {
			if (!isFraction(f)) return f;
			var result;

			if (decimal) {
				f = f.toDecimal();
				result = this.intToWord(f.int);
				if (f.period || f.preperiod) {
					result+= " Komma " + f.preperiod.split('').map(function(v){ 
							return fractionTranslator.intToWordBelow100(v);
						}).join(' ');
					if (f.period) {
						result+= " Periode " + f.period.split('').map(function(v){ 
							return fractionTranslator.intToWordBelow100(v);
						}).join(' ');
					}
					
				}
			} else {
				result = "";
				if (f.whole) {
					result+= (f.whole == 1 && f.enumerator) ? "ein" : this.intToWord(f.whole);
				}
				if (f.enumerator || !f.whole) {
					if (f.whole) result+= " ";
					if (f.enumerator == 1) {
						result+= "ein";
						if (f.denominator == 2) {
							return result + " Halb";
						}
					} else {
						result+= this.intToWord(f.enumerator);
					}
					result+= " " + this._capitalize(this.intToWord(f.denominator, true));
				}
			}
			return result;
		}
	},

	_capitalize: function(s) {
		return s && s.charAt(0).toUpperCase() + s.slice(1);
	},
	
	quasicardinal: function(f) {
		if (!isFraction(f)) return f;
		var result = (f.whole) ? f.whole + " Ganze" + ((f.whole == 1) ? "s " : " " ) : "";

		if (f.enumerator) {
			if (f.whole) result+= " und ";
			result+= f.enumerator + " ";
			result+= (f.enumerator == 1 && f.denominator == 2) ? "Halb" : this._capitalize(this.intToWord(f.denominator, true));
		}
		return result;
		
	}
};
fractionTranslator._zahlen[30] = "dreißig";
fractionTranslator._zahlen[40] = "vierzig";
fractionTranslator._zahlen[50] = "fünfzig";
fractionTranslator._zahlen[60] = "sechzig";
fractionTranslator._zahlen[70] = "siebzig";
fractionTranslator._zahlen[80] = "achtzig";
fractionTranslator._zahlen[90] = "neunzig";
