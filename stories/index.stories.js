import React, { useRef } from 'react'
import { addParameters, storiesOf } from '@storybook/react'

import 'intersection-observer'

import IsVisible, { withIsVisible, useIsVisible } from '../src'

import asHOC from './asHOC.md'
import asHook from './asHook.md'
import asRenderProp from './asRenderProp.md'

const wrapperStyling = (addStyling = {}) => ({
  font: '500 16px/1.5 sans-serif',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  ...addStyling,
})

const boxStyling = isVisible => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: '25px',
  height: '256px',
  width: '256px',
  margin: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'background-color 1s ease',
  backgroundColor: isVisible ? 'magenta' : 'transparent',
})

/* Functional Component */
const FunctionalComponent = ({ isVisible, children, ...props }) => (
  <h1 style={boxStyling(isVisible)} {...props}>
    {children}
  </h1>
)

/* As Hook */
const HookComponent = props => {
  const nodeRef = useRef()
  const isVisible = useIsVisible(nodeRef)

  return (
    <h1 ref={nodeRef} style={boxStyling(isVisible)} {...props}>
      {isVisible && `I'm visible!`}
    </h1>
  )
}

/* with withIsVisible */
const FunctionalComponentWithIsVisible = withIsVisible(FunctionalComponent)

/* Stories */
storiesOf('React Is Visible', module)
  .addParameters({ options: { showPanel: false } })
  .add(
    'as HOC',
    () => (
      <div style={wrapperStyling({ height: '200vh' })}>
        <h2 style={{ color: 'black', marginBottom: 'auto' }}>Scroll down</h2>
        <FunctionalComponentWithIsVisible>
          I'm visible!
        </FunctionalComponentWithIsVisible>
      </div>
    ),
    {
      notes: {
        markdown: asHOC,
      },
    }
  )
  .add(
    'as Render Prop',
    () => (
      <div style={wrapperStyling({ height: '200vh' })}>
        <h2 style={{ color: 'black', marginBottom: 'auto' }}>Scroll down</h2>
        <IsVisible>
          {isVisible => (
            <FunctionalComponent isVisible={isVisible}>
              I'm visible!
            </FunctionalComponent>
          )}
        </IsVisible>
      </div>
    ),
    {
      notes: {
        markdown: asRenderProp,
      },
    }
  )
  .add(
    'as Hook',
    () => (
      <div style={wrapperStyling({ height: '200vh' })}>
        <h2 style={{ color: 'black', marginBottom: 'auto' }}>Scroll down</h2>
        <HookComponent />
      </div>
    ),
    {
      notes: {
        markdown: asHook,
      },
    }
  )
