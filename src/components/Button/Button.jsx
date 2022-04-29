// Style imports
import styles from './Button.module.scss'





// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





/**
 * A button component.
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children Children to be rendered inside the component.
 * @param {string} props.className Additional classes to be applied to the rendered component.
 * @param {boolean} props.isDisabled Whether or not this component is currently disabled.
 * @param {boolean} props.isFullWidth Whether or not this component should take up the full width of its container.
 * @param {boolean} props.isPrimary Whether or not this component is considered primary.
 * @param {boolean} props.isSmall Whether or not this component should be smaller than normal.
 * @param {Function} props.onClick The function to be called when this component is clicked.
 * @param {'button' | 'submit'} props.type The type of button.
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
export function Button(props) {
	const {
		children,
		className,
		isDisabled,
		isFullWidth,
    isPrimary,
    isSmall,
		onClick,
		type,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles.button, className, {
			[styles['is-primary']]: isPrimary,
			[styles['is-small']]: isSmall,
			[styles['is-full-width']]: isFullWidth,
		})
	}, [
		className,
		isFullWidth,
		isPrimary,
    isSmall,
	])

	const dataProps = useMemo(() => {
		return Object.entries(props).reduce((accumulator, [key, value]) => {
			if (key.startsWith('aria-') || key.startsWith('data-')) {
				accumulator[key] = value
			}

			return accumulator
		}, {})
	}, [props])

	const handleClick = useCallback(event => {
		if (typeof onClick === 'function') {
			onClick(event)
		}
	}, [onClick])

	return (
		// eslint-disable-next-line react/forbid-elements
		<button
			className={compiledClassName}
			disabled={isDisabled}
			onClick={handleClick}
			type={type}
			{...dataProps}>
			<span>{children}</span>
		</button>
	)
}

Button.defaultProps = {
	children: null,
	className: '',
	isDisabled: false,
	isFullWidth: false,
	isSmall: false,
	isPrimary: false,
	onClick: null,
	type: 'button',
}

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	isFullWidth: PropTypes.bool,
	isPrimary: PropTypes.bool,
	isSmall: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.oneOf([
		'button',
		'submit',
	]),
}
