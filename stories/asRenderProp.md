## as HOC

------------

**How to use:**

```jsx
import React from 'react'
import IsVisible from 'react-is-visible'

const SomeComponent = () => (
  <IsVisible>
    {isVisible => (
      <h1>
        {isVisible && `I'm visible!`}
      </h1>
    )}
  </IsVisible>
)
```