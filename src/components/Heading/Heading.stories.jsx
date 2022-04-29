import React from 'react'

import { Heading } from './Heading.jsx'

export default {
  title: 'Example/Heading',
  component: Heading,
}

const Template = args => (
  <Heading { ...args} />
)

export const Level1 = Template.bind({})
Level1.args = {
  children: 'Level 1 Heading',
  level: 1,
}

export const Level2 = Template.bind({})
Level2.args = {
  children: 'Level 2 Heading',
  level: 2,
}

export const Level3 = Template.bind({})
Level3.args = {
  children: 'Level 3 Heading',
  level: 3,
}

export const Level4 = Template.bind({})
Level4.args = {
  children: 'Level 4 Heading',
  level: 4,
}

export const Level5 = Template.bind({})
Level5.args = {
  children: 'Level 5 Heading',
  level: 5,
}

export const Level6 = Template.bind({})
Level6.args = {
  children: 'Level 6 Heading',
  level: 6,
}
