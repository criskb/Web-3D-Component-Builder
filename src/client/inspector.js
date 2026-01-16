import * as THREE from "three";

function createEmptyState() {
  const empty = document.createElement("p");
  empty.className = "inspector-empty";
  empty.textContent = "No components yet. Use the toolbar to add one.";
  return empty;
}

export function initInspector({ container, state, onSelect }) {
  const list = document.createElement("div");
  list.className = "inspector-list";
  const details = document.createElement("div");
  details.className = "inspector-details";
  container.appendChild(list);
  container.appendChild(details);

  function render() {
    list.innerHTML = "";
    details.innerHTML = "";
    details.classList.add("is-hidden");
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

    if (state.selectedId) {
      const selected = state.components.find(
        (component) => component.id === state.selectedId
      );
      if (selected) {
        details.classList.remove("is-hidden");
        details.innerHTML = `
          <div class="inspector-section">
            <h3>Transform</h3>
            <div class="inspector-row">
              <span>Position</span>
              <span class="inspector-value" data-field="position">0, 0, 0</span>
            </div>
            <div class="inspector-row">
              <span>Rotation</span>
              <span class="inspector-value" data-field="rotation">0°, 0°, 0°</span>
            </div>
            <div class="inspector-row">
              <span>Scale</span>
              <span class="inspector-value" data-field="scale">1, 1, 1</span>
            </div>
          </div>
        `;
        updateDetails(selected);
      }
    }
  }

  function updateDetails(component) {
    if (!component) {
      return;
    }
    const position = details.querySelector('[data-field="position"]');
    const rotation = details.querySelector('[data-field="rotation"]');
    const scale = details.querySelector('[data-field="scale"]');

    if (position) {
      position.textContent = `${component.mesh.position.x.toFixed(2)}, ${component.mesh.position.y.toFixed(2)}, ${component.mesh.position.z.toFixed(2)}`;
    }
    if (rotation) {
      rotation.textContent = `${THREE.MathUtils.radToDeg(component.mesh.rotation.x).toFixed(0)}°, ${THREE.MathUtils.radToDeg(component.mesh.rotation.y).toFixed(0)}°, ${THREE.MathUtils.radToDeg(component.mesh.rotation.z).toFixed(0)}°`;
    }
    if (scale) {
      scale.textContent = `${component.mesh.scale.x.toFixed(2)}, ${component.mesh.scale.y.toFixed(2)}, ${component.mesh.scale.z.toFixed(2)}`;
    }
  }

  state.on("add", render);
  state.on("clear", render);
  state.on("select", render);
  state.on("remove", render);
  render();

  return { render, updateDetails };
}
