## as HOC

------------

**Component definition:** 

Optionally takes a config-object as a second argument. The currently supported configurations are:
```js
{
  once: bool
}
```

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

or 

```jsx
import React from 'react'
import { withIsVisible } from 'react-is-visible'

const SomeComponent = ({ isVisible }) => (
  <h1>
    {isVisible && `I'm visible!`}
  </h1>
)

export default withIsVisible(SomeComponent, { once: true })
```

------------

**How to use:**

```jsx
<>
  <SomeComponent />
</>
```
