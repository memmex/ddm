// problem is an array in RPN:
//  [a, b, "+-*:"], where a and b may be decimals or Fractions. Further entries in the array are ignored.
//  The error definitions and numbers are taken from 
//  Eichelmann, A., Narciss, S., Schnaubert, L., & Melis, E. (2012). 
//  Typische Fehler bei der Addition und Subtraktion von Brüchen–Ein Review zu empirischen Fehleranalysen. Journal für Mathematik-Didaktik, 33(1), 29-57.
function knownError(problem, input, recurse){
	var error;
	var guesses = [];
	if (problem.constructor !== Array) {
		problem = mathParser.shuntingYard(problem);
	}
	if (problem.length == 3) {
		var a = problem[0], b = problem[1];
		if (KT(a, b, problem[2]) === parseFloat(input)) {
			return "KT";
		}
		switch (problem[2]) {
			case "+":
				if (isFraction(a) && isFraction(b)) {
					if (!isMixed(a) && !isMixed(b)) {
						//A1 a/b+c/d = (a+c)/(b+d)
						if (input.equals(new Fraction(a.enumerator + b.enumerator, a.denominator + b.denominator)))
							guesses.push("A1");
						if (input.equals(new Fraction(a.enumerator * b.enumerator, Math.lcm(a.denominator, b.denominator))))
							guesses.push("A2");
						if (input.equals(a.clone().multiply(b))) 
							guesses.push("A2");
						else if(!recurse) {
							error = knownError([a, b, "*"], input, true);
							if (error.length) {
								guesses = guesses.concat(error.map(function(cv){return "A2" + cv}));
							}
						}


						if (input.equals(a.clone().subtract(b))) guesses.push("A3");
						else if (!recurse) {
							error = knownError([a,b, "-"], input, true);
							if (error.length) {
								guesses = guesses.concat(error.map(function(cv){return "A3" + cv}));
							}
						}

						if (input.is(new Fraction(a.enumerator + b.enumerator, a.denominator * b.denominator)))
							guesses.push("A4");
						if (input.is(new Fraction(a.enumerator + b.enumerator, Math.lcm(a.denominator, b.denominator))))
							guesses.push("A4");

						if (input.is(new Fraction(a.enumerator + b.denominator, a.denominator + b.enumerator)))
							guesses.push("A5");

						if (input.equals(new Fraction(a.enumerator + a.denominator, b.enumerator + b.denominator)))
							guesses.push("A6");
						if (input.equals(new Fraction(b.enumerator + b.denominator, a.enumerator + a.denominator)))
							guesses.push("A6");

						if (input.equals(a.enumerator + a.denominator + b.enumerator + b.denominator)) 
							guesses.push("A7");
					} else {
						if (input.equals(new Fraction(a.whole + a.enumerator + b.whole + b.enumerator,
										a.denominator + b.denominator)))
							guesses.push("A9");
					}
				}
				if (isFraction(a) && isInteger(b)) {
					error = a;
					a = b;
					b = error;
					error = 'swap';
				}
				if (error === 'swap' || (isInteger(a) && isFraction(b))) {
					//A2 n + a/b = n+a/b
					if (input.equals(new Fraction(a + b.enumerator, b.denominator))) 
						guesses.push("A8");

					//n = n/n
					if (input.equals(b.clone().add(new Fraction(a, a)))) guesses.push("Emb");
					else if (!recurse) {
						error = knownError([new Fraction(a, a), b, "+"], input, true);
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "Emb" + cv}));
						}
					}

				}  
				break;
			case "-":
				if (isFraction(a) && !isMixed(a) && isFraction(b) && !isMixed(b)) {
					//S1 a/b-c/d = (a-c)/(b-d)
					if (input.equals(new Fraction(a.enumerator - b.enumerator, a.denominator - b.denominator)))
						guesses.push("S1");

					if (input.equals(new Fraction(Math.abs(a.enumerator - b.enumerator), Math.abs(a.denominator - b.denominator))))
						guesses.push("S2");

					if (input.equals(a.clone().multiply(b))) guesses.push("S3");
					else if(!recurse) {
						error = knownError([a, b, "*"], input, true);
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "S3" + cv}));
						}
					}
				
					if (input.equals(new Fraction(a.enumerator - b.enumerator, a.denominator * b.denominator))) 
						guesses.push("S4");
					if (input.equals(new Fraction(a.enumerator - b.enumerator, Math.lcm(a.denominator, b.denominator)))) 
						guesses.push("S4");

					if (input.equals(a.clone().add(b))) guesses.push("S5");
					else if(!recurse) {
						error = knownError([a, b, "+"], input, true);
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "S5" + cv}));
						}
					}
				}
				if (isMixed(a)) {
					if (isFraction(b)){
						error = a.clone();
						error.whole--;
						error.enumerator+= 10;
						error.subtract(b);
						if (input.equals(error)) guesses.push("S6");
						
						if (input.is(a.clone().subtract(b).add(1))) guesses.push("S7");

						if (a.denominator == b.denominator && a.enumerator < b.enumerator
							&& input.equals(new Fraction(a.whole - b.whole, b.enumerator - a.enumerator, a.denominator)))
							guesses.push("S7");
					}
				}
				if (isInteger(a) && isFraction(b)) {
					if (isMixed(b)) {
						if (input.is((new Fraction(a, 1)).subtract(b).add(1))) guesses.push("S7");
					}
					//S2 n-a/b = n-a/b
					if (input.is(new Fraction(Math.abs(a - b.enumerator), b.denominator))) guesses.push("S8");
					
					//n = n/n
					if (input.equals((new Fraction(a, a)).subtract(b))) guesses.push("Emb");
					else if (!recurse) {
						error = knownError([new Fraction(a, a), b, "-"], input, true);
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "Emb" + cv}));
						}
					}
					

				} else if (isInteger(b) && isFraction(a)) {
					//S2
					if (input.is(new Fraction(b - a.enumerator, a.denominator))) guesses.push("S8");
					
					//n = n/n
					if (input.is(a.clone().subtract(new Fraction(b, b)))) guesses.push("Emb");
					else if (!recurse) {
						error = knownError([a, new Fraction(b, b), "-"], input, true);
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "Emb" + cv}));
						}
					}
				}
				break;
			case "*":
				if (isFraction(a) && isFraction(b) ) {
					if(!isMixed(a) && !isMixed(b)) {
						//Div a/b*c/b = a/c
						if (input.equals(a.clone().divide(b))) guesses.push("Div");
						else if(!recurse) {
							error = knownError([a, b, ":"], input, true);
							if (error.length) {
								guesses = guesses.concat(error.map(function(cv){return "Div" + cv}));
							}

						}

						if (a.denominator == b.denominator) {
							//M1 a/b*c/b = ac/b
							if (input.equals(new Fraction(a.enumerator * b.enumerator, a.denominator))) 
								guesses.push("M1");
							//M2 a/b*c/b = ac/2b
							if (input.equals(new Fraction(a.enumerator * b.enumerator, 2 * a.denominator))) 
								guesses.push("M2");
						} else {
							//M1' a/b*c/d = a'c'/lcm(b,d)							
							error = Math.lcm(a.denominator, b.denominator);							
							if (input.equals(new Fraction(a.enumerator * b.enumerator * error * error / a.denominator / b.denominator, error)))
								guesses.push("M1");

							//M2' a/b*a/d = 2a/bd
							if (a.enumerator == b.enumerator) {
								if (input.equals(new Fraction(2 * a.enumerator, a.denominator * b.denominator))) 
									guesses.push("M2");
							}
						}
					} else {
						if (isMixed(b)) {
							error = a;
							a = b;
							b = error;
						}
						if (isMixed(a)) {
							if (isMixed(b)) { 
								//n a/b * m c/d = nm ac/bd
								if (input.equals(new Fraction(a.whole * b.whole, a.enumerator * b.enumerator, a.denominator * b.denominator)))
									guesses.push("same-with-same");
								else if (!recurse && input.whole == a.whole * b.whole) {
									error = knownError([a.clone().setWhole(0), b.clone().setWhole(0), "*"], input.clone().setWhole(0), true);
									if (error.length) {
										guesses = guesses.concat(error.map(function(cv){return "same-with-same" + cv}));
									}
								}

								//n a/b * m c/d = an/b * mc/d 
								if (input.equals(new Fraction(a.whole * b.whole * a.enumerator * b.enumerator, a.denominator * b.denominator))) 
									guesses.push("Add");
								else {
									error = knownError([a.clone().setWhole(0).multiply(a.whole), b.clone().setWhole(0).multiply(b.whole), "*"],
											input);
									if (error.length) {
										guesses = guesses.concat(error.map(function(cv){return "Add" + cv}));
									}

								}
							} else {	
								//n a/b * c/d = n ac/bd
								if (input.equals(new Fraction(a.whole, a.enumerator * b.enumerator, a.denominator * b.denominator))) 
									guesses.push("same-with-same");
								else if (!recurse && input.whole == a.whole ) {
									error = knownError([a.clone().setWhole(0), b.clone(), "*"], input.clone().setWhole(0), true);
									if (error.length) {
										guesses = guesses.concat(error.map(function(cv){return "same-with-same" + cv}));
									}
								}
							}
						}
					}
				}
				if (isFraction(a) && isInteger(b)) {
					error = a;
					a = b;
					b = error;
					error = 'swap';
				}
				if (error == 'swap' || (isFraction(b) && isInteger(a))) {
					if (!isMixed(b)) {
						//M3 n*a/b = na/nb ; a/b*n = an/bn
						if (input.equals(b.clone().raise(a))) guesses.push("Emb");
						else if (!recurse) {
							error = knownError([b.clone(), new Fraction(a,a), "*"], input, true);
							if (error.length) {
								guesses = guesses.concat(error.map(function(cv){return "Emb" + cv}));
							}

						}
						//Div n*a/b = a/bn ; n*a/b = nb/a ; a/b*n = a/bn ; a/b*n = bn/a
						if (input.equals(new Fraction(b.enumerator, a * b.denominator)) ||
								input.equals(new Fraction(a * b.denominator, b.enumerator))			
						   ) guesses.push("Div");
					} else {
						//m * n a/b = nm a/b
						if (input.is(new Fraction(a * b.whole, b.enumerator, b.denominator))) guesses.push("same-with-same");
					}

				}
				break;

			case ":":
				if (isFraction(a) && isFraction(b)) {
					//D1 a/b:c/b = a:c/b
					if (a.denominator == b.denominator && !(a.enumerator % b.enumerator)) {
						if (input.equals(b.clone().setEnumerator(a.enumerator / b.enumerator))) 
							guesses.push("D1");
					}
					//a/b:c/d = b/a:c/d = bd/ac
					if (input.equals(a.clone().invert().multiply(b))) guesses.push("Invert1");
					//a/b:c/d = b/a:d/c = bc/ad
					if (input.equals(a.clone().invert().divide(b))) guesses.push("InvertBoth");
					//Mult a/b:c/d = ac/bd
					if (input.equals(a.clone().multiply(b))) guesses.push("Mult");
					else if(!recurse) {
						error = knownError([a, b, "*"], input, true);
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "Mult" + cv}));
						}

					}

				}
				if (isFraction(a) && isInteger(b)) {
					//a/b : n = an/b
					if (input.equals(a.clone().multiply(b))) guesses.push("Mult");
					//a/b : n = a/b : n/n
					if (input.equals(a.clone().raise(b))) guesses.push("Emb");
					else if (!recurse) {
						error = knownError([a, new Fraction(b, b), ":"], input, true); 
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "Emb" + cv}));
						}

					}
					//a/b : n = b/a * n
					if (input.equals(a.clone().invert().multiply(b))) guesses.push("Invert1");

				} else if (isInteger(a) && isFraction(b)) {
					//n : a/b = n:a/b
					if (!(a % b.enumerator) && input.equals(b.clone().setEnumerator(b.enumerator / a))) guesses.push("MultRule");
					//n : a/b = n/n : a/b
					if (input.equals(b.clone().invert().raise(a))) guesses.push("Emb");
					else if (!recurse) {
						error = knownError([new Fraction(a,a), b, ":"], input, true); 
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "Emb" + cv}));
						}

					}

					//n : a/b = n * a/b
					if (input.equals(b.clone().multiply(a))) guesses.push("Mult");
					//n : a/b = 1/n : a/b
					if (input.equals((new Fraction(1, a).multiply(b)))) guesses.push("Invert1");
							
				} else if (isInteger(a) && isInteger(b)){
					//n:m = m:n (m > n)
					if (input.equals(new Fraction(b, a))) guesses.push("Com");
					//n:m = n/n : m/m
					if (input.equals(new Fraction(a*b, a*b))) guesses.push("Emb");
					else if (!recurse) {
						error = knownError([new Fraction(a,a), new Fraction(b,b), ":"], input, true); 
						if (error.length) {
							guesses = guesses.concat(error.map(function(cv){return "Emb" + cv}));
						}

					}
				}
				break;
		}
	}
	return guesses;
}

function KT(a, b, op){
	if (isFloat(a)) {
		var a1 = Math[(a >= 0) ? 'floor' : 'ceil'](a);
		var a2 = parseInt(a.toString().split(".")[1]);
	} else {
		var a1 = 0;
		var a2 = parseInt(a);
	}
	if (isFloat(b)) {
		var b1 = Math[(b >= 0) ? 'floor' : 'ceil'](b);
		var b2 = parseInt(b.toString().split(".")[1]);
	} else {
		var b1 = 0;
		var b2 = b;
	}
	switch (op) {
		case "+":
			return parseFloat( (a1+b1)+"."+(a2+b2) );
		case "-":
			return parseFloat( (a1-b1)+"."+(a2-b2) );
		case "*":
			return parseFloat( (a1*b1)+"."+(a2*b2) );
		case ":":
			return parseFloat( (a1/b1)+"."+(a2/b2) );
	}
	return false;
}
