import React, { useRef } from 'react'
import { render, cleanup } from '@testing-library/react'

import 'intersection-observer'
import { useIsVisible } from '../'

afterEach(cleanup)

const FunctionalComponent = (props) => {
  const nodeRef = useRef()
  const isVisible = useIsVisible(nodeRef)

  return <h1 ref={nodeRef} data-testid={`isVisible-${isVisible}`} {...props} />
}

describe('useIsVisible', () => {
  it('renders', () => {
    const { getByText, rerender } = render(
      <FunctionalComponent>Functional</FunctionalComponent>
    )

    rerender(<FunctionalComponent>Functional</FunctionalComponent>)

    expect(getByText('Functional')).toBeInTheDocument()
  })

  it('passes its state as props to a Functional Component', () => {
    const { getByTestId, rerender } = render(
      <FunctionalComponent>Functional</FunctionalComponent>
    )

    rerender(<FunctionalComponent>Functional</FunctionalComponent>)

    expect(getByTestId('isVisible-false')).toBeInTheDocument()
  })
})
