import React from 'react'
import ReactDOM from 'react-dom'

import VO from './VisibilityObserver'

class IsVisible extends React.PureComponent {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    this.unwatch = VO.watch(
      ReactDOM.findDOMNode(this),
      this.handleVisibilityChange
    )
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

    if (isIntersecting && this.props.once) {
      this.unwatch()
    }
  }

  render() {
    const { isVisible } = this.state

    const renderedChildren = this.props.children(isVisible)
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

export default IsVisible
