import React from 'react'

import { Button } from './Button.jsx'

export default {
  title: 'Example/Button',
  component: Button,
}

const Template = args => (
  <Button { ...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
}

export const Primary = Template.bind({})
Primary.args = {
  children: 'Button',
  isPrimary: true,
}

export const Large = Template.bind({})
Large.args = {
  children: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  children: 'Button',
  isSmall: true,
}
