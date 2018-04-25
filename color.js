/*
 * color.js provides the function color(name, intensity) and the object designColors containing the color scheme for the book.
 * The function color will return the color (as HTML-hex) specified by its arguments.
 * Examples:
 * 	- color('blue', 0) returns the lightest blue
 * 	- color('green', 4) returns the darkest green
 * 	- color('gray') returns the standard gray (equivalent to color('gray', 2)
 * 	- color(n), where n is a number between 0 and 3 returns the color in the specified order (blue, orange, green, red)
 * 		- color(2, 1) returns a light orange
 * 
 * The function automatically names 'yellow' to 'orange' and 'grey' to 'gray'.
 * If the input does not correspond to a specified color, the default gray is returned
 */

var designColors = {
	blue: ['#5288BC', '#306EAB', '#0C5AA6', '#094580', '#053664'],
	orange: ['#FFB963', '#FFA639', '#FF8C00', '#C56C00', '#9B5500'],
	green: ['#83DE5C', '#63CC35', '#43BA10', '#309605',' #227400'],
	red: ['#FD696D', '#EC3E42', '#D71318', '#AD060A', '#850003'],
	gray: ['#E0E0E0', '#ACACAC', '#808080', '#4E4E4E','#232323'],
	violet: ['#B36DD4', '#9E3ECC', '#9113CC', '#7B05B2', '#5E038A'],
	turquoise: ['#5AB1AB', '#189C92', '#008077', '#005F58', '#003C38'],
	minion: ['#FFF299', '#FFED72', '#F5E050', '#DDC62C', '#AA9716'],
	brown: ['#BA682B', '#984A10', '#753200', '#502200', '#2A1200'],
	magenta: ['#FFF6FF', '#FDB5FD', '#F883F8', '#F059F0', '#E134E1']
};

function color(name, intensity) {
	if (intensity === undefined || typeof intensity !== 'number') {
		intensity = 2;
	} else if (intensity < 0 || intensity > 4) {
		intensity = 2;
	}
	if (designColors[name] && designColors[name][intensity]){
		return designColors[name][intensity];
	}
	if (typeof name === 'number' && name < 7){
		var ordering = ["blue", "orange", "violet", "turquoise", "minion", "brown", "magenta"];
		return designColors[ordering[name]][intensity];
	}
	if (name == "yellow") {
		return designColors.orange[intensity];
	}
	if (name == "grey") {
		return designColors.gray[intensity];
	}
	return designColors.gray[2];
}

function randomColor(intensity, alternatives) {
	if (intensity === undefined || typeof intensity !== 'number') {
		intensity = 2;
	} else if (intensity < 0 || intensity > 4) {
		intensity = 2;
	}
	if (alternatives === undefined || typeof alternatives !== 'number') {
		alternatives = 7;
	} else if (alternatives < 0 || alternatives > 7) {
		alternatives = 7;
	}
	
	return color(Math.floor(Math.random() * alternatives), intensity);
}
