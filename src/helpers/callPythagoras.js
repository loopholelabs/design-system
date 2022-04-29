/**
 * Ask Pythagoras to help us calculate the distance between two points on a 2D plane.
 *
 * @param {import('../types/Vector2.js').Vector2} pointA The starting point.
 * @param {import('../types/Vector2.js').Vector2} pointB The destination point.
 * @returns {number} The distance between the points.
 */
export function callPythagoras(pointA, pointB) {
	const a = (Math.max(pointA.x, pointB.x) - Math.min(pointA.x, pointB.x)) ** 2
	const b = (Math.max(pointA.y, pointB.y) - Math.min(pointA.y, pointB.y)) ** 2

	return Math.sqrt(a + b)
}
