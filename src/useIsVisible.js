import { useEffect, useState } from 'react'

import VO from './VisibilityObserver'

function useIsVisible(nodeRef) {
  const [isVisible, setVisible] = useState(false)

  function handleVisibilityChange({ isIntersecting }) {
    setVisible(isIntersecting)
  }

  useEffect(() => VO.watch(nodeRef.current, handleVisibilityChange), [
    nodeRef,
    handleVisibilityChange,
  ])

  return isVisible
}

export default useIsVisible
