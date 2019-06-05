## as Hook

------------

**Component definition:** 

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

------------

**How to use:** 

```jsx
<>
  <SomeComponent />
</>
```
