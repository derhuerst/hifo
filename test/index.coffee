mocha =		require 'mocha'
assert =	require 'assert'

hifo =		require '../src/index.js'





describe 'index', () ->



	describe 'lowest', () ->

		it 'should sort numeric values correctly', () ->
			sort = hifo.lowest()
			assert 0 > sort 4, 5
			assert 0 < sort -1, -2

		it 'should sort object values correctly', () ->
			sort = hifo.lowest 'test'
			assert 0 > sort { test: 4 }, { test: 5 }
			assert 0 < sort { test: -1 }, { test: -2 }



	describe 'highest', () ->

		it 'should sort numeric values correctly', () ->
			sort = hifo.highest()
			assert 0 < sort 4, 5
			assert 0 > sort -1, -2

		it 'should sort object values correctly', () ->
			sort = hifo.highest 'test'
			assert 0 < sort { test: 4 }, { test: 5 }
			assert 0 > sort { test: -1 }, { test: -2 }
