// Style imports
import styles from './Box.module.scss'





// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





/**
 * An application wrapper. Handles implementation of global styles.
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children Children to be rendered inside the component.
 * @param {string} props.className Additional classes to be applied to the rendered component.
 * @example
 * return (
 *   <Heading onClick={handleClick}>
 *    {`Current count: ${counter}`}
 *   </Heading>
 * )
 */
export function Box(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => classnames(styles.box, className), [className])

	return (
		<div className={compiledClassName}>
			{children}
		</div>
	)
}

Box.defaultProps = {
	children: null,
	className: '',
}

Box.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
