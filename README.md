# React Is Visible

[![build status](https://img.shields.io/travis/lessp/react-is-visible/master.svg?style=flat-square)](https://travis-ci.org/lessp/react-is-visible)
[![dependencies Status](https://david-dm.org/lessp/react-is-visible/status.svg?style=flat-square)](https://david-dm.org/lessp/react-is-visible)

A simple library that passes an 'isVisible'-prop to components that are using it.

Uses the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

# Table of contents
1. [Polyfill](#polyfill)
2. [Installation](#installation)
3. [Usage](#usage) 
  1. [React Hook](#react-hook)
  2. [HOC](#hoc)
  3. [Render Prop](#render-prop)
4. [License](#license)


## [Polyfill](#polyfilll)

In order to polyfill, install the [polyfill from W3C](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)

    $ npm install intersection-observer --save

... and import it before importing `'react-is-visible'`

eg.

```jsx
// App.js
import React from "react"
import ReactDOM from "react-dom"

import "intersection-observer"
import { withIsVisible } from "react-is-visible"

// ...
```

## [Installation](#installation)

    $ npm install react-is-visible --save

or

    $ yarn add react-is-visible

## [Usage](#usage)

### React Is Visible

#### [React Hook](#react-hook)

```jsx
import React, { useRef } from "react"
import { useIsVisible } from "react-is-visible"

const SomeComponent = () => {
  const nodeRef = useRef()
  const isVisible = useIsVisible(nodeRef)

  return (
    <h1 ref={nodeRef}>
      {isVisible && `I'm visible!`}
    </h1>
  )
}
```

#### [HOC](#hoc)

```jsx
import React from "react"
import { withIsVisible } from "react-is-visible"

const SomeComponent = ({ isVisible }) => <h1>{isVisible && `I'm visible!`}</h1>

export default withIsVisible(SomeComponent)
```

or as a decorator

```jsx
import React from "react"
import { withIsVisible } from "react-is-visible"

@withIsVisible
class SomeClass extends React.Component {
  render() {
    const { isVisible } = this.props

    return <h1>{isVisible && `I'm visible!`}</h1>
  }
}
```

#### [Render Prop](#render-prop)

```jsx
import React from "react"
import IsVisible from "react-is-visible"

const App = () => (
  <IsVisible>
    {isVisible => <h1>{isVisible ? `I'm visible!` : `I'm not visible!`}</h1>}
  </IsVisible>
)
```

## [License](#license)

MIT
