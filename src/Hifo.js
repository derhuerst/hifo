module.exports = {



	init: function (sort, size) {
		if (!sort) throw new Error('Missing `sort` parameter.');
		this.sort = sort;

		this.size = size || 10;
		this.data = [];

		return this;
	},



	add: function (entry) {
		var i;

		// `this.data` is empty
		if (this.data.length === 0) this.data.push(entry);

		// `this.data` is not full yet
		else if (this.data.length < this.size) {
			i = this.data.length - 1;
			while (i > 0 && 0 <= this.sort(this.data[i], entry)) i--;
			this.data.splice(i, 0, entry);   // add
		}
		// `this.data` is full
		else if (0 <= this.sort(this.data[this.size - 1], entry)) {
			i = this.size - 1;
			while (i > 0 && 0 <= this.sort(this.data[i], entry)) i--;
			this.data.splice(i, 0, entry);   // add
			this.data.pop();   // remove last
		}

		return this;
	},



	reset: function () {
		this.data = [];
		this.lowest = null;
		return this;
	},



	_lowest: function (a, b) {
		return a - b;
	},
	lowest: function (key) {
		if (typeof key === 'string')
			return function (a, b) {
				return a[key] - b[key]
			};
		else return this._lowest;
	},

	_highest: function (a, b) {
		return b - a;
	},
	highest: function (key) {
		if (typeof key === 'string')
			return function (a, b) {
				return b[key] - a[key];
			};
		else return this._highest;
	}



};
