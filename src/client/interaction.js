import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

export function initSelection({ camera, domElement, state }) {
  function onPointerDown(event) {
    const bounds = domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const meshes = state.components.map((component) => component.mesh);
    const hits = raycaster.intersectObjects(meshes, false);
    if (hits.length === 0) {
      state.selectNone();
      return;
    }

    const hit = hits[0].object;
    const selected = state.components.find(
      (component) => component.mesh === hit
    );
    if (selected) {
      state.selectComponent(selected.id);
    }
  }

  domElement.addEventListener("pointerdown", onPointerDown);

  return () => domElement.removeEventListener("pointerdown", onPointerDown);
}
