if (typeof document === "undefined") {
  throw new Error(
    "This entry is meant for the browser. Use `npm run dev` to start the app."
  );
}
import { initViewport, resizeViewport } from "./client/viewport.js";
import { initScene } from "./client/scene.js";
import {
  addPrimitive,
  clearComponents,
  setSelection,
} from "./client/components.js";
import { exportImage } from "./client/export.js";
import { initInspector } from "./client/inspector.js";
import { createState } from "./client/state.js";
import { initUI, setStatus } from "./client/ui.js";

const viewportElement = document.querySelector("#viewport");
const inspectorElement = document.querySelector("#inspector");
const toolbarElement = document.querySelector("#toolbar");
const statusElement = document.querySelector("#status");
const viewportOverlay = document.querySelector("#viewport-overlay");

const state = createState();
const { scene } = initScene();
const { renderer, camera, controls } = initViewport({
  container: viewportElement,
  onResize: () => resizeViewport(renderer, camera, viewportElement),
});

initInspector({
  container: inspectorElement,
  state,
  onSelect: (id) => {
    state.selectComponent(id);
    setSelection(state.components, state.selectedId);
    setStatus(statusElement, "Selection updated.");
  },
});

state.on("add", (item) => {
  state.selectComponent(item.id);
  setSelection(state.components, state.selectedId);
  setStatus(statusElement, `Added ${item.name}.`);
});

state.on("clear", () => {
  setSelection(state.components, state.selectedId);
  setStatus(statusElement, "Scene cleared.");
});

initUI({
  toolbarElement,
  onAddBox: () => addPrimitive(scene, state, { type: "box" }),
  onAddSphere: () => addPrimitive(scene, state, { type: "sphere" }),
  onClear: () => clearComponents(scene, state),
  onResetView: () => controls.reset(),
  onSnapshot: () => {
    const dataUrl = exportImage(renderer, scene, camera);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "scene-snapshot.png";
    link.click();
    setStatus(statusElement, "Snapshot saved.");
  },
});

setStatus(statusElement, "Ready.");
if (viewportOverlay) {
  viewportOverlay.classList.add("is-hidden");
}

scene.add(camera);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
