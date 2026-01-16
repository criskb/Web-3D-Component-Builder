export function createState() {
  const listeners = new Map();
  const components = [];

  function on(event, handler) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    listeners.get(event).add(handler);
  }

  function emit(event, payload) {
    if (!listeners.has(event)) {
      return;
    }
    listeners.get(event).forEach((handler) => handler(payload));
  }

  function addComponent(component) {
    components.push(component);
    emit("add", component);
  }

  return {
    on,
    emit,
    addComponent,
    components,
  };
}
