import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export function loadGLTF(url, { onProgress } = {}) {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(gltf),
      onProgress,
      (error) => reject(error)
    );
  });
}
