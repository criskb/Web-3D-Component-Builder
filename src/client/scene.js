import * as THREE from "three";

export function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0c0f16");

  const ambientLight = new THREE.AmbientLight("#ffffff", 0.6);
  const directionalLight = new THREE.DirectionalLight("#ffffff", 0.9);
  directionalLight.position.set(3, 5, 2);
  directionalLight.castShadow = true;

  const fillLight = new THREE.DirectionalLight("#8aa0ff", 0.3);
  fillLight.position.set(-4, 2, -3);

  const grid = new THREE.GridHelper(10, 10, "#2b3242", "#1a202d");
  const axes = new THREE.AxesHelper(2);
  axes.position.set(0, 0.01, 0);

  scene.add(ambientLight, directionalLight, fillLight, grid, axes);

  return {
    scene,
    lights: { ambientLight, directionalLight, fillLight },
  };
}
