mocha =		require 'mocha'
assert =	require 'assert'

hifo =		require '../src/index.js'





describe 'Hifo', () ->



	describe 'init', () ->

		it 'should require a `sort` function', () ->
			instance = Object.create hifo.Hifo
			assert.throws () ->
				instance.init()
			assert.doesNotThrow () ->
				instance.init hifo.lowest()

		it 'should return the instance`', () ->
			a = Object.create hifo.Hifo
			b = a.init hifo.lowest()
			assert.equal a, b



	describe 'add', () ->

		it 'should fill `data` until `size` is reached', () ->
			instance = hifo hifo.lowest(), 2
			instance.add 2
			instance.add 3
			instance.add 1
			assert.equal instance.data.length, 2

		it 'should sort integer `data` by `lowest`', () ->
			instance = hifo hifo.lowest()
			instance.add 2
			instance.add 3
			instance.add 1
			assert.deepEqual instance.data, [1, 2, 3]

		it 'should sort integer `data` by `highest`', () ->
			instance = hifo hifo.highest()
			instance.add 2
			instance.add 3
			instance.add 1
			assert.deepEqual instance.data, [3, 2, 1]

		it 'should sort object `data` by `lowest(\'value\')`', () ->
			instance = hifo hifo.lowest 'value'
			instance.add { value: 2 }
			instance.add { value: 3 }
			instance.add { value: 1 }
			assert.deepEqual instance.data, [
				{ value: 1 }
				{ value: 2 }
				{ value: 3 }
			]

		it 'should sort object `data` by `lowest(\'a\', \'b\')`', () ->
			instance = hifo hifo.lowest 'a', 'b'
			instance.add { a: 2, b: 2 }
			instance.add { a: 1, b: 3 }
			instance.add { a: 1, b: 0 }
			instance.add { a: 2, b: 3 }
			assert.deepEqual instance.data, [
				{ a: 1, b: 0 }
				{ a: 1, b: 3 }
				{ a: 2, b: 2 }
				{ a: 2, b: 3 }
			]

		it 'should sort object `data` by `highest(\'value\')`', () ->
			instance = hifo hifo.highest 'value'
			instance.add { value: 2 }
			instance.add { value: 3 }
			instance.add { value: 1 }
			assert.deepEqual instance.data, [
				{ value: 3 }
				{ value: 2 }
				{ value: 1 }
			]

		it 'should sort object `data` by `highest(\'a\', \'b\')`', () ->
			instance = hifo hifo.highest 'a', 'b'
			instance.add { a: 1, b: 3 }
			instance.add { a: 1, b: 0 }
			instance.add { a: 2, b: 2 }
			instance.add { a: 2, b: 3 }
			assert.deepEqual instance.data, [
				{ a: 2, b: 3 }
				{ a: 2, b: 2 }
				{ a: 1, b: 3 }
				{ a: 1, b: 0 }
			]

		it 'should not modify the object passed', () ->
			instance = hifo hifo.highest 'value'
			instance.add { name: 'a', value: 1 }
			instance.add { name: 'b', value: 2 }
			assert.deepEqual instance.data, [
				{ name: 'b', value: 2 }
				{ name: 'a', value: 1 }
			]

		it 'should store the passed object directly', () ->
			instance = hifo hifo.highest 'value'
			obj1 = { value: 1 }
			obj2 = { value: 2 }

			instance.add obj1
			instance.add obj2
			assert.equal instance.data[0], obj2
			assert.equal instance.data[1], obj1

		it 'should delete the object first if it is already stored', () ->
			instance = hifo hifo.highest 'value'
			obj1 = { value: 1 }
			instance.add obj1
			instance.add { value: 2 }
			obj1.value = 3   # even if the object has been messed with, the reference stays the same.
			instance.add obj1
			instance.add obj1

			appearances = 0
			for entry in instance.data
				++appearances if entry is obj1
			assert.equal appearances, 1

		it 'should put new but equal objects before the existing', () ->
			instance = hifo hifo.highest 'value'
			obj1 = { value: 2 }
			obj2 = { value: 2 }
			instance.add obj1
			instance.add obj2
			assert instance.data.indexOf(obj1) > instance.data.indexOf obj2

		it 'should not `push` and `pop` too low values', () ->
			# todo: use ECMAScript 2016 `Array.prototype.observe`.
			assert true



	describe 'reset', () ->

		it 'should empty `data`', () ->
			instance = hifo hifo.lowest()
			instance.add 1
			instance.add 2
			instance.reset()
			assert.equal instance.data.length, 0

		it 'should return the instance`', () ->
			a = Object.create hifo.Hifo
			a.init hifo.lowest()
			b = a.reset()
			assert.equal a, b
