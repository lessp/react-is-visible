import React, { useRef } from 'react'
import { render, cleanup } from '@testing-library/react'

import 'intersection-observer'
import { VisibilityObserver as VO, withIsVisible, useIsVisible } from '../'

afterEach(cleanup)

const FunctionalComponent = ({ isVisible, ...props }) => <h1 {...props} />
const FunctionalComponentWithIsVisible = withIsVisible(FunctionalComponent)
const FunctionalComponentHook = (props) => {
  const nodeRef = useRef()
  const isVisible = useIsVisible(nodeRef)

  return <h1 ref={nodeRef} data-testid={`isVisible-${isVisible}`} {...props} />
}

class ClassComponent extends React.Component {
  render() {
    const { isVisible, ...props } = this.props

    return <h1 {...props} />
  }
}
const ClassComponentWithIsVisible = withIsVisible(ClassComponent)

describe('VisibilityObserver', () => {
  it('adds a wrapped functional component to subscriber list', () => {
    const { getByText } = render(
      <FunctionalComponentWithIsVisible>
        FunctionalComponentWithIsVisible
      </FunctionalComponentWithIsVisible>
    )

    const subscribers = VO.getSubscribers()

    expect(subscribers.has(getByText('FunctionalComponentWithIsVisible'))).toBe(
      true
    )
  })

  it('removes a wrapped functional component from subscriber list on unmount', () => {
    const { getByText, unmount } = render(
      <FunctionalComponentWithIsVisible>
        FunctionalComponentWithIsVisible
      </FunctionalComponentWithIsVisible>
    )

    const subscribers = VO.getSubscribers()

    const domNode = getByText('FunctionalComponentWithIsVisible')

    expect(subscribers.has(domNode)).toBe(true)

    unmount()

    expect(subscribers.has(domNode)).toBe(false)
  })

  it('adds a wrapped class component to subscriber list', () => {
    const { getByText, unmount } = render(
      <ClassComponentWithIsVisible>
        ClassComponentWithIsVisible
      </ClassComponentWithIsVisible>
    )

    const subscribers = VO.getSubscribers()

    expect(subscribers.has(getByText('ClassComponentWithIsVisible'))).toBe(true)

    unmount()
  })

  it('removes a wrapped class component from subscriber list on unmount', () => {
    const { getByText, unmount } = render(
      <ClassComponentWithIsVisible>
        ClassComponentWithIsVisible
      </ClassComponentWithIsVisible>
    )

    const subscribers = VO.getSubscribers()

    const domNode = getByText('ClassComponentWithIsVisible')

    expect(subscribers.has(domNode)).toBe(true)

    unmount()

    expect(subscribers.has(domNode)).toBe(false)
  })

  it('adds a functional component (hook) to subscriber list', () => {
    const { getByText, unmount, rerender } = render(
      <FunctionalComponentHook>FunctionalComponentHook</FunctionalComponentHook>
    )

    rerender(
      <FunctionalComponentHook>FunctionalComponentHook</FunctionalComponentHook>
    )

    const subscribers = VO.getSubscribers()

    expect(subscribers.has(getByText('FunctionalComponentHook'))).toBe(true)

    unmount()
  })

  it('removes a functional component (hook) from subscriber list on unmount', () => {
    const { getByText, unmount, rerender } = render(
      <FunctionalComponentHook>FunctionalComponentHook</FunctionalComponentHook>
    )

    rerender(
      <FunctionalComponentHook>FunctionalComponentHook</FunctionalComponentHook>
    )

    const subscribers = VO.getSubscribers()
    const domNode = getByText('FunctionalComponentHook')

    expect(subscribers.has(domNode)).toBe(true)

    unmount()

    expect(subscribers.has(domNode)).toBe(false)
  })

  it('removes a wrapped class component from subscriber list on unmount', () => {
    const { getByText, unmount } = render(
      <ClassComponentWithIsVisible>
        ClassComponentWithIsVisible
      </ClassComponentWithIsVisible>
    )

    const subscribers = VO.getSubscribers()

    const domNode = getByText('ClassComponentWithIsVisible')

    expect(subscribers.has(domNode)).toBe(true)

    unmount()

    expect(subscribers.has(domNode)).toBe(false)
  })
})
