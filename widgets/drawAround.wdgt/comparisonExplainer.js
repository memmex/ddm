Fraction.explainComparison = function(a, b, colors){

	if (colors === undefined) {
		colors = [color(0), color(1)];
	}

	var result = a.compare(b);
	var x,y;
	var mode;
	var msg, tmp;
	if (result === 1) {
		x = b.clone();
		y = a.clone();
	} else {
		x = a.clone();
		y = b.clone();
	}
	// it is x <= y.
	
	var xP = x.clone().properize();
	var yP = y.clone().properize();
	var xNP = x.clone().pullIn();
	var yNP = y.clone().pullIn();
	var xR = x.clone().reduce();
	var yR = y.clone().reduce();
	var xN, yN;

	var lcmd = Math.lcm(y.denominator, x.denominator);
	var wop  = Math.floor((800 / (yP.whole + ((!!yP.enumerator) ? 1 : 0)) - 20) / lcmd);
	var xWOP = wop * lcmd / x.denominator;
	var yWOP = wop * lcmd / y.denominator;

	var xV = x;
	var yV = y;

	var grid = true;

	if (xWOP === 0 || yWOP === 0) {
		var grid = false;
		var lcmd = Math.lcm(yR.denominator, xR.denominator);
		var wop  = Math.floor((800 / (yP.whole + ((!!yP.enumerator) ? 1 : 0)) - 20) / lcmd);
		var xWOP = wop * lcmd / xR.denominator;
		var yWOP = wop * lcmd / yR.denominator;

		xV = xR;
		yV = yR;
	}
	if (xWOP === 0 || yWOP === 0) {
		xV = false;
		yV = false;
	}
	
	var texOpts = {
		x: {delimiter: '$', color: colors[0]},
		y: {delimiter: '$', color: colors[1]},
	};

	//totalWidth: Math.floor(800 / (yP.whole + +!!yP.enumerator) * (xP.whole + +!!xP.enumerator)), 

	mode = (x.denominator <= 12 && y.denominator <= 12) ? "circle" : "rectangle";

	// comp with 0 {{{
	// x < 0, y > 0.
	if (x.fixSign().enumerator < 0 && y.fixSign().enumerator > 0) {
		return "<p>Am Vorzeichen sieht man sofort, dass " + x.toTeX('$') 
			+ "<strong>kleiner</strong> als Null ist und "
			+ y.toTeX('$') + " <strong>größer</strong> als Null.</p>"
			+ "<p>Ist ist also $" + x.toTeX() + " < 0 < " + y.toTeX() + "$, und daher</p>"
			+ "$$" + a.toTeX() + " " + ((result == 1) ? ">" : "<") + " " + b.toTeX() + "\\,.$$";
	}
	
	// x = 0
	if (xP.whole == 0 && x.enumerator == 0) {
		if (result === 0) {
			return "<p>Beide Zahlen sind Null, also gleich.</p>"	
		} else {
			return "<p>Am Vorzeichen sieht man sofort, dass " + y.toTeX('$')
				+ " größer ist als 0.</p>";
		}
	}
	// y = 0
	if (yP.whole == 0 && y.enumerator == 0) {
		return "<p>Am Vorzeichen sieht man sofort, dass " + x.toTeX('$') + " kleiner ist als 0.</p>";
	}
	// }}}
	
	// x = y TODO {{{
	if (result === 0) {
		msg = "";
		if (x.denominator == y.denominator) {
			return "<p>Die Brüche " + a.toTeX('$') + " und " + b.toTeX('$') 
				+ " haben den gleichen Zähler und den gleichen Nenner.</p>"
				+ "<p>Sie sind also gleich.</p>";
		}

		// x,y natural
		if (xP.enumerator === 0) {
			if (xP.whole !== x.whole || yP.whole !== y.whole) {
				msg = "<p>Geschrieben als gemischte Zahl ist $"
				if (xP.whole !== x.whole) {
					msg+= x.toTeX() + " = "	+ xP.toTeX();
					tmp = true;
				}
				if (yP.whole !== y.whole) {
					if (tmp) msg+= "\\quad\\text{ und }\\quad";
					msg+= y.toTeX() + " = "	+ yP.toTeX();
				}
				msg+= "\\,.$</p>";
			}
			return msg
				+ "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + x.toTeX('$') 
				+ "</span>"
				+ xV.visualize({mode: "rectangle", bar: true, subpixels: false, grid: grid,
					color: colors[0], widthOfPiece: xWOP, totalHeight: 100}) 
				+ "</div>"
				+ "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + y.toTeX('$')
				+ "</span>"
				+ yV.visualize({mode: "rectangle", bar: true, subpixels: true,
					color: colors[1], widthOfPiece: yWOP, totalHeight: 100})
				+ "</div>"
				+ "<p>Die beiden Brüche sind also gleich.</p>";
		}

		tmp = x.denominator % y.denominator;
		if (tmp === 0 || y.denominator % x.denominator === 0) {
			if (tmp === 0) {
				tmp = x.denominator / y.denominator;
				return "<p>Wir können " + y.toTeX('$') + " mit $" + tmp + "$ erweitern," 
					+ " um zu sehen, dass beide Brüche gleich sind:</p>"
					+ "$$" + y.toTeX()
					+ "\\;{\\tiny\\begin{matrix}\\tiny"
					+ tmp
					+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"
					+ x.toTeX()
					+ "$$";
			} else {
				tmp = y.denominator / x.denominator;
				
				return "<p>Wir können " + x.toTeX('$') + " mit $" + tmp + "$ erweitern," 
					+ " um zu sehen, dass beide Brüche gleich sind:</p>"
					+ "$$" + x.toTeX()
					+ "\\;{\\tiny\\begin{matrix}\\tiny"
					+ "\\color{" + color("blue") + "}{" + tmp + "}"
					+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"
					+ " = " + y.toTeX()
					+ "$$";		
			}
		}

		if (!x.isReduced() || !y.isReduced()) {
				
		} else {
			msg = "";
		}
		var lce = Math.lcm(x.enumerator, y.enumerator);
		x.toLCE = lce / x.enumerator;
		y.toLCE = lce / y.enumerator;

		var lcd = Math.lcm(x.denominator, y.denominator);
		x.toLCD = lcd / x.denominator;
		y.toLCD = lcd / y.denominator;



		if (x.toLCE * (x.enumerator + x.denominator) + y.toLCE * (y.enumerator + y.denominator) 
			< x.toLCD * (x.enumerator + x.denominator) + y.toLCD * (y.enumerator + y.denominator) ) {
			//make the enumerators equal
			return "<p>Beim Erweitern von Brüchen ändert sich der Wert nicht."
				+ " Wir können die Brüche also beliebig erweitern und anschließend vergleichen, "
				+ "um die Augabe zu lösen.</p>"
				+ "<p>Wenn wir "
				+ ((x.toLCE > 1) ? x.toTeX('$') + " mit $" + x.toLCE + "$ erweitern " : "") 
				+ ((x.toLCE > 1 && y.toLCE > 1) ? " und " : "")
				+ ((y.toLCE > 1) ? y.toTeX('$') + " mit $" + y.toLCE + "$ erweitern" : "")
				+ ", erhalten wir die folgenden zwei Brüche zum Vergleich: "
				+ x.raise(x.toLCE).toTeX('$') + " und " + y.raise(y.toLCE).toTeX('$') + ".</p>"
				+ Fraction.explainComparison(x, y, colors)
		} else {
			//make the denominators equal

			return "<p>Beim Erweitern von Brüchen ändert sich der Wert nicht."
				+ " Wir können die Brüche also beliebig erweitern und anschließend vergleichen, "
				+ "um die Augabe zu lösen.</p>"
				+ "<p>Wenn wir "
				+ ((x.toLCD > 1) ? x.toTeX('$') + " mit $" + x.toLCD + "$ erweitern " : "") 
				+ ((x.toLCD > 1 && y.toLCD > 1) ? " und " : "")	
				+ ((y.toLCD > 1) ? y.toTeX('$') + " mit $" + y.toLCD + "$ erweitern" : "")
				+ ", erhalten wir die folgenden zwei Brüche zum Vergleich: " 
				+ x.raise(x.toLCD).toTeX('$') + " und " + y.raise(y.toLCD).toTeX('$') + ".</p>"
				+ Fraction.explainComparison(x, y, colors)
		}
		

	}
	// }}}

	// x < y (positive)
	if (x.enumerator > 0) { 
		
	// easiest case of comparison by reference : x < 1, y > 1. {{{
	if (x.whole === 0 && y.whole === 0 && x.enumerator < x.denominator && y.enumerator > y.denominator) {
		var tmp = "\\color{" + color("green") +"}{1}";
		msg =  "<p>Bei " + x.toTeX(texOpts.x)
			+ " ist der Zähler <strong>kleiner</strong> als der Nenner."
			+ " Der Bruch ist also <strong>kleiner</strong> als $" + tmp + "$.</p>"
			+ "<table style=\"margin: auto\"><tbody>";
		if (xV !== false) {	
			msg+= "<tr>"
				+ "<td style=\"width: 3em;\">" + x.toTeX('$') + "</td>"
				+ "<td style=\"text-align: left;\">"
				+ xV.visualize({mode: "rectangle", subpixels: false, grid: grid, bar: true,
					color: colors[0], widthOfPiece: xWOP, totalHeight: 100})
				+ "</td></tr>";
		}
		msg+= "<tr><td colspan=\"2\"><p>"
			+ "Bei " + y.toTeX(texOpts.y) 
			+ " ist der Zähler <strong>größer</strong> als der Nenner."
			+ " Der Bruch ist also <strong>größer</strong> als $" + tmp + "$.</p>"
			+ "</td></tr>";
		if (yV !== false) {
			msg += "<tr>"
				+ "<td style=\"width: 3em;\">" + y.toTeX('$') + "</td>"
				+ "<td style=\"text-align: left;\">"
				+ yV.visualize({mode: "rectangle", subpixels: false, grid: grid, bar: true,
					color: colors[1], widthOfPiece: yWOP, totalHeight: 100})
				+ "</td></tr>";
		}
	 	return msg
			+ "</tbody></table>"
			+ "<p>Es ist also $" + x.toTeX({color: colors[0]})
			+ " < " + tmp + " < " + y.toTeX({color: colors[1]}) + "$, und daher</p>"
			+ "$$" + x.toTeX({color: colors[0]}) + " < " 
			+ y.toTeX({color: colors[1]}) + "\\,.$$";
	}
	// }}}

	// same enumerator {{{
	if (x.whole === 0 && y.whole === 0 && x.enumerator == y.enumerator) {
		msg = "<p>Die Brüche " + a.toTeX({delimiter: '$', enumeratorColor: color('green', 3)})
			+ " und " + b.toTeX({delimiter: '$', enumeratorColor: color('green', 3)})
			+ " haben den gleichen Zähler.</p>"
			+ "<p>Von zwei Brüchen mit gleichen Zähler ist derjenige <strong>kleiner</strong>,"
			+ " der den <strong>größeren</strong> Nenner hat: "
			+ "In je mehr Teile das Ganze geteilt wird, desto kleiner sind die einzelnen Teile."
			+ "</p>";
		//	+ "<p>Die Anzahl der Teile, die jeweils vom Ganzen genommen werden,"
		//	+ " ist also gleich.<br/>"
		//	+ "Es kommt also auf die Größe der Teile an.</p>"
		//	+ "<p>Der Nenner gibt an, in wie viele Teile das Ganze geteilt wird.<br/>"
		//	+ "</p>"

		if (xV !== false) {
			msg+= "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + x.toTeX('$') 
				+ "</span>"
				+ xV.visualize({mode: "rectangle", subpixels: false, grid: grid, bar: true,
					color: colors[0], widthOfPiece: xWOP, totalHeight: 100})
				+ "</div>";
		}
		if(yV !== false) {
			msg+= "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + y.toTeX('$') 
				+ "</span>"
				+ yV.visualize({mode: "rectangle", bar: true, subpixels: false, grid: grid,
					color: colors[1], widthOfPiece: yWOP, totalHeight: 100})
				+ "</div>";
		}
		return msg
			+ "<p>Weil $" + x.denominator + "$ größer als $" + y.denominator + "$ ist, ist also"
			+ "</p>"
			+ "$$" + x.toTeX({color: colors[0]}) + " < " + y.toTeX({color: colors[1]}) + "\\,.$$";
	}
	// }}}

	// same denominator {{{
	if (x.denominator == y.denominator) {
		msg = "<p>Die Brüche "  + a.toTeX({delimiter: '$', denominatorColor: color('green', 3)})
			+ " und " + b.toTeX({delimiter: '$', denominatorColor: color('green', 3)}) 
			+ " haben den gleichen Nenner.</p>"
			+ "<p>Die Größe der Teile, die jeweils vom Ganzen genommen werden, ist also gleich."
			+ " Daher kommt es nur darauf an, wie viele genommen werden. Das gibt der Zähler an."

		xN = x.clone().pullIn();
		yN = y.clone().pullIn();
		
		if (x.whole !== 0 || y.whole !== 0) {
			msg+= "<p>Um die Zähler vergleichen zu können,"
				+ " müssen wir die gemischten Zahlen in unechte Brüche umwandeln:<br/>";

			
			if (x.whole !== 0) {
				msg+= "$" + x.toTeX() + "=" + xN.toTeX() + "$";	
			}
			if (y.whole !== 0) {
				if (x.whole !== 0) msg+= " und ";
				msg+= "$" + y.toTeX() + "=" + yN.toTeX() + "$";	
			}
			msg+= "</p>";
		}
	
		if (xV !== false) {
			msg+= "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + x.toTeX('$') 
				+ "</span>"
				+ xV.visualize({mode: "rectangle", subpixels: false, grid: grid,
					color: colors[0], totalWidth: 800, 
					totalHeight: isPrime(x.denominator) ? 100 : 125}) 
				+ "</div>";
		}

		if (yV !== false) {
			msg+= "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + y.toTeX('$') 
				+ "</span>"
				+ yV.visualize({mode: "rectangle", subpixels: false, grid: grid,
					color: colors[1], totalWidth: 800,
					totalHeight: isPrime(x.denominator) ? 100 : 125}) 
				+ "</div>";
		}
			
		return msg
			+ "<p>Weil $" + xN.enumerator + "$ kleiner als $" + yN.enumerator + "$ ist, ist also"
			+ "</p>"
			+ "$$" + x.toTeX({color: colors[0]}) + " < " + y.toTeX({color: colors[1]}) + "\\,.$$";
	}

	// }}}

// compare by distance to 1 {{{
	if (xP.whole === 0 && yP.whole === 0 &&
		x.enumerator + 1 === x.denominator && y.enumerator + 1 === y.denominator) {
		
		msg = "<p>Bei "
			+ x.toTeX(texOpts.x) + " fehlt $\\frac{1}{" + x.denominator + "}$ zu einem Ganzen." 
			+ "</p>";

		if (xV !== false) {
			msg+= "<div>"
			+ "<span style=\"display: inline-block; width: 3em;\">" + x.toTeX('$') + "</span>"
			+ xV.visualize({mode: "rectangle", subpixels: false, grid: grid, bar: true, 
				color: colors[0], widthOfPiece: xWOP, totalHeight: 100})
			+ "</div>";
		}

		msg+= "<p>Bei " 
			+ y.toTeX(texOpts.y) + " fehlt $\\frac{1}{" + y.denominator + "}$ zu einem Ganzen.";

		if (yV !== false) {
			msg+= "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + y.toTeX('$') 
				+ "</span>"
				+ yV.visualize({mode: "rectangle", bar: true, subpixels: false, grid: grid,
					color: colors[1], widthOfPiece: yWOP, totalHeight: 100})
				+ "</div>";
		}
		
		return msg
			+ "<p>Weil $\\frac{1}{" + x.denominator + "}$" 
			+ " größer als $\\frac{1}{" + y.denominator + "}$ ist, ist also</p>"
			+ "$$" + x.toTeX({color: colors[0]}) + " < " + y.toTeX({color: colors[1]}) 
			+ "\\,.$$";
	}
// }}}

	// comparison case: x < 1/2, y > 1/2.  {{{
	if ((xP.whole === 0 && yP.whole === 0) 
		&& (2 * x.enumerator <= x.denominator && 2 * y.enumerator >= y.denominator)
		&& !( (x.enumerator === 1 && x.denominator === 2) 
			|| (y.enumerator === 1 && y.denominator === 2) )) {
		tmp = "\\color{#008077}{\\frac12}";
		return "<p>Es ist $" + x.toTeX({color: colors[0]}) 
			+ ((2 * x.enumerator === x.denominator) ? " = " : " < ")
			+ tmp + "$ und $"
			+ y.toTeX({color: colors[1]})
			+ ((2 * y.enumerator === y.denominator) ? " = " : " > ")
			+ tmp + "$:"
			+ "<table style=\"margin: auto\"><tbody><tr>"
			+ "<td style=\"padding: 0 15px;\">"
			+ xV.visualize({mode: "circle", subpixels: true, color: colors[0], totalHeight: 200})
			+ "</td><td style=\"padding: 0 15px\">"
			+ yV.visualize({mode: "circle", subpixels: true, color: colors[1], totalHeight: 200})
			+ "</td></tr><tr>"
			+ "<td>" + x.toTeX('$') + "</td><td>" + y.toTeX('$') + "</td>"
			+ "</tr></tbody></table>"
			+ "<p>Es ist also $" + x.toTeX({color: colors[0]}) 
			+ ((2 * x.enumerator === x.denominator) ? " = " : " < ")
			+ tmp
			+ ((2 * y.enumerator === y.denominator) ? " = " : " < ") 
			+ y.toTeX({color: colors[1]}) + "$,"
			+ " und daher</p>"
			+ "$$" + x.toTeX({color: colors[0]}) + " < " 
			+ y.toTeX({color: colors[1]}) + "\\,.$$</p>";
		
	}
	// }}}

	// comparison with other natural numbers {{{
	if (!!xP.whole && xP.whole <= yP.whole) {
		tmp = false;
		msg = "";
		if (xP.whole !== x.whole || yP.whole !== y.whole) {
			msg = "<p>Geschrieben als gemischte Zahl ist $"
			if (xP.whole !== x.whole) {
				msg+= x.toTeX() + " = "	+ xP.toTeX();
				tmp = true;
			}
			if (yP.whole !== y.whole) {
				if (tmp) msg+= "\\quad\\text{ und }\\quad";
				msg+= y.toTeX() + " = "	+ yP.toTeX();
			}
			msg+= "\\,.$</p>";
		}

		if(xP.whole === yP.whole) {
			if (xP.enumerator === 0) {
				msg+= "<p>Es ist " + yP.toTeX('$') + " <strong>größer</strong> als $"
				+ "\\color{#008077}{" + yP.whole + "}$";
			} else {
				xN = new Fraction(xP.enumerator, xP.denominator);
				yN = new Fraction(yP.enumerator, yP.denominator);
				msg+= "<p>Um zu sehen, welcher Bruch kleiner ist, "
					+" müssen wir also nur die Brüche "
					+ xN.toTeX(texOpts.x) + " und " + yN.toTeX(texOpts.y)
					+ " vergleichen.</p>"
				return msg + Fraction.explainComparison(xN, yN, colors).slice(0, -4) //AHHHH
					+ ", \\quad\\text{ d. h. }\\quad" + x.toTeX() + "<" + y.toTeX()
					+ "\\,.$$";
			}
		} else {
			msg+= "<p>Es ist ";
			if (yP.enumerator !== 0) {
				msg+= yP.toTeX(texOpts.y) + " <strong>größer</strong> als $" 
					+ "\\color{#008077}{" + yP.whole + "}$ und "
			}
			msg+= xP.toTeX(texOpts.x) + " <strong>kleiner</strong> als $"
				+ ((xP.whole + 1 === yP.whole) 
					? "\\color{#008077}{" + yP.whole + "}"
					: (xP.whole + 1) + "$, also <strong>kleiner</strong> als "
						+ "$\\color{#008077}{" + yP.whole + "}")
				+ "$";

		}
	
		
		msg+= ".</p>";

		if (xV !== false && yV !== false) {
			msg+= "<table style=\"margin: auto\"><tbody><tr>"
				+ "<td style=\"width: 3em;\">" + x.toTeX('$') + "</td>"
				+ "<td style=\"text-align: left;\">"
				+ xV.visualize({mode: "rectangle", subpixels: false, grid: grid, bar: true, 
					color: colors[0],
					widthOfPiece: xWOP, totalHeight: 100})
				+ "</td></tr><tr>"
				+ "<td style=\"width: 3em;\">" + y.toTeX('$') + "</td>"
				+ "<td style=\"text-align: left;\">"
				+ yV.visualize({mode: "rectangle", bar: true, subpixels: false, grid: grid,
					color: colors[1], widthOfPiece: yWOP, totalHeight: 100})
				+ "</td></tr></tbody></table>";
		}

		msg+= "<p>Es ist also $" + x.toTeX({color: colors[0]}) 
			+ ((xP.whole === yP.whole) ? " = " : " < ")
			+  "\\color{#008077}{" +yP.whole + "}"
			+ ((yP.enumerator === 0) ? " = " : " < ") 
			+ y.toTeX({color: colors[1]}) + "$,"
			
		return msg
			+ " und daher</p>"
			+ "$$" + x.toTeX({color: colors[0]}) + " < " 
			+ y.toTeX({color: colors[1]}) + "\\,.$$";
	}
	// }}}
	
	//compare by size of pieces {{{
	if (x.whole === 0 && y.whole === 0 && x.enumerator < y.enumerator && x.denominator > y.denominator) {
		msg = "<p>Bei " + x.toTeX(texOpts.x) + " teilen wir ein Ganzes in $" + x.denominator 
			+ "$ gleich große Teile "
			+ "und nehmen $" + x.enumerator + "$ solcher Teile.</p>";

		if (xV !== false) {
			msg+= "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + x.toTeX('$')
				+ "</span>"
				+ xV.visualize({mode: "rectangle", subpixels: false, grid: grid, bar: true, 
					color: colors[0], widthOfPiece: xWOP, totalHeight: 100})
			+ "</div>";
		}

		msg+= "<p>Bei " + y.toTeX(texOpts.y) + " teilen wir ein Ganzes in $" + y.denominator 
			+ "$ gleich große Teile "
			+ "und nehmen $" + y.enumerator + "$ solcher Teile.</p>";


		if (yV !== false) {
			msg+= "<div>"
				+ "<span style=\"display: inline-block; width: 3em;\">" + y.toTeX('$')
				+ "</span>"
				+ yV.visualize({mode: "rectangle", bar: true, subpixels: false, grid: grid,
					color: colors[1], widthOfPiece: yWOP, totalHeight: 100})
				+ "</div>";
		}

		return msg
			+ "<p>Die einzelnen Teile bei " + y.toTeX(texOpts.y)
			+ " sind <strong>größer</strong> und wir nehmen <strong>mehr</strong> Teile als bei "
			+ x.toTeX(texOpts.x) + ". "
			+ "Daher ist $$" + y.toTeX({color: colors[1]}) + " > " + x.toTeX({color: colors[0]}) 
			+ "\\,.$$";
	}

	// }}}

	msg = "";

	//raise/reduce one fraction too the denominator of the other {{{
	if (y.denominator % x.denominator === 0) {
		tmp = y.denominator / x.denominator;
		if (y.isReduceable(tmp)) {
			// reduce y by y.denominator / x.denominator
			xN = x;
			yN = y.clone().reduce(tmp);
			msg = "<p>Es ist \\(" + y.toTeX({color: colors[1]})  
				+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
				+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize " + tmp + "}"
				+ "\\end{matrix}}\\;" + yN.toTeX({color: colors[1]}) +"\\).</p>";
		} else {
			// raise x 
			xN = x.clone().raise(tmp);
			yN = y;
			msg = "<p>Es ist \\(" + x.toTeX({color: colors[0]})
				+ "\\;{\\tiny\\begin{matrix}\\tiny{" + tmp + "}"
				+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"	
				+ xN.toTeX({color: colors[0]}) + "\\).</p>";
		}
	} else if (x.denominator % y.denominator === 0) {
		tmp = x.denominator / y.denominator
		if (x.isReduceable(tmp)) {
			//reduce x by x.denominator / y.denominator
			xN = x.clone().reduce(tmp);
			yN = y;
			msg = "<p>Es ist \\(" + x.toTeX({color: colors[0]})
				+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
				+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize " + tmp + "}"
				+ "\\end{matrix}}\\;" + xN.toTeX({color: colors[0]}) + "\\).</p>";

		} else {
			// raise y 
			xN = x;
			yN = y.clone().raise(tmp);
			msg = "<p>Es ist \\(" + y.toTeX({color: colors[1]}) 
				+ "\\;{\\tiny\\begin{matrix}\\tiny{" + tmp + "}"
				+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"	
				+ yN.toTeX({color: colors[1]}) + "\\).</p>";
		}
	// }}}
	// raise/reduce one fraction to the enumerator of the other {{{
	} else if (y.enumerator % x.enumerator === 0) {
		tmp = y.enumerator / x.enumerator;
		if (y.isReduceable(tmp)) {
			//reduce y by y.enumerator / x.enumerator
			xN = x;
			yN = y.clone().reduce(tmp);
			msg = "<p>Es ist \\(" + y.toTeX({color: colors[1]}) 
				+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
				+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize " + tmp + "}"
				+ "\\end{matrix}}\\;" + yN.toTeX({color: colors[1]})+ "\\).</p>";
		} else {
			// raise x 
			xN = x.clone().raise(tmp);
			yN = y;
			msg = "<p>Es ist \\(" + x.toTeX({color: colors[0]}) 
				+ "\\;{\\tiny\\begin{matrix}\\tiny{" + tmp + "}"
				+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"
				+ xN.toTeX({color: colors[0]}) + "\\).</p>";
		}
	} else if (x.enumerator % y.enumerator === 0) {
		tmp = x.enumerator / y.enumerator
		if (x.isReduceable(tmp)) {
			// reduce x by x.enumerato
			xN = x.clone().reduce(tmp);
			yN = y;
			msg = "<p>Es ist \\(" + x.toTeX({color: colors[0]}) 
				+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
				+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize " + tmp + "}"
				+ "\\end{matrix}}\\;" + xN.toTeX({color: colors[0]}) + "\\).</p>";
		} else {
			// raise y 
			xN = x;
			yN = y.clone().raise(tmp);
			msg = "<p>Es ist \\(" + y.toTeX({color: colors[1]}) 
				+ "\\;{\\tiny\\begin{matrix}\\tiny{" + tmp + "}"
				+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"	
				+ yN.toTeX({color: colors[1]}) + "\\).</p>";
		}
	}
	// }}}

	// raise/reduce both fractions to the same enumerator/denominator
	if (msg.length == 0) {
		var lce = Math.lcm(xR.enumerator, yR.enumerator);
		x.toLCE = (lce >= x.enumerator) ? lce / x.enumerator : -x.enumerator / lce;
		y.toLCE = (lce >= y.enumerator) ? lce / y.enumerator : -y.enumerator / lce;

		var lcd = Math.lcm(xR.denominator, yR.denominator);
		x.toLCD = (lcd >= x.denominator) ? lcd / x.denominator : -x.denominator / lcd;
		y.toLCD = (lcd >= y.denominator) ? lcd / y.denominator : -y.denominator / lcd;

		var lceCost = ((x.toLCE != 1) ? Math.abs(x.toLCE) : 0) * (x.enumerator + x.denominator) 
			+ ((y.toLCE != 1) ? Math.abs(y.toLCE) : 0) * (y.enumerator + y.denominator);
		
		var lcdCost = ((x.toLCD != 1) ? Math.abs(x.toLCD) : 0) * (x.enumerator + x.denominator) 
			+ ((y.toLCD != 1) ? Math.abs(y.toLCD) : 0) * (y.enumerator + y.denominator);

		console.log(x.toLCE + " & " + y.toLCE + " -> " + lceCost);
		console.log(x.toLCD + " & " + y.toLCD + " -> " + lcdCost);


		if (lceCost < lcdCost) {
			//make the enumerators equal {{{

			xN = (x.toLCE > 0) ? x.clone().raise(x.toLCE) : x.clone().reduce(-x.toLCE);
			yN = (y.toLCE > 0) ? y.clone().raise(y.toLCE) : y.clone().reduce(-y.toLCE);

			msg = "<p>Es ist ";
			if (x.toLCE !== 1) {
				if (x.toLCE < 0) {
					msg+= "$" + x.toTeX({color: colors[0]}) 
						+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
						+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize " + (-x.toLCE) + "}"
						+ "\\end{matrix}}\\;" + xN.toTeX({color: colors[0]}) + "$";
				} else {
					if (!isInteger(x.toLCE)) {
						xN = xR.clone().raise(lce / xR.enumerator);
						msg+= "$" + x.toTeX({color: colors[0]}) 
							+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
							+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize "
							+ Math.gcd(x.enumerator, x.denominator) + "}"
							+ "\\end{matrix}}\\;"
							+ xR.toTeX({color: colors[0]})
							+ "\\;{\\tiny\\begin{matrix}\\tiny{"
							+ (lce / xR.enumerator) + "}"
							+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"
							+ xN.toTeX({color: colors[0]}) + "$";
					} else {
						msg+= "$" + x.toTeX({color: colors[0]}) 
							+ "\\;{\\tiny\\begin{matrix}\\tiny{" + x.toLCE + "}"
							+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"	
							+ xN.toTeX({color: colors[0]}) + "$";
					}
				}
			}
			if (y.toLCE !== 1) {
				if (x.toLCE !== 1) {
					msg+= " und ";
				}
				if (y.toLCE < 0) {
					msg+= "$" + y.toTeX({color: colors[1]}) 
						+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
						+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize " + (-y.toLCE) + "}"
						+ "\\end{matrix}}\\;" + yN.toTeX({color: colors[1]}) + "$";
				} else {
					if (!isInteger(y.toLCE)) {
						yN = yR.clone().raise(lce / yR.enumerator);
						msg+= "$" + y.toTeX({color: colors[1]}) 
							+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
							+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize "
							+ Math.gcd(y.enumerator, y.denominator) + "}"
							+ "\\end{matrix}}\\;"
							+ yR.toTeX({color: colors[1]})
							+ "\\;{\\tiny\\begin{matrix}\\tiny{"
							+ (lce / yR.enumerator) + "}"
							+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"
							+ yN.toTeX({color: colors[1]}) + "$";
					} else {
						msg+= "$" + y.toTeX({color: colors[1]}) 
							+ "\\;{\\tiny\\begin{matrix}\\tiny{" + y.toLCE + "}"
							+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"	
							+ yN.toTeX({color: colors[1]}) + "$";
					}
				}
			}
			msg+= ".</p>";
			// }}}
		} else {
			//make the denominators equal {{{
			xN = (x.toLCD > 0) ? x.clone().raise(x.toLCD) : x.clone().reduce(-x.toLCD);
			yN = (y.toLCD > 0) ? y.clone().raise(y.toLCD) : y.clone().reduce(-y.toLCD);

			msg = "<p>Es ist ";
			if (x.toLCD !== 1) {
				if (x.toLCD < 0) {
					msg+= "$" + x.toTeX({color: colors[0]}) 
						+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
						+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize " + (-x.toLCD) + "}"
						+ "\\end{matrix}}\\;" + xN.toTeX() + "$";
				} else {
					if (!isInteger(x.toLCD)) {
						xN = xR.clone().raise(lcd / xR.denominator);
						msg+= "$" + x.toTeX({color: colors[0]}) 
							+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
							+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize "
							+ Math.gcd(x.enumerator, x.denominator) + "}"
							+ "\\end{matrix}}\\;"
							+ xR.toTeX({color: colors[0]})
							+ "\\;{\\tiny\\begin{matrix}\\tiny{"
							+ (lcd / xR.denominator) + "}"
							+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"
							+ xN.toTeX({color: colors[0]}) + "$";
					} else {
						msg+= "$" + x.toTeX({color: colors[0]}) 
							+ "\\;{\\tiny\\begin{matrix}\\tiny{" + x.toLCD + "}"
							+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"	
							+ xN.toTeX({color: colors[0]}) + "$";
					}
				}
			}
			if (y.toLCD !== 1) {
				if (x.toLCD !== 1) {
					msg+= " und ";
				}
				if (y.toLCD < 0) {
					msg+= y.toTeX({color: colors[1]}) 
						+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
						+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize " + (-y.toLCD) + "}"
						+ "\\end{matrix}}\\;" + yN.toTeX({color: colors[1]}) + "\\)";
				} else {
					if (!isInteger(y.toLCD)) {
						yN = yR.clone().raise(lcd / yR.denominator);
						msg+= "$" + y.toTeX({color: colors[1]}) 
							+ "\\;{\\tiny\\begin{matrix}\\\\\\normalsize=\\\\"
							+ "\\!\\!\\!\\phantom{|^|}^{\\scriptsize "
							+ Math.gcd(y.enumerator, y.denominator) + "}"
							+ "\\end{matrix}}\\;"
							+ yR.toTeX({color: colors[1]})
							+ "\\;{\\tiny\\begin{matrix}\\tiny{"
							+ (lcd / yR.denominator) + "}"
							+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"
							+ yN.toTeX({color: colors[1]}) + "$";
					} else {
						msg+= "$" + y.toTeX({color: colors[1]}) 
							+ "\\;{\\tiny\\begin{matrix}\\tiny{" + y.toLCD + "}"
							+ "\\\\\\normalsize=\\\\\\end{matrix}}\\;"	
							+ yN.toTeX({color: colors[1]}) + "$";
					}
				}
			}

			msg+= ".</p>";
			// }}}
		}
	}
	return msg + Fraction.explainComparison(xN, yN, colors).slice(0, -4, colors) //AHHHH
		+ ", \\quad\\text{ d. h. }\\quad" + x.toTeX() + "<" + y.toTeX()
		+ "\\,.$$";

	} //end of "if (x.enumerator > 0)"
}
/*
Fraction.comparisonStrategy = function(a, b){
	var result = a.compare(b);
	var x,y;
	var mode;
	var msg, tmp;
	if (result === 1) {
		x = b.clone();
		y = a.clone();
	} else {
		x = a.clone();
		y = b.clone();
	}
	// it is x <= y.
	
	var xP = x.clone().properize();
	var yP = y.clone().properize();
	var xR = x.clone().reduce();
	var yR = y.clone().reduce();

	// comp with 0 {{{
	// x < 0, y > 0.
	if (x.fixSign().enumerator < 0 && y.fixSign().enumerator > 0) return "sign";
	
	// x = 0
	if (xP.whole == 0 && x.enumerator == 0) {
		if (result === 0) {
			return "equal 0";	
		} else {
			return "comparison 0";
		}
	}
	// y = 0
	if (yP.whole == 0 && y.enumerator == 0) return "comparison 0";
	// }}}
	
	// x = y TODO {{{
	if (result === 0) {
		if (x.denominator == y.denominator) return "equal look";

		if (xP.enumerator === 0) return "equal natural"; 

		tmp = x.denominator % y.denominator;
		if (tmp === 0 || y.denominator % x.denominator === 0) {
			return "raise " + ((tmp === 0) ? "y" : "x");
		}

	}
	// }}}

	// x < y (positive)
	if (x.enumerator > 0) { 

	if (x.enumerator == y.enumerator) return "same enumerator";
	if (x.denominator == y.denominator)  return "same denominator";

	if (x.enumerator < x.denominator && y.enumerator > y.denominator) return "comparison 1";
//	if (2 * x.enumerator < x.denominator && 2 * y.enumerator > y.denominator) return "comparison 0.5";
	if (xP.whole < yP.whole || (xP.whole === yP.whole && xP.enumerator === 0)) 
		return "comparison " + yP.whole;
	
	if (x.enumerator < y.enumerator && x.denominator > y.denominator) return "piece size";
	
	//1.
	if (y.denominator % x.denominator === 0) {
		tmp = y.denominator / x.denominator;
		if (y.isReduceable(tmp)) {
			// reduce y by y.denominator / x.denominator
		} else {
			// raise x 
		}
	}
	//1.
	if (x.denominator % y.denominator === 0) {
		tmp = x.denominator / y.denominator
		if (x.isReduceable(tmp)) {
			//reduce x by x.denominator / y.denominator
		} else {
			// raise y
		}
	}
	//3.
	if (y.enumerator % x.enumerator === 0) {
		tmp = y.enumerator / x.enumerator;
		if (y.isReduceable(tmp)) {
			//reduce y by y.enumerator / x.enumerator
		} else {
			// raise x
		}
	}
	//4.
	if (x.enumerator % y.enumerator === 0) {
		tmp = x.enumerator / y.enumerator
		if (x.isReduceable(tmp)) {
			// reduce x by x.enumerator / y.enumerator
		} else {
			// raise y
		}
	}


	} //end of "if (x.enumerator > 0)"
}
*/
