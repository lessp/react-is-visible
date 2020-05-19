# React Is Visible

[![build status](https://img.shields.io/travis/lessp/react-is-visible/master.svg?style=flat-square)](https://travis-ci.org/lessp/react-is-visible)
[![dependencies Status](https://david-dm.org/lessp/react-is-visible/status.svg?style=flat-square)](https://david-dm.org/lessp/react-is-visible)

A small library that lets you know whether a component is visible on screen or not.

Uses the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

### Live Examples

**Storybook:** [https://lessp.github.io/react-is-visible/](https://lessp.github.io/react-is-visible/index.html) 

**Code Sandbox:** [https://13wozo64wq.codesandbox.io/](https://13wozo64wq.codesandbox.io/)

[![Edit 13wozo64wq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/13wozo64wq)

# Table of Contents
1. [Polyfill](#polyfill)
2. [Installation](#installation)
3. [Usage](#usage) 
     - [React Hook](#react-hook)
     - [HOC](#hoc)
     - [Render Prop](#render-prop)
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
  /* const isVisible = useIsVisible(nodeRef, { once: true }) */

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
/* export default withIsVisible(SomeComponent, { once: true }) */
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

The `once`-prop is optional, but if passed, the `isVisible`-flag will only trigger once.

```jsx
import React from "react"
import IsVisible from "react-is-visible"

const App = () => (
  <IsVisible once>
    {isVisible => <h1>{isVisible ? `I'm visible!` : `I'm not visible!`}</h1>}
  </IsVisible>
)
```

## [License](#license)

MIT
