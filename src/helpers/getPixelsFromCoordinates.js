/**
 * Translates latitude/longitude coordinates to a pixel position for a given Mercator projection map.
 *
 * @param {import('../types/GPSCoordinates.js').GPSCoordinates} coordinates The coordinates of the point to translate.
 * @param {import('../types/MapData.js').MapData} mapData The map data to be used for the translation.
 * @returns {import('../types/Vector2.js').Vector2} The translated position.
 */
export function getPixelsFromCoordinates(coordinates, mapData) {
	const {
		lat,
		lon,
	} = coordinates

	const longitudeDelta = mapData.bounds.right - mapData.bounds.left
	const latitudeBottomRadians = (mapData.bounds.bottom * Math.PI) / 180
	const latitudeRadians = (lat * Math.PI) / 180
	const mercatorMapWidth = ((mapData.width / longitudeDelta) * 360) / (2 * Math.PI)
	const offsetY = (mercatorMapWidth / 2 * Math.log((1 + Math.sin(latitudeBottomRadians)) / (1 - Math.sin(latitudeBottomRadians))))

	const x = (lon - mapData.bounds.left) * (mapData.width / longitudeDelta)
	let y = null

	if (lat === 90) {
		y = 0
	} else if (lat === -90) {
		y = mapData.height
	} else {
		y = mapData.height - ((mercatorMapWidth / 2 * Math.log((1 + Math.sin(latitudeRadians)) / (1 - Math.sin(latitudeRadians)))) - offsetY)
	}

	return {
		x,
		y,
	}
}
