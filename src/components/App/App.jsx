// Style imports
import './styles/app.scss'





// Module imports
import PropTypes from 'prop-types'





/**
 * An application wrapper. Handles implementation of global styles.
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children Children to be rendered inside the component.
 */
export function App(props) {
	const { children } = props

	return (
		<div className={'application'}>
			{children}
		</div>
	)
}

App.defaultProps = {
	children: null,
}

App.propTypes = {
	children: PropTypes.node,
}
