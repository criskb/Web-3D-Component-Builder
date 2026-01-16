import * as THREE from "three";
import { getMaterial } from "./materials.js";

function randomColor() {
  const hues = ["#5b8cff", "#8b5bff", "#ff7b5b", "#35c98b", "#ffd05b"];
  return hues[Math.floor(Math.random() * hues.length)];
}

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `component-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function addPrimitive(scene, state, { type }) {
  const material = getMaterial("standard", { color: randomColor() });
  let geometry;
  let name;

  if (type === "sphere") {
    geometry = new THREE.SphereGeometry(0.75, 32, 32);
    name = "Sphere";
  } else {
    geometry = new THREE.BoxGeometry(1, 1, 1);
    name = "Box";
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0.5, 0);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const component = {
    id: generateId(),
    name,
    type,
    mesh,
  };

  state.addComponent(component);
  return component;
}

export function clearComponents(scene, state) {
  state.components.forEach((component) => {
    scene.remove(component.mesh);
  });
  state.clearComponents();
}

export function removeComponent(scene, state, id) {
  const component = state.components.find((item) => item.id === id);
  if (!component) {
    return;
  }
  scene.remove(component.mesh);
  state.removeComponent(id);
}

export function setSelection(components, selectedId) {
  components.forEach((component) => {
    const material = component.mesh.material;
    if (material && "emissive" in material) {
      material.emissive.set(
        component.id === selectedId ? "#2f6bff" : "#000000"
      );
      material.emissiveIntensity = component.id === selectedId ? 0.6 : 0;
    }
  });
}
