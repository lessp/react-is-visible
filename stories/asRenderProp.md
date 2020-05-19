## as HOC

------------

**How to use:**

The `once`-prop is optional, but if passed, the `isVisible`-flag will only trigger once.

```jsx
import React from 'react'
import IsVisible from 'react-is-visible'

const SomeComponent = () => (
  <IsVisible once>
    {isVisible => (
      <h1>
        {isVisible && `I'm visible!`}
      </h1>
    )}
  </IsVisible>
)
```
