import { useEffect, useState } from 'react'

import VO from './VisibilityObserver'

const defaultOptions = {
  once: false,
};

function useIsVisible(nodeRef, { once } = defaultOptions) {
  const [isVisible, setVisible] = useState(false)

  function handleVisibilityChange({ isIntersecting }) {
    setVisible(isIntersecting)

    if (isIntersecting && once) {
      VO.unwatch(nodeRef.current)
    }
  }

  useEffect(() => VO.watch(nodeRef.current, handleVisibilityChange), [
    nodeRef,
    handleVisibilityChange,
  ])

  return isVisible
}

export default useIsVisible
