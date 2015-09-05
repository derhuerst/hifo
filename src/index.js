var Hifo =		require('./Hifo');





var factory = module.exports = function (sort, options) {
	var instance = Object.create(Hifo);
	instance.init(sort, options);
	return instance;
};

factory.Hifo = Hifo;



var lowest = function (a, b) { return a - b };

factory.lowest = function (key) {
	if (typeof key === 'string')
		return function (a, b) { return a[key] - b[key] };
	else return lowest;
};



var highest = function (a, b) { return b - a };

factory.highest = function (key) {
	if (typeof key === 'string')
		return function (a, b) { return b[key] - a[key] };
	else return highest;
};
