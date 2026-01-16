function createButton(label, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

export function initUI({ toolbarElement, onAddBox, onAddSphere }) {
  toolbarElement.appendChild(createButton("Add Box", onAddBox));
  toolbarElement.appendChild(createButton("Add Sphere", onAddSphere));
}
