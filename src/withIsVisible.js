import React from 'react'

import hoistNonReactStatic from 'hoist-non-react-statics'

import IsVisible from './IsVisible'

const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

const defaultOptions = {
  once: false,
}

export const withIsVisible = (WrappedComponent, { once } = defaultOptions) => {
  const WithIsVisible = ({ forwardedRef, ...props }) => (
    <IsVisible once={once}>
      {(isVisible) => (
        <WrappedComponent {...props} isVisible={isVisible} ref={forwardedRef} />
      )}
    </IsVisible>
  )

  /* Display name */
  WithIsVisible.displayName = `WithIsVisible(${getDisplayName(
    WrappedComponent
  )})`

  /* Passes non-React static methods */
  hoistNonReactStatic(WithIsVisible, WrappedComponent)

  /* Forward refs */
  function forwardRef(props, ref) {
    return <WithIsVisible {...props} forwardedRef={ref} />
  }

  forwardRef.displayName = `withIsVisible(${getDisplayName(WrappedComponent)})`

  return React.forwardRef(forwardRef)
}
