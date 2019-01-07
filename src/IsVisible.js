import React from 'react'
import ReactDOM from 'react-dom'

import VO from './VisibilityObserver'

class IsVisible extends React.Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    this.unwatch = VO.watch(
      ReactDOM.findDOMNode(this),
      this.handleVisibilityChange
    )
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return nextState !== this.state
  }

  componentWillUnmount() {
    this.unwatch()
  }

  handleVisibilityChange = ({ isIntersecting }) => {
    if (this.state.isVisible !== isIntersecting) {
      this.setState({
        isVisible: isIntersecting,
      })
    }
  }

  render() {
    const { isVisible } = this.state

    const renderedChildren = this.props.children(isVisible)
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

export default IsVisible
