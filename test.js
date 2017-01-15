'use strict'

const test = require('tape')

const hifo = require('.')

const x = Math.random()



test('lowest: 0-ary sort', (t) => {
	t.plan(2)

	// should sort numeric values correctly
	const f = hifo.lowest()
	t.ok(0 > f(4, 5))
	t.ok(0 < f(-1, -2))
})

test('lowest: 1-ary sort', (t) => {
	t.plan(4)

	// should sort object values correctly
	const f = hifo.lowest('test')
	t.ok(0 > f({test: 4}, {test: 5}))
	t.ok(0 < f({test: -1}, {test: -2}))

	// should sort array values correctly
	const g = hifo.lowest(1)
	t.ok(0 > g([x, 4, x], [x, 5]))
	t.ok(0 < g([x, -1], [x, -2, x]))
})

test('lowest: 2-ary sort', (t) => {
	t.plan(8)

	// should sort object values correctly
	const f = hifo.lowest('foo', 'bar')
	t.ok(0 > f({foo: 4}, {foo: 5}))
	t.ok(0 > f({foo: 1, bar: 4}, {foo: 1, bar: 5}))
	t.ok(0 < f({foo: -1}, {foo: -2}))
	t.ok(0 < f({foo: 1, bar: -1}, {foo: 1, bar: -2}))

	// should sort array values correctly
	const g = hifo.lowest(1, 0)
	t.ok(0 > g([x, 4], [x, 5]))
	t.ok(0 > g([4, 1], [5, 1]))
	t.ok(0 < g([x, -1], [x, -2]))
	t.ok(0 < g([-1, -1], [-2, -1]))
})



test('highest: 0-ary sort', (t) => {
	t.plan(2)

	// should sort numeric values correctly
	const f = hifo.highest()
	t.ok(0 < f(4, 5))
	t.ok(0 > f(-1, -2))
})

test('highest: 1-ary sort', (t) => {
	t.plan(4)

	// should sort object values correctly
	const f = hifo.highest('test')
	t.ok(0 < f({test: 4}, {test: 5}))
	t.ok(0 > f({test: -1}, {test: -2}))

	// should sort array values correctly
	const g = hifo.highest(1)
	t.ok(0 < g([x, 4, x], [x, 5]))
	t.ok(0 > g([x, -1], [x, -2, x]))
})

test('highest: 2-ary sort', (t) => {
	t.plan(8)

	// should sort object values correctly
	const f = hifo.highest('foo', 'bar')
	t.ok(0 < f({foo: 4}, {foo: 5}))
	t.ok(0 < f({foo: 1, bar: 4}, {foo: 1, bar: 5}))
	t.ok(0 > f({foo: -1}, {foo: -2}))
	t.ok(0 > f({foo: 1, bar: -1}, {foo: 1, bar: -2}))

	// should sort array values correctly
	const g = hifo.highest(1, 0)
	t.ok(0 < g([x, 4], [x, 5]))
	t.ok(0 < g([4, 1], [5, 1]))
	t.ok(0 > g([x, -1], [x, -2]))
	t.ok(0 > g([-1, -1], [-2, -1]))
})



test('Hifo.init', (t) => {
	t.plan(3)

	// should require a `sort` function
	const h = Object.create(hifo.Hifo)
	t.throws(() => h.init())
	t.doesNotThrow(() => h.init(hifo.lowest()))

	// should return the instance
	const a = Object.create(hifo.Hifo)
	const b = a.init(hifo.lowest())
	t.equal(a, b)
})

test('Hifo.add', (t) => {
	t.plan(12)

	// should fill `data` until `size` is reached
	const h1 = hifo(hifo.lowest(), 2)
	h1.add(2)
	h1.add(3)
	h1.add(1)
	t.equal(h1.data.length, 2)

	// should sort integer `data` by `lowest`
	const h2 = hifo(hifo.lowest())
	h2.add(2)
	h2.add(3)
	h2.add(1)
	t.deepEqual(h2.data, [1, 2, 3])

	// should sort integer `data` by `highest`
	const h3 = hifo(hifo.highest())
	h3.add(2)
	h3.add(3)
	h3.add(1)
	t.deepEqual(h3.data, [3, 2, 1])

	// should sort object `data` by `lowest('value')`
	const h4 = hifo(hifo.lowest('value'))
	h4.add({value: 2})
	h4.add({value: 3})
	h4.add({value: 1})
	t.deepEqual(h4.data, [{value: 1}, {value: 2}, {value: 3}])

	// should sort object `data` by `lowest(\'a\', \'b\')`
	const h5 = hifo(hifo.lowest('a', 'b'))
	h5.add({a: 2, b: 2})
	h5.add({a: 1, b: 3})
	h5.add({a: 1, b: 0})
	h5.add({a: 2, b: 3})
	t.deepEqual(h5.data, [
		{a: 1, b: 0},
		{a: 1, b: 3},
		{a: 2, b: 2},
		{a: 2, b: 3}
	])

	// should sort object `data` by `highest(\'value\')`
	const h6 = hifo(hifo.highest('value'))
	h6.add({value: 2})
	h6.add({value: 3})
	h6.add({value: 1})
	t.deepEqual(h6.data, [{value: 3}, {value: 2}, {value: 1}])

	// should sort object `data` by `highest(\'a\', \'b\')`
	const h7 = hifo(hifo.highest('a', 'b'))
	h7.add({a: 1, b: 3})
	h7.add({a: 1, b: 0})
	h7.add({a: 2, b: 2})
	h7.add({a: 2, b: 3})
	t.deepEqual(h7.data, [
		{a: 2, b: 3},
		{a: 2, b: 2},
		{a: 1, b: 3},
		{a: 1, b: 0}
	])

	// should not modify the object passed
	const h8 = hifo(hifo.highest('value'))
	h8.add({name: 'a', value: 1})
	h8.add({name: 'b', value: 2})
	t.deepEqual(h8.data, [{name: 'b', value: 2}, {name: 'a', value: 1}])

	// should store the passed object directly
	const h9 = hifo(hifo.highest('value'))
	const obj1 = {value: 1}
	const obj2 = {value: 2}

	h9.add(obj1)
	h9.add(obj2)
	t.equal(h9.data[0], obj2)
	t.equal(h9.data[1], obj1)

	// should delete the object first if it is already stored
	const h10 = hifo(hifo.highest('value'))
	const obj3 = {value: 1}
	h10.add(obj3)
	h10.add({value: 2})
	obj3.value = 3 // even if the object has been messed with, the reference stays the same.
	h10.add(obj3)
	h10.add(obj3)

	const appearances = h10.data.filter((entry) => entry === obj3).length
	t.equal(appearances, 1)

	// should put new but equal objects before the existing
	const h11 = hifo(hifo.highest('value'))
	const obj4 = {value: 2}
	const obj5 = {value: 2}
	h11.add(obj4)
	h11.add(obj5)
	t.ok(h11.data.indexOf(obj4) > h11.data.indexOf(obj5))
})

test('Hifo.reset', (t) => {
	t.plan(2)

	// should empty `data`
	const h1 = hifo(hifo.lowest())
	h1.add(1)
	h1.add(2)
	h1.reset()
	t.deepEqual(h1.data, [])

	// should return the instance
	const h2 = Object.create(hifo.Hifo)
	h2.init(hifo.lowest())
	t.equal(h2.reset(), h2)
})
