function createEmptyState() {
  const empty = document.createElement("p");
  empty.className = "inspector-empty";
  empty.textContent = "No components yet. Use the toolbar to add one.";
  return empty;
}

export function initInspector({ container, state, onSelect }) {
  const list = document.createElement("div");
  list.className = "inspector-list";
  container.appendChild(list);

  function render() {
    list.innerHTML = "";
    if (state.components.length === 0) {
      list.appendChild(createEmptyState());
      return;
    }

    state.components.forEach((component) => {
      const entry = document.createElement("button");
      entry.type = "button";
      entry.className = "inspector-item";
      if (component.id === state.selectedId) {
        entry.classList.add("is-selected");
      }
      entry.innerHTML = `<strong>${component.name}</strong><span>${component.type}</span>`;
      entry.addEventListener("click", () => onSelect(component.id));
      list.appendChild(entry);
    });
  }

  state.on("add", render);
  state.on("clear", render);
  state.on("select", render);
  render();

  return { render };
}
