# *hifo*

**Stores and sorts only the highest values.**

If you have a large number of values, but you're only interested in the `n` highest (or lowest) ones, you can sort them using *hifo*.

- *hifo* is **fast**. Its [time complexity is `O(n)`](https://en.wikipedia.org/wiki/Time_complexity#Linear_time).
- It is **memory-efficient**. If you specifiy its size as `50`, it will only store 50 values in memory.
- *hifo* works with **numeric values** and **simple objects** out of the box, but you can pass your own [`sort` function](#todo).



## Example

Let's assume we have an **array of people**.

```javascript
var people = [
	{ name: 'Alice', age: 23 },
	{ name: 'Eve', age: 45 },
	{ name: 'Jane', age: 19 },
	{ name: 'Bob', age: 30 },
	{ name: 'John', age: 60 }
];
```

To **find the 3 oldest people**, we reate a new `Hifo` instance and pass the `'age'` as the filter key and `3` as the size.

```javascript
var hifo = require('hifo');

var oldest = hifo(hifo.highest('age'), 3);
for (var person in people) {
	oldest.add(person);
}
```

`oldest.data` will now look like this:

```javascript
[
	{ name: 'John', age: 60 },
	{ name: 'Eve', age: 45 },
	{ name: 'Bob', age: 30 }
]
```

Of course you can do this kind of filtering with `hifo.lowest` as well.



## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/hifo/issues).
