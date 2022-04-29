const cheerio = require('cheerio')
const fs = require('fs/promises')
const path = require('path')

;(async function () {
	const svgsPath = path.join(process.cwd(), 'public', 'images')
	const jsonsPath = path.join(process.cwd(), 'components', 'Map')

	const svgFiles = await fs.readdir(svgsPath)

	for (const filename of svgFiles) {
		const svgPath = path.join(svgsPath, filename)
		const jsonPath = path.join(jsonsPath, filename.replace(path.extname(filename), '.json'))

		const svgContent = await fs.readFile(svgPath, 'utf8')

		const $ = cheerio.load(svgContent, {
			xml: {
				normalizeWhitespace: true,
			},
		})

		const elements = $('path, rect')
		const svgElement = $('svg').get(0)

		// console.log(filename, svgElement.attribs)

		const [
			left,
			top,
			right,
			bottom,
		] = svgElement
			.attribs['mapsvg:geoViewBox']
			.split(' ')

		const svgObject = {
			bounds: {
				bottom: Number(bottom),
				left: Number(left),
				right: Number(right),
				top: Number(top),
			},
			elements: [],
			height: Number(svgElement.attribs.height),
			width: Number(svgElement.attribs.width),
		}

		elements.each((_, item) => {
			switch (item.name) {
				case 'path':
					svgObject.elements.push({
						id: item.attribs.id,
						name: item.attribs.title,
						path: item.attribs.d,
						type: item.name,
					})
					break

				case 'rect':
					svgObject.elements.push({
						height: item.attribs.height,
						type: item.name,
						width: item.attribs.width,
						x: item.attribs.x,
						y: item.attribs.y,
					})
					break
			}
		})

		await fs.writeFile(jsonPath, JSON.stringify(svgObject), 'utf8')
	}

	// const svgPath = path.join(process.cwd(), 'public', 'images', 'world.svg')
	// const svgContent = await fs.readFile(svgPath, 'utf8')

	// const CONTINENTS = []

	// const $ = cheerio.load(svgContent, {
	// 	xml: {
	// 		normalizeWhitespace: true,
	// 	},
	// })

	// const pathElements = $('path')
	// const svgElement = $('svg').get(0)

	// pathElements.each((index, item) => {
	// 	const {
	// 		d: path,
	// 		id,
	// 		title: name,
	// 	} = item.attribs

	// 	CONTINENTS.push({
	// 		id,
	// 		name,
	// 		path,
	// 	})
	// })

	// const [
	// 	left,
	// 	top,
	// 	right,
	// 	bottom,
	// ] = svgElement
	// 	.attribs['mapsvg:geoViewBox']
	// 	.split(' ')

	// await fs.writeFile(jsonPath, JSON.stringify({
	// 	bounds: {
	// 		bottom: Number(bottom),
	// 		left: Number(left),
	// 		right: Number(right),
	// 		top: Number(top),
	// 	},
	// 	continents: CONTINENTS,
	// 	height: Number(svgElement.attribs.height),
	// 	width: Number(svgElement.attribs.width),
	// }), 'utf8')
})()
