## as HOC

------------

**Component definition:** 

```jsx
import React from 'react'
import { withIsVisible } from 'react-is-visible'

const SomeComponent = ({ isVisible }) => (
  <h1>
    {isVisible && `I'm visible!`}
  </h1>
)

export default withIsVisible(SomeComponent)
```

------------

**How to use:**

```jsx
<>
  <SomeComponent />
</>
```
