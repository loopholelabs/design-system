// Style imports
import styles from './Map.module.scss'





// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { getPixelsFromCoordinates } from '../../helpers/getPixelsFromCoordinates.js'
import { Hop } from './Hop.jsx'
import MAP_DATA1 from './grid.level1.json'
import MAP_DATA2 from './grid.level2.json'
import MAP_DATA3 from './grid.level3.json'





// Constants
const MINIMUM_VIEWBOX_PADDING = 20





/**
 * A map component for rendering hops on a map.
 *
 * @component
 * @param {object} props All props.
 * @param {string} props.className Additional classes to be applied to the rendered component.
 * @param {number} props.height The height of the map.
 * @param {object[]} props.hops An array of hops to be rendered
 * @param {number} props.width The width of the map.
 */
export function Map(props) {
	const {
		className,
		height,
		hops,
		width,
	} = props

	const compiledClassName = useMemo(() => classnames(styles.map, className), [className])
	const [currentHopIndex, setCurrentHopIndex] = useState(0)
	const [currentMapSource, setCurrentMapSource] = useState(MAP_DATA1)

	const mappedElements = useMemo(() => {
		return currentMapSource
			.elements
			.map((element, index) => {
				switch (element.type) {
					case 'path': {
						const {
							id,
							name,
							path: pathString,
						} = element

						return (
							<path
								key={id}
								className={styles.block}
								d={pathString}
								data-name={name} />
						)
					}

					case 'rect': {
						const {
							height,
							width,
							x,
							y,
						} = element

						return (
							<rect
								key={index}
								className={styles.cell}
								height={height}
								width={width}
								x={x}
								y={y} />
						)
					}

					default:
						return null
				}
			})
	}, [currentMapSource])

	const pixelHops = useMemo(() => {
		return hops.map(([source, destination]) => {
			const destinationPosition = getPixelsFromCoordinates(destination, currentMapSource)
			const sourcePosition = getPixelsFromCoordinates(source, currentMapSource)

			destinationPosition.name = destination.name
			sourcePosition.name = source.name

			return {
				destinationPosition,
				sourcePosition,
			}
		})
	}, [
		currentMapSource,
		hops,
	])

	const addNextHop = useCallback(() => {
		setCurrentHopIndex(previousState => {
			if (previousState < hops.length) {
				return previousState + 1
			}

			return previousState
		})
	}, [
		hops,
		setCurrentHopIndex,
	])

	const viewBox = useMemo(() => {
		const renderBounds = pixelHops.reduce((accumulator, hop) => {
			return {
				maximumX: Math.max(accumulator.maximumX, hop.sourcePosition.x, hop.destinationPosition.x),
				maximumY: Math.max(accumulator.maximumY, hop.sourcePosition.y, hop.destinationPosition.y),
				minimumX: Math.min(accumulator.minimumX, hop.sourcePosition.x, hop.destinationPosition.x),
				minimumY: Math.min(accumulator.minimumY, hop.sourcePosition.y, hop.destinationPosition.y),
			}
		}, {
			maximumX: 0,
			maximumY: 0,
			minimumX: currentMapSource.width,
			minimumY: currentMapSource.height,
		})

		const minimumX = Math.max(renderBounds.minimumX - MINIMUM_VIEWBOX_PADDING, 0)
		const minimumY = Math.max(renderBounds.minimumY - MINIMUM_VIEWBOX_PADDING, 0)
		const totalHeight = (renderBounds.maximumY - minimumY) + MINIMUM_VIEWBOX_PADDING
		const totalWidth = (renderBounds.maximumX - minimumX) + MINIMUM_VIEWBOX_PADDING

		return {
			height: totalHeight,
			minimumX,
			minimumY,
			width: totalWidth,
		}
	}, [
		currentMapSource,
		pixelHops,
	])

	const hopComponents = useMemo(() => {
		const scale = viewBox.width / width

		return pixelHops
			.slice(0, currentHopIndex + 1)
			.map((hopDetails, index) => (
				<Hop
					key={index}
					{...hopDetails}
					onAnimationComplete={addNextHop}
					scale={scale} />
			))
	}, [
		addNextHop,
		currentHopIndex,
		pixelHops,
		viewBox,
		width,
	])

	useEffect(() => {
		const percentageOfTotalWidth = viewBox.width / currentMapSource.width
		const oneThird = 3 / 10
		const twoThirds = 0.7

		if ((percentageOfTotalWidth < oneThird) && (currentMapSource !== MAP_DATA3)) {
			setCurrentMapSource(MAP_DATA3)
		} else if ((percentageOfTotalWidth < twoThirds) && (currentMapSource !== MAP_DATA2)) {
			setCurrentMapSource(MAP_DATA2)
		} else if ((percentageOfTotalWidth > twoThirds) && (currentMapSource !== MAP_DATA1)) {
			setCurrentMapSource(MAP_DATA1)
		}
	}, [
		currentMapSource,
		setCurrentMapSource,
		viewBox,
	])

	return (
		<svg
			className={compiledClassName}
			height={height}
			viewBox={`${viewBox.minimumX} ${viewBox.minimumY} ${viewBox.width} ${viewBox.height}`}
			width={width}>
			<g>
				<g className={'grid'}>
					{mappedElements}

					{/* <polygon points="255.1,300.1 255.1,302.9 257.9,302.9 257.9,300.1 255.1,300.1 "/>
					<polygon points="255.1,297.1 255.1,299.9 257.9,299.9 257.9,297.1 255.1,297.1 "/>
					<polygon points="255.1,288.1 255.1,290.9 257.9,290.9 257.9,288.1 255.1,288.1 "/>
					<polygon points="255.1,303.1 255.1,305.9 257.9,305.9 257.9,303.1 255.1,303.1 "/>
					<polygon points="255.1,291.1 255.1,293.9 257.9,293.9 257.9,291.1 255.1,291.1 "/>
					<polygon points="255.1,294.1 255.1,296.9 257.9,296.9 257.9,294.1 255.1,294.1 "/>
					<polygon points="255.1,321.1 255.1,323.9 257.9,323.9 257.9,321.1 255.1,321.1 "/>
					<polygon points="255.1,306.1 255.1,308.9 257.9,308.9 257.9,306.1 255.1,306.1 "/>
					<polygon points="255.1,315.1 255.1,317.9 257.9,317.9 257.9,315.1 255.1,315.1 "/>
					<polygon points="255.1,309.1 255.1,311.9 257.9,311.9 257.9,309.1 255.1,309.1 "/>
					<polygon points="255.1,312.1 255.1,314.9 257.9,314.9 257.9,312.1 255.1,312.1 "/>
					<polygon points="255.1,318.1 255.1,320.9 257.9,320.9 257.9,318.1 255.1,318.1 "/>
					<polygon points="255.1,243.1 255.1,245.9 257.9,245.9 257.9,243.1 255.1,243.1 "/>
					<polygon points="255.1,240.1 255.1,242.9 257.9,242.9 257.9,240.1 255.1,240.1 "/>
					<polygon points="255.1,285.1 255.1,287.9 257.9,287.9 257.9,285.1 255.1,285.1 "/>
					<polygon points="255.1,237.1 255.1,239.9 257.9,239.9 257.9,237.1 255.1,237.1 "/>
					<polygon points="255.1,279.1 255.1,281.9 257.9,281.9 257.9,279.1 255.1,279.1 "/>
					<polygon points="255.1,255.1 255.1,257.9 257.9,257.9 257.9,255.1 255.1,255.1 "/>
					<polygon points="255.1,282.1 255.1,284.9 257.9,284.9 257.9,282.1 255.1,282.1 "/>
					<polygon points="255.1,276.1 255.1,278.9 257.9,278.9 257.9,276.1 255.1,276.1 "/>
					<polygon points="255.1,393.1 255.1,395.9 257.9,395.9 257.9,393.1 255.1,393.1 "/>
					<polygon points="255.1,390.1 255.1,392.9 257.9,392.9 257.9,390.1 255.1,390.1 "/>
					<polygon points="255.1,324.1 255.1,326.9 257.9,326.9 257.9,324.1 255.1,324.1 "/>
					<polygon points="255.1,96.1 255.1,98.9 257.9,98.9 257.9,96.1 255.1,96.1 "/>
					<polygon points="255.1,57.1 255.1,59.9 257.9,59.9 257.9,57.1 255.1,57.1 "/>
					<polygon points="255.1,54.1 255.1,56.9 257.9,56.9 257.9,54.1 255.1,54.1 "/>
					<polygon points="255.1,51.1 255.1,53.9 257.9,53.9 257.9,51.1 255.1,51.1 "/>
					<polygon points="255.1,48.1 255.1,50.9 257.9,50.9 257.9,48.1 255.1,48.1 "/>
					<polygon points="255.1,60.1 255.1,62.9 257.9,62.9 257.9,60.1 255.1,60.1 "/>
					<polygon points="255.1,75.1 255.1,77.9 257.9,77.9 257.9,75.1 255.1,75.1 "/>
					<polygon points="255.1,72.1 255.1,74.9 257.9,74.9 257.9,72.1 255.1,72.1 "/>
					<polygon points="255.1,69.1 255.1,71.9 257.9,71.9 257.9,69.1 255.1,69.1 "/>
					<polygon points="255.1,45.1 255.1,47.9 257.9,47.9 257.9,45.1 255.1,45.1 "/>
					<polygon points="255.1,63.1 255.1,65.9 257.9,65.9 257.9,63.1 255.1,63.1 "/>
					<polygon points="255.1,15.1 255.1,17.9 257.9,17.9 257.9,15.1 255.1,15.1 "/>
					<polygon points="255.1,18.1 255.1,20.9 257.9,20.9 257.9,18.1 255.1,18.1 "/>
					<polygon points="255.1,21.1 255.1,23.9 257.9,23.9 257.9,21.1 255.1,21.1 "/>
					<polygon points="255.1,78.1 255.1,80.9 257.9,80.9 257.9,78.1 255.1,78.1 "/>
					<polygon points="255.1,24.1 255.1,26.9 257.9,26.9 257.9,24.1 255.1,24.1 "/>
					<polygon points="255.1,27.1 255.1,29.9 257.9,29.9 257.9,27.1 255.1,27.1 "/>
					<polygon points="255.1,42.1 255.1,44.9 257.9,44.9 257.9,42.1 255.1,42.1 "/>
					<polygon points="255.1,39.1 255.1,41.9 257.9,41.9 257.9,39.1 255.1,39.1 "/>
					<polygon points="255.1,36.1 255.1,38.9 257.9,38.9 257.9,36.1 255.1,36.1 "/>
					<polygon points="255.1,33.1 255.1,35.9 257.9,35.9 257.9,33.1 255.1,33.1 "/>
					<polygon points="255.1,30.1 255.1,32.9 257.9,32.9 257.9,30.1 255.1,30.1 "/>
					<polygon points="255.1,66.1 255.1,68.9 257.9,68.9 257.9,66.1 255.1,66.1 "/>
					<polygon points="255.1,177.1 255.1,179.9 257.9,179.9 257.9,177.1 255.1,177.1 "/>
					<polygon points="255.1,180.1 255.1,182.9 257.9,182.9 257.9,180.1 255.1,180.1 "/>
					<polygon points="255.1,174.1 255.1,176.9 257.9,176.9 257.9,174.1 255.1,174.1 "/>
					<polygon points="255.1,165.1 255.1,167.9 257.9,167.9 257.9,165.1 255.1,165.1 "/>
					<polygon points="255.1,171.1 255.1,173.9 257.9,173.9 257.9,171.1 255.1,171.1 "/>
					<polygon points="255.1,168.1 255.1,170.9 257.9,170.9 257.9,168.1 255.1,168.1 "/>
					<polygon points="255.1,192.1 255.1,194.9 257.9,194.9 257.9,192.1 255.1,192.1 "/>
					<polygon points="255.1,81.1 255.1,83.9 257.9,83.9 257.9,81.1 255.1,81.1 "/>
					<polygon points="255.1,186.1 255.1,188.9 257.9,188.9 257.9,186.1 255.1,186.1 "/>
					<polygon points="255.1,189.1 255.1,191.9 257.9,191.9 257.9,189.1 255.1,189.1 "/>
					<polygon points="255.1,183.1 255.1,185.9 257.9,185.9 257.9,183.1 255.1,183.1 "/>
					<polygon points="255.1,93.1 255.1,95.9 257.9,95.9 257.9,93.1 255.1,93.1 "/>
					<polygon points="255.1,90.1 255.1,92.9 257.9,92.9 257.9,90.1 255.1,90.1 "/>
					<polygon points="255.1,84.1 255.1,86.9 257.9,86.9 257.9,84.1 255.1,84.1 "/>
					<polygon points="255.1,87.1 255.1,89.9 257.9,89.9 257.9,87.1 255.1,87.1 "/>
					<polygon points="255.1,156.1 255.1,158.9 257.9,158.9 257.9,156.1 255.1,156.1 "/>
					<polygon points="255.1,162.1 255.1,164.9 257.9,164.9 257.9,162.1 255.1,162.1 "/>
					<polygon points="255.1,159.1 255.1,161.9 257.9,161.9 257.9,159.1 255.1,159.1 "/>
					<polygon points="255.1,102.1 255.1,104.9 257.9,104.9 257.9,102.1 255.1,102.1 "/>
					<polygon points="255.1,99.1 255.1,101.9 257.9,101.9 257.9,99.1 255.1,99.1 "/>
					<polygon points="255.1,153.1 255.1,155.9 257.9,155.9 257.9,153.1 255.1,153.1 "/> */}
				</g>

				<g className={'hops'}>
					{hopComponents}
				</g>
			</g>
		</svg>
	)
}

Map.defaultProps = {
	className: '',
	height: 665.96301,
	hops: [],
	width: 1009.6727,
}

Map.propTypes = {
	className: PropTypes.string,
	height: PropTypes.number,
	hops: PropTypes.array,
	width: PropTypes.number,
}
