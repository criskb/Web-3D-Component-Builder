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
  onClear,
  onResetView,
  onSnapshot,
}) {
  toolbarElement.innerHTML = "";
  const leftGroup = document.createElement("div");
  leftGroup.className = "toolbar-group";
  leftGroup.appendChild(createButton("Add Box", onAddBox));
  leftGroup.appendChild(createButton("Add Sphere", onAddSphere));

  const rightGroup = document.createElement("div");
  rightGroup.className = "toolbar-group";
  rightGroup.appendChild(createButton("Reset View", onResetView, "ghost"));
  rightGroup.appendChild(createButton("Snapshot", onSnapshot, "ghost"));
  rightGroup.appendChild(createButton("Clear Scene", onClear, "danger"));

  toolbarElement.appendChild(leftGroup);
  toolbarElement.appendChild(rightGroup);
}

export function setStatus(statusElement, message) {
  if (!statusElement) {
    return;
  }
  statusElement.textContent = message;
}
