var Hifo =		require('./Hifo');





var factory = module.exports = function (sort, options) {
	var instance = Object.create(Hifo);
	instance.init(sort, options);
	return instance;
};

factory.Hifo = Hifo;
