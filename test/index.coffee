mocha =		require 'mocha'
assert =	require 'assert'

hifo =		require '../index.js'

x = Math.random()





describe 'index', () ->



	describe 'lowest', () ->

		context '0-ary sort', ->

			it 'should sort numeric values correctly', () ->
				sort = hifo.lowest()
				assert 0 > sort  4,  5
				assert 0 < sort -1, -2

		context '1-ary sort', ->

			it 'should sort object values correctly', () ->
				sort = hifo.lowest 'test'
				assert 0 > sort {test:  4}, {test:  5}
				assert 0 < sort {test: -1}, {test: -2}

			it 'should sort array values correctly', () ->
				sort = hifo.lowest 1
				assert 0 > sort [x,  4, x], [x,  5]
				assert 0 < sort [x, -1],    [x, -2, x]

		context '2-ary sort', ->

			it 'should sort object values correctly', () ->
				sort = hifo.lowest 'foo', 'bar'
				assert 0 > sort {foo:  4},          {foo:  5}
				assert 0 > sort {foo:  1, bar:  4}, {foo:  1, bar:  5}
				assert 0 < sort {foo: -1},          {foo: -2}
				assert 0 < sort {foo:  1, bar: -1}, {foo:  1, bar: -2}

			it 'should sort array values correctly', () ->
				sort = hifo.lowest 1, 0
				assert 0 > sort [x,   4], [ x,  5]
				assert 0 > sort [4,   1], [ 5,  1]
				assert 0 < sort [x,  -1], [ x, -2]
				assert 0 < sort [-1, -1], [-2, -1]



	describe 'highest', () ->

		context '0-ary sort', ->

			it 'should sort numeric values correctly', () ->
				sort = hifo.highest()
				assert 0 < sort  4,  5
				assert 0 > sort -1, -2

		context '1-ary sort', ->

			it 'should sort object values correctly', () ->
				sort = hifo.highest 'test'
				assert 0 < sort {test:  4}, {test:  5}
				assert 0 > sort {test: -1}, {test: -2}

			it 'should sort array values correctly', () ->
				sort = hifo.highest 1
				assert 0 < sort [x,  4, x], [x,  5]
				assert 0 > sort [x, -1],    [x, -2, x]

		context '2-ary sort', ->

			it 'should sort object values correctly', () ->
				sort = hifo.highest 'foo', 'bar'
				assert 0 < sort {foo:  4},          {foo:  5}
				assert 0 < sort {foo:  1, bar:  4}, {foo:  1, bar:  5}
				assert 0 > sort {foo: -1},          {foo: -2}
				assert 0 > sort {foo:  1, bar: -1}, {foo:  1, bar: -2}

			it 'should sort array values correctly', () ->
				sort = hifo.highest 1, 0
				assert 0 < sort [ x,  4], [ x,  5]
				assert 0 < sort [ 4,  1], [ 5,  1]
				assert 0 > sort [ x, -1], [ x, -2]
				assert 0 > sort [-1, -1], [-2, -1]
