import "./style.css";
import { initViewport, resizeViewport } from "./client/viewport.js";
import { initScene } from "./client/scene.js";
import { addPrimitive } from "./client/components.js";
import { createState } from "./client/state.js";
import { initUI } from "./client/ui.js";

const viewportElement = document.querySelector("#viewport");
const inspectorElement = document.querySelector("#inspector");
const toolbarElement = document.querySelector("#toolbar");

const state = createState();
const { scene } = initScene();
const { renderer, camera, controls } = initViewport({
  container: viewportElement,
  onResize: () => resizeViewport(renderer, camera, viewportElement),
});

state.on("add", (item) => {
  inspectorElement.innerHTML = "";
  const entry = document.createElement("div");
  entry.className = "inspector-item";
  entry.innerHTML = `<strong>${item.name}</strong><span>${item.type}</span>`;
  inspectorElement.appendChild(entry);
});

initUI({
  toolbarElement,
  onAddBox: () => addPrimitive(scene, state, { type: "box" }),
  onAddSphere: () => addPrimitive(scene, state, { type: "sphere" }),
});

scene.add(camera);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
