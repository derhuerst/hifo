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
		if (this.data.length === 0) {
			this.data.push(entry);
			return this;
		}

		// check if `entry` exists
		if (i = this.data.indexOf(entry) >= 0)
			this.data.splice(i, 1);   // add

		// move forward
		i = this.data.length - 1;
		while (i >= 0 && this.sort(this.data[i], entry) > 0) i--;
		this.data.splice(i + 1, 0, entry);   // add

		// `this.data` is full
		if (this.data.length > this.size) this.data.pop();   // remove last

		return this;
	},



	reset: function () {
		this.data = [];
		return this;
	}



};
