import React from 'react'

import { Box } from './Box.jsx'

export default {
  title: 'Example/Box',
  component: Box,
}

const Template = args => (
  <Box { ...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Box',
}
