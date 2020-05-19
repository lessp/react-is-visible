## as Hook

------------

**Component definition:** 

Optionally takes a config-object as a second argument. The currently supported configurations are:
```
{
  once: bool
}
```

```jsx
import React, { useRef } from 'react'
import { useIsVisible } from 'react-is-visible'

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

or

```jsx
import React, { useRef } from 'react'
import { useIsVisible } from 'react-is-visible'

const SomeComponent = () => {
  const nodeRef = useRef()
  const isVisible = useIsVisible(nodeRef, { once: true })

  return (
    <h1 ref={nodeRef}>
      {isVisible && `I'm visible!`}
    </h1>
  )
}
```

------------

**How to use:** 

```jsx
<>
  <SomeComponent />
</>
```
