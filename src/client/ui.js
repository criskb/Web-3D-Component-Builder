function createButton(label, onClick, variant = "default") {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.classList.add("toolbar-button", `toolbar-button--${variant}`);
  button.addEventListener("click", onClick);
  return button;
}

export function initUI({
  toolbarElement,
  onAddBox,
  onAddSphere,
  onGrab,
  onRotate,
  onScale,
  onClear,
  onResetView,
  onSnapshot,
}) {
  toolbarElement.innerHTML = "";
  const leftGroup = document.createElement("div");
  leftGroup.className = "toolbar-group";
  leftGroup.appendChild(createButton("Add Box", onAddBox));
  leftGroup.appendChild(createButton("Add Sphere", onAddSphere));

  const transformGroup = document.createElement("div");
  transformGroup.className = "toolbar-group";
  const grabButton = createButton("Grab", onGrab, "ghost");
  const rotateButton = createButton("Rotate", onRotate, "ghost");
  const scaleButton = createButton("Scale", onScale, "ghost");
  [grabButton, rotateButton, scaleButton].forEach((button) => {
    button.dataset.mode = button.textContent.toLowerCase();
    transformGroup.appendChild(button);
  });

  const rightGroup = document.createElement("div");
  rightGroup.className = "toolbar-group";
  rightGroup.appendChild(createButton("Reset View", onResetView, "ghost"));
  rightGroup.appendChild(createButton("Snapshot", onSnapshot, "ghost"));
  rightGroup.appendChild(createButton("Clear Scene", onClear, "danger"));

  toolbarElement.appendChild(leftGroup);
  toolbarElement.appendChild(transformGroup);
  toolbarElement.appendChild(rightGroup);
}

export function setStatus(statusElement, message) {
  if (!statusElement) {
    return;
  }
  statusElement.textContent = message;
}

export function setActiveTransform(toolbarElement, mode) {
  if (!toolbarElement) {
    return;
  }
  toolbarElement
    .querySelectorAll("[data-mode]")
    .forEach((button) => button.classList.remove("is-active"));
  if (mode) {
    const active = toolbarElement.querySelector(`[data-mode="${mode}"]`);
    if (active) {
      active.classList.add("is-active");
    }
  }
}
