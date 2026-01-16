import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

export function initTransform({ camera, domElement, scene, controls }) {
  const transform = new TransformControls(camera, domElement);
  transform.setSize(0.9);
  transform.addEventListener("dragging-changed", (event) => {
    controls.enabled = !event.value;
  });
  scene.add(transform);

  return transform;
}
