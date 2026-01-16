import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

const exporter = new GLTFExporter();

export function exportScene(scene, options = {}) {
  return new Promise((resolve) => {
    exporter.parse(
      scene,
      (result) => resolve(result),
      (error) => resolve({ error }),
      options
    );
  });
}

export function exportImage(renderer, scene, camera) {
  renderer.render(scene, camera);
  return renderer.domElement.toDataURL("image/png");
}
