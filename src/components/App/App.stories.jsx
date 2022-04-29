import React from 'react'

import { App } from './App.jsx'

export default {
  title: 'Example/App',
  component: App,
}

const Template = args => (
  <App { ...args} />
)

export const ExampleApp = Template.bind({})
ExampleApp.args = {
  children: 'Stuff',
}
