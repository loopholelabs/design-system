// Style imports
import styles from './FlowContent.module.scss'





// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





/**
 * Wraps flow content with the appropriate styles. Most suitable for areas of substantial readable content, such as a blog.
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children Children to be rendered inside the component.
 * @param {string} props.className Additional classes to be applied to the rendered component.
 * @example
 * const [counter, setCounter] = useState(0)
 * const handleClick = useCallback(event => {
 *  console.log('Event target:', event.target)
 *  setCounter(previousState => previousState + 1)
 * }, [setCounter])
 *
 * return (
 *   <Button onClick={handleClick}>
 *    {`Current count: ${counter}`}
 *   </Button>
 * )
 */
export function FlowContent(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => classnames(styles['flow-content'], className), [className])

	return (
		<div className={compiledClassName}>
			{children}
		</div>
	)
}

FlowContent.defaultProps = {
	children: null,
	className: '',
}

FlowContent.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
