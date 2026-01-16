import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function initViewport({ container, onResize }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor("#0c0f16", 1);
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(4, 4, 6);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  window.addEventListener("resize", onResize);
  onResize();

  return { renderer, camera, controls };
}

export function resizeViewport(renderer, camera, container) {
  if (!container) {
    return;
  }
  const { clientWidth, clientHeight } = container;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
}
