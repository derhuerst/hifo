mocha =		require 'mocha'
assert =	require 'assert'

Hifo =		require '../src/Hifo.js'





describe 'Hifo', () ->



	describe 'init', () ->

		it 'should require a `sort` function', () ->
			instance = Object.create Hifo
			assert.throws () ->
				instance.init()
			assert.doesNotThrow () ->
				instance.init instance.lowest()

		it 'should return the instance`', () ->
			a = Object.create Hifo
			b = a.init a.lowest()
			assert.equal a, b



	describe 'add', () ->

		it 'should fill `data` until `size` is reached', () ->
			instance = Object.create Hifo
			instance.init instance.lowest(), 2
			instance.add 2
			instance.add 3
			instance.add 1
			assert.equal instance.data.length, 2

		it 'should sort integer `data` by `lowest`', () ->
			instance = Object.create Hifo
			instance.init instance.lowest()
			instance.add 2
			instance.add 3
			instance.add 1
			assert.deepEqual instance.data, [1, 2, 3]

		it 'should sort integer `data` by `highest`', () ->
			instance = Object.create Hifo
			instance.init instance.highest()
			instance.add 2
			instance.add 3
			instance.add 1
			assert.deepEqual instance.data, [3, 2, 1]

		it 'should sort object `data` by `lowest(\'value\')`', () ->
			instance = Object.create Hifo
			instance.init instance.lowest('value')
			instance.add { value: 2 }
			instance.add { value: 3 }
			instance.add { value: 1 }
			assert.deepEqual instance.data, [
				{ value: 1 }
				{ value: 2 }
				{ value: 3 }
			]

		it 'should sort object `data` by `highest(\'value\')`', () ->
			instance = Object.create Hifo
			instance.init instance.highest('value')
			instance.add { value: 2 }
			instance.add { value: 3 }
			instance.add { value: 1 }
			assert.deepEqual instance.data, [
				{ value: 3 }
				{ value: 2 }
				{ value: 1 }
			]

		it 'should not modify the object passed', () ->
			instance = Object.create Hifo
			instance.init instance.highest('value')
			instance.add { name: 'a', value: 1 }
			instance.add { name: 'b', value: 2 }
			assert.deepEqual instance.data, [
				{ name: 'b', value: 2 }
				{ name: 'a', value: 1 }
			]

		it 'should store the passed object directly', () ->
			instance = Object.create Hifo
			instance.init instance.highest('value')
			obj1 = { name: 'a', value: 1 }
			obj2 = { name: 'b', value: 2 }

			instance.add obj1
			instance.add obj2
			assert.equal instance.data[0], obj2
			assert.equal instance.data[1], obj1

		it 'should delete the object first if it is already stored', () ->
			instance = Object.create Hifo
			instance.init instance.highest('value')
			obj1 = { name: 'a', value: 1 }
			instance.add obj1
			instance.add { name: 'b', value: 2 }
			obj1.value = 3
			instance.add obj1
			appearances = 0
			for entry in instance.data
				++appearances if entry is obj1
			assert.equal appearances, 1



	describe 'reset', () ->

		it 'should empty `data`', () ->
			instance = Object.create Hifo
			instance.init instance.lowest()
			instance.add 1
			instance.add 2
			instance.reset()
			assert.equal instance.data.length, 0

		it 'should return the instance`', () ->
			a = Object.create Hifo
			a.init a.lowest()
			b = a.reset()
			assert.equal a, b
