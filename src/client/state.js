export function createState() {
  const listeners = new Map();
  const components = [];
  let selectedId = null;

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

  function clearComponents() {
    components.length = 0;
    selectedId = null;
    emit("clear");
  }

  function selectComponent(id) {
    selectedId = id;
    emit("select", id);
  }

  function selectNone() {
    selectedId = null;
    emit("select", null);
  }

  return {
    on,
    emit,
    addComponent,
    clearComponents,
    selectComponent,
    selectNone,
    components,
    get selectedId() {
      return selectedId;
    },
  };
}
