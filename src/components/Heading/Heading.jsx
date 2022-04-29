// Style imports
import styles from './Heading.module.scss'





// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





/**
 * A heading component for rendering headings at any depth (h1-h6).
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children Children to be rendered inside the component.
 * @param {string} props.className Additional classes to be applied to the rendered component.
 * @param {1 | 2 | 3 | 4 | 5 | 6} props.level The heading level.
 * @example
 * return (
 *   <Heading level={2}>
 *    {`Current count: ${counter}`}
 *   </Heading>
 * )
 */
export function Heading(props) {
	const {
		children,
		className,
		level,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles.heading, className)
	}, [className])

	switch (level) {
		case 1:
			return (
				<h1 className={compiledClassName}>
					{children}
				</h1>
			)

		case 2:
			return (
				<h2 className={compiledClassName}>
					{children}
				</h2>
			)

		case 3:
			return (
				<h3 className={compiledClassName}>
					{children}
				</h3>
			)

		case 4:
			return (
				<h4 className={compiledClassName}>
					{children}
				</h4>
			)

		case 5:
			return (
				<h5 className={compiledClassName}>
					{children}
				</h5>
			)

		case 6:
			return (
				<h6 className={compiledClassName}>
					{children}
				</h6>
			)

		default:
			throw new Error('Heading components require a `level` prop.')
	}
}

Heading.defaultProps = {
	children: null,
	className: '',
}

Heading.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	level: PropTypes.number.isRequired,
}
