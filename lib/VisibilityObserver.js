"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var intersectionObserver;
var intersectionObserverOptions = {};
var subscribers = new WeakMap();

var handleIntersections = function handleIntersections(entries) {
  return entries.forEach(function (entry) {
    var maybeEntry = subscribers.get(entry.target);

    if (maybeEntry) {
      maybeEntry.call(null, entry);
    }
  });
};

var getIntersectionObserver = function getIntersectionObserver() {
  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver(handleIntersections, intersectionObserverOptions);
  }

  return intersectionObserver;
};

var setIntersectionObserverOptions = function setIntersectionObserverOptions(options) {
  if (intersectionObserver) {
    return;
  }

  intersectionObserverOptions = options;
};

var watch = function watch(domNode, callback) {
  if (!domNode || subscribers.has(domNode)) {
    return;
  }

  subscribers.set(domNode, callback);
  getIntersectionObserver().observe(domNode);
  return function () {
    return unwatch(domNode);
  };
};

var unwatch = function unwatch(domNode) {
  intersectionObserver.unobserve(domNode);
  subscribers.delete(domNode);
};

var getSubscribers = function getSubscribers() {
  return subscribers;
};

var _default = {
  getSubscribers: getSubscribers,
  setIntersectionObserverOptions: setIntersectionObserverOptions,
  unwatch: unwatch,
  watch: watch
};
exports.default = _default;