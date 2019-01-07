import React from 'react'
import { render, cleanup } from 'react-testing-library'

import 'intersection-observer'
import { withIsVisible } from '../'

afterEach(cleanup)

let FunctionalComponent = ({ isVisible, ...props }) => (
  <h1 data-testid={`isVisible-${isVisible}`} {...props} />
)
FunctionalComponent = withIsVisible(FunctionalComponent)

class ClassComponent extends React.Component {
  render() {
    const { isVisible, ...props } = this.props

    return <h1 data-testid={`isVisible-${isVisible}`} {...props} />
  }
}
ClassComponent = withIsVisible(ClassComponent)

describe('withIsVisible', () => {
  it('renders a Functional Component', () => {
    const { getByText } = render(
      <FunctionalComponent>Functional</FunctionalComponent>
    )

    expect(getByText('Functional')).toBeInTheDocument()
  })

  it('renders a Class Component', () => {
    const { getByText } = render(<ClassComponent>Class</ClassComponent>)

    expect(getByText('Class')).toBeInTheDocument()
  })

  it('passes its state as props to a Functional Component', () => {
    const { getByTestId } = render(<FunctionalComponent />)

    expect(getByTestId('isVisible-false')).toBeInTheDocument()
  })

  it('passes its state as props to a Class Component', () => {
    const { getByTestId } = render(<ClassComponent />)

    expect(getByTestId('isVisible-false')).toBeInTheDocument()
  })
})
