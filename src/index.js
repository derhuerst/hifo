var Hifo =		require('./Hifo');





var factory = module.exports = function (sort, options) {
	var instance = Object.create(Hifo);
	instance.init(sort, options);
	return instance;
};

factory.Hifo = Hifo;



var lowest = function (a, b) { return a - b };

factory.lowest = function (primary, secondary) {
	if (arguments.length === 2)
		return function (a, b) {
			var d = a[primary] - b[primary];
			if (d === 0) return a[secondary] - b[secondary];
			else return d;
		};
	else if (typeof primary === 'string')
		return function (a, b) { return a[primary] - b[primary] };
	else return lowest;
};



var highest = function (a, b) { return b - a };

factory.highest = function (primary, secondary) {
	if (arguments.length === 2)
		return function (a, b) {
			var d = b[primary] - a[primary];
			if (d === 0) return b[secondary] - a[secondary];
			else return d;
		};
	else if (typeof primary === 'string')
		return function (a, b) { return b[primary] - a[primary] };
	else return highest;
};
