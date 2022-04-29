// Style imports
import styles from './Hop.module.scss'





// Module imports
import {
	animate,
	motion,
	useMotionValue,
} from 'framer-motion'
import {
	useEffect,
	useMemo,
	// useRef,
	// useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { callPythagoras } from '../../helpers/callPythagoras.js'





// Constants
// const HORIZONTAL_PADDING = 2
// const VERTICAL_PADDING = 1





/**
 * Renders a single hop for a `<Map>` component.
 *
 * @component
 * @param {object} props All props.
 * @param {import('../../types/HopPosition.js').HopPosition} props.destinationPosition The destination position of the hop.
 * @param {Function} props.onAnimationComplete The function to be called when this hop is done animating.
 * @param {number} props.scale The scale of the map.
 * @param {import('../../types/HopPosition.js').HopPosition} props.sourcePosition The source position of the hop.
 */
export function Hop(props) {
	const {
		destinationPosition,
		onAnimationComplete,
		scale,
		sourcePosition,
	} = props
	// const [destinationTextBoundingBox, setDestinationTextBoundingBox] = useState({
	// 	height: 0,
	// 	width: 0,
	// })
	// const [sourceTextBoundingBox, setSourceTextBoundingBox] = useState({
	// 	height: 0,
	// 	width: 0,
	// })

	// const destinationTextRef = useRef(null)
	// const sourceTextRef = useRef(null)

	const motionValue = useMotionValue(0)
	const linearHopDistance = useMemo(() => {
		return callPythagoras(destinationPosition, sourcePosition)
	}, [
		destinationPosition,
		sourcePosition,
	])

	// Hop arc
	const arc = useMemo(() => {
		const direction = Number(sourcePosition.x > destinationPosition.x) || -1
		const xControlOffset = linearHopDistance / 3
		const yControlOffset = Math.max(sourcePosition.y, destinationPosition.y) - Math.abs(sourcePosition.y - destinationPosition.y) - 5

		return {
			endControlX: destinationPosition.x + (xControlOffset * direction),
			controlY: yControlOffset,
			startControlX: sourcePosition.x - (xControlOffset * direction),
		}
	}, [
		destinationPosition,
		linearHopDistance,
		sourcePosition,
	])

	useEffect(() => {
		const controls = animate(motionValue, 1, {
			duration: linearHopDistance / 200,
			ease: 'easeInOut',
			// eslint-disable-next-line jsdoc/require-jsdoc
			onComplete() {
				if (typeof onAnimationComplete === 'function') {
					onAnimationComplete()
				}
			},
		})

		return () => controls.stop()
	}, [
		linearHopDistance,
		motionValue,
		onAnimationComplete,
	])

	// useEffect(() => {
	// 	setDestinationTextBoundingBox(destinationTextRef.current.getBBox())
	// 	setSourceTextBoundingBox(sourceTextRef.current.getBBox())
	// }, [
	// 	setDestinationTextBoundingBox,
	// 	setSourceTextBoundingBox,
	// ])

	return (
		<g
			className={styles.hop}
			style={{ '--map-scale': scale }}>
			<motion.path
				className={styles['hop-arc']}
				d={`M${sourcePosition.x}, ${sourcePosition.y}
				C${arc.startControlX}, ${arc.controlY}
				${arc.endControlX}, ${arc.controlY}
				${destinationPosition.x}, ${destinationPosition.y}`}
				pathLength={motionValue} />

			{/* <svg
				className={styles['hop-label']}
				height={sourceTextBoundingBox.height + (VERTICAL_PADDING * 2)}
				x={sourcePosition.x}
				y={sourcePosition.y}
				width={sourceTextBoundingBox.width + (HORIZONTAL_PADDING * 2)}>
				<motion.rect
					fill="white"
					height={sourceTextBoundingBox.height + (VERTICAL_PADDING * 2)}
					width={sourceTextBoundingBox.width + (HORIZONTAL_PADDING * 2)}
					// x={sourcePosition.x - (sourceTextBoundingBox.width / 2) - HORIZONTAL_PADDING}
					// y={sourcePosition.y - sourceTextBoundingBox.height}
					 />

				<text
					ref={sourceTextRef}
					x="50%"
					y="50%"
					// x={sourcePosition.x}
					// y={sourcePosition.y}
					>
					{sourcePosition.name}
				</text>
			</svg>

			<svg
				className={styles['hop-label']}
				height={sourceTextBoundingBox.height + (VERTICAL_PADDING * 2)}
				x={destinationPosition.x}
				y={destinationPosition.y}
				width={sourceTextBoundingBox.width + (HORIZONTAL_PADDING * 2)}>
				<motion.rect
					fill="white"
					height={destinationTextBoundingBox.height + (VERTICAL_PADDING * 2)}
					width={destinationTextBoundingBox.width + (HORIZONTAL_PADDING * 2)}
					// x={destinationPosition.x - (destinationTextBoundingBox.width / 2) - HORIZONTAL_PADDING}
					// y={destinationPosition.y - destinationTextBoundingBox.height}
					 />

				<text
					ref={destinationTextRef}
					x="50%"
					y="50%"
					// x={destinationPosition.x}
					// y={destinationPosition.y}
					>
					{destinationPosition.name}
				</text>
			</svg> */}
		</g>
	)
}

Hop.defaultProps = {
	onAnimationComplete: null,
	scale: 1,
}

Hop.propTypes = {
	destinationPosition: PropTypes.exact({
		name: PropTypes.string.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}).isRequired,
	onAnimationComplete: PropTypes.func,
	scale: PropTypes.number,
	sourcePosition: PropTypes.exact({
		name: PropTypes.string.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}).isRequired,
}
