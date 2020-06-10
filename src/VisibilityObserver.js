let intersectionObserver
let intersectionObserverOptions = {}
const subscribers = new WeakMap()

const handleIntersections = (entries) =>
  entries.forEach((entry) => {
    const maybeEntry = subscribers.get(entry.target)

    if (maybeEntry) {
      maybeEntry.call(null, entry)
    }
  })

const getIntersectionObserver = () => {
  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver(
      handleIntersections,
      intersectionObserverOptions
    )
  }

  return intersectionObserver
}

const setIntersectionObserverOptions = (options) => {
  if (intersectionObserver) {
    return
  }

  intersectionObserverOptions = options
}

const watch = (domNode, callback) => {
  if (!domNode || subscribers.has(domNode)) {
    return
  }

  subscribers.set(domNode, callback)
  getIntersectionObserver().observe(domNode)

  return () => unwatch(domNode)
}

const unwatch = (domNode) => {
  intersectionObserver.unobserve(domNode)
  subscribers.delete(domNode)
}

const getSubscribers = () => subscribers

export default {
  getSubscribers,
  setIntersectionObserverOptions,
  unwatch,
  watch,
}
