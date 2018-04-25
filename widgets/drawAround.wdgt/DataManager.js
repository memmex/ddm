/*
 * DataManager.js provides the prototype DataManager, which can be used to store and retrieve data of widgets in the iBook (via localStorage).
 * It also provides automatic time logging of repeated tries.
 *
 * */

function DataManager(key){
	this.lastTimestamp = new Date();
	this.key = key;
	this.data = null;
	this.onSave = null;
	this.userResettable = true;
	this.load();
	
	// save when closing the page/widget
	if ('pagehide' in window) {
		window.addEventListener("pagehide", this.save.bind(this));
	} else {
		window.addEventListener("unload", this.save.bind(this));
	}
	DataManager.instances.push(this);
}

DataManager.instances = [];

DataManager.prototype.start = function(){
	this.lastTimestamp = new Date();
	return this; //chaining
}

DataManager.prototype.log = function(what){
	var tmp = (what.constructor !== Object) ? {data: what} : what;

	tmp.startTime = this.lastTimestamp;
	this.lastTimestamp = new Date();
	tmp.endTime = this.lastTimestamp;

	this.data.history.push(tmp);
	//only for the page:
	this.save();
	return this; //chaining, e.g. DataManager.log(foo).save();
}

DataManager.prototype.lastLog = function(){
	if (this.data.history.length) {
		return this.data.history[this.data.history.length-1];
	} else {
		return {};
	}
}

DataManager.prototype.analyse = function(){
	var result = {total: this.data.history.length, totalTime: 0, correct: 0};
	this.data.history.forEach(function(v){
		result.totalTime+= v.endTime - v.startTime;
		if (v.correct) {
			result.correct++;
		}
	});
	result.averageTime = result.totalTime / result.total;
	return result;
}

DataManager.prototype.store = function(key, value) {
	if (arguments.length > 1) {
		this.data.store[key] = value;
		return value;
	} else {
		return this.data.store[key];
	}
}

DataManager.prototype.save = function(){
	try {
		if (this.onSave && typeof this.onSave == 'function') {
			this.onSave();
		}
		localStorage.setItem(this.key, JSON.stringify(this.data));
	} catch (e) {
	}
}

DataManager.reviver = function (k, v) {
	if (typeof isFraction === 'function' && isFraction(v) && v.constructor !== Fraction)
		return new Fraction(v);
	if (typeof v === 'string') {
		if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(v))
			return new Date(v);
	}
	if (k == "leitner" || k.groups)
		return Leitner.fromJSON(v);
	return v;
}

DataManager.prototype.load = function(){
	var stored = localStorage.getItem(this.key);
	try{
		this.data = JSON.parse(stored.toString(), DataManager.reviver); // stored.toString
	} catch(e) {
		//console.error(e.message);
		this.data = {store: {}, history: []};
	}
	return this; //chaining
}

DataManager.prototype.reset = function(hard){
	this.onSave = null;
	if (hard) {
		localStorage.removeItem(this.key);
		this.data = {store: {}, history: []};
	} else {
		this.data.store = {};
	}
}

//CindyJS-Plugin
if (typeof createCindy === 'function' && createCindy.registerPlugin) {
var cindyDM;
createCindy.registerPlugin(1, "DataManager", function(api) {

	api.defineFunction("initDM", 1, function(args) {
		cindyDM = new DataManager(api.evaluateAndVal(args[0]).value);
	});

	api.defineFunction("DMstart", 0, function(){
		if (cindyDM) cindyDM.start();
	});		

	api.defineFunction("DMlog", 1, function(args) {
		if (cindyDM)
			cindyDM.log(api.instance.niceprint(api.evaluateAndVal(args[0])));
	});

	api.defineFunction("DMstore", 2, function(args) {
		if (cindyDM) {
			cindyDM.store(
				api.evaluateAndVal(args[0]).value,
				{data: api.evaluateAndVal(args[1])}
			);
		}
	});
	api.defineFunction("DMstore", 1, function(args) {
		if (cindyDM) {
			var stored = cindyDM.store(api.evaluateAndVal(args[0]).value);
			return (stored && stored.data) ? stored.data : api.nada;
		}
	});

	api.defineFunction("DMisundefined", 1, function(args) {
		return {
			'ctype': 'boolean',
			'value': (api.evaluate(args[0]).ctype === 'undefined')
		};
	});

	api.defineFunction("DMsetOnSave", 1, function(args){
		if (cindyDM) {
			var str = api.evaluateAndVal(args[0]).value;
			cindyDM.onSave = function(){
				api.instance.evokeCS(str);
			};
		}
	});
	api.defineFunction("DMreset", 0, function(){
		if (cindyDM) cindyDM.reset();			
	});	
});

}
