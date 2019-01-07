import { configure, addDecorator } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(req)
}

addDecorator(withNotes)

configure(loadStories, module)
