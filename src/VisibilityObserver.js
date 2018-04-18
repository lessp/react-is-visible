let intersectionObserver;
let intersectionObserverOptions = {};
let subscribers = new Map();

const handleIntersections = entries => entries.forEach(passVisibilityStatus);

const passVisibilityStatus = entry =>
  subscribers.get(entry.target).call(this, entry);

const getIntersectionObserver = () => {
  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver(
      handleIntersections,
      intersectionObserverOptions
    );
  }

  return intersectionObserver;
};

const setIntersectionObserverOptions = options => {
  if (intersectionObserver) return;

  intersectionObserverOptions = options;
};

const watch = (domNode, callback) => {
  if (subscribers.has(domNode)) return;

  subscribers.set(domNode, callback);
  getIntersectionObserver().observe(domNode);

  return () => unwatch(domNode);
};

const unwatch = domNode => {
  intersectionObserver.unobserve(domNode);
  subscribers.delete(domNode);

  if (subscribers.size === 0) {
    intersectionObserver.disconnect();
  }
};

const emit = (subscriber, details) => {
  subscribers.get(subscriber)(details);
};

export default { watch, unwatch };
