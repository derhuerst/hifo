'use strict'

const {Suite} = require('benchmark')

const hifo = require('.')

const items = []
for (let i = 0; i < 10000; i++) {
	items.push([
		Math.round(Math.random() * 100),
		i
	])
}

new Suite()
.add('10000 items', function () {
	const h = hifo(hifo.lowest(0))
	const l = items.length
	for (let i = 0; i < l; i++) h.add(items[i])
	h.data
})

.on('error', (err) => {
	console.error(err)
	process.exitCode = 1
})
.on('cycle', (e) => {
	console.log(e.target.toString())
})
.run()
