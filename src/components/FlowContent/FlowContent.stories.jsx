import React from 'react'

import { FlowContent } from './FlowContent.jsx'

export default {
	title: 'Example/FlowContent',
	component: FlowContent,
}

const Template = args => (
	<FlowContent { ...args} />
)

export const Default = Template.bind({})
Default.args = {
	children: 'Flow Content',
}
