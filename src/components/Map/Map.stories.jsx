// Module imports
// import {
// 	randCity,
// 	randLatitude,
// 	randLongitude,
// 	randState,
// 	seed,
// } from '@ngneat/falso'
import React from 'react'





// Local imports
import { Map } from './Map.jsx'





// function generateRandomHops(hopCount = 5) {
// 	const hops = []

// 	let previousDestination = null

// 	let index = 1
// 	while (index < hopCount) {
// 		const hop = []

// 		if (previousDestination) {
// 			hop.push(previousDestination)
// 		} else {
// 			hop.push({
// 				lat: randLatitude(),
// 				lon: randLongitude(),
// 				name: `${randCity()}, ${randState()}`,
// 			})
// 		}

// 		hop.push(previousDestination = {
// 			lat: randLatitude(),
// 			lon: randLongitude(),
// 			name: `${randCity()}, ${randState()}`,
// 		})

// 		hops.push(hop)

// 		index += 1
// 	}

// 	return hops
// }

export default {
	title: 'Example/Map',
	component: Map,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	// argTypes: {
	//   backgroundColor: { control: 'color' },
	// },
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = args => (
	<Map { ...args} />
)

export const Default = Template.bind({})
Default.args = {
	children: 'Map',
	hops: [
		[
			{
				name: '🇨🇦 Toronto',
				lat: 43.641430,
				lon: -79.383403,
			},
			{
				name: '🇺🇸 Madison, WI',
				lat: 43.068922,
				lon: -89.427365,
			},
		],
		[
			{
				name: '🇺🇸 Madison, WI',
				lat: 43.068922,
				lon: -89.427365,
			},
			{
				name: '🇺🇸 Seattle, WA',
				lat: 47.604814,
				lon: -122.339003,
			},
		],
		[
			{
				name: '🇺🇸 Seattle, WA',
				lat: 47.604814,
				lon: -122.339003,
			},
			{
				name: '🇺🇸 Miami, FL',
				lat: 25.761676,
				lon: -80.228087,
			},
		],
		[
			{
				name: '🇺🇸 Miami, FL',
				lat: 25.761676,
				lon: -80.228087,
			},
			{
				name: '🇺🇸 Seattle, WA',
				lat: 31.545489,
				lon: 101.204977,
			},
		],
	],
}
