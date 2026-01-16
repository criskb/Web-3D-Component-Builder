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
  removeComponent,
  setSelection,
} from "./client/components.js";
import { exportImage } from "./client/export.js";
import { initInspector } from "./client/inspector.js";
import { initSelection } from "./client/interaction.js";
import { createState } from "./client/state.js";
import { initTransform } from "./client/transform.js";
import { initUI, setActiveTransform, setStatus } from "./client/ui.js";

const viewportElement = document.querySelector("#viewport");
const inspectorElement = document.querySelector("#inspector");
const toolbarElement = document.querySelector("#toolbar");
const statusElement = document.querySelector("#status");
const viewportOverlay = document.querySelector("#viewport-overlay");

const state = createState();
const { scene } = initScene();
if (!viewportElement) {
  throw new Error("Viewport container missing.");
}

const { renderer, camera, controls } = initViewport({
  container: viewportElement,
  onResize: () => resizeViewport(renderer, camera, viewportElement),
});
const transform = initTransform({
  camera,
  domElement: renderer.domElement,
  scene,
  controls,
});

initSelection({
  camera,
  domElement: renderer.domElement,
  state,
});

const inspector = initInspector({
  container: inspectorElement,
  state,
  onSelect: (id) => {
    state.selectComponent(id);
    setSelection(state.components, state.selectedId);
    const selected = state.components.find((item) => item.id === id);
    if (selected) {
      transform.attach(selected.mesh);
    }
    setStatus(statusElement, "Selection updated.");
  },
});

state.on("add", (item) => {
  state.selectComponent(item.id);
  setSelection(state.components, state.selectedId);
  transform.attach(item.mesh);
  setStatus(statusElement, `Added ${item.name}.`);
});

state.on("clear", () => {
  setSelection(state.components, state.selectedId);
  transform.detach();
  setStatus(statusElement, "Scene cleared.");
});

state.on("select", (id) => {
  if (!id) {
    transform.detach();
    setSelection(state.components, state.selectedId);
    return;
  }
  const selected = state.components.find((item) => item.id === id);
  if (selected) {
    transform.attach(selected.mesh);
  }
  setSelection(state.components, state.selectedId);
});

initUI({
  toolbarElement,
  onAddBox: () => addPrimitive(scene, state, { type: "box" }),
  onAddSphere: () => addPrimitive(scene, state, { type: "sphere" }),
  onClear: () => clearComponents(scene, state),
  onResetView: () => controls.reset(),
  onGrab: () => {
    transform.setMode("translate");
    setActiveTransform(toolbarElement, "grab");
  },
  onRotate: () => {
    transform.setMode("rotate");
    setActiveTransform(toolbarElement, "rotate");
  },
  onScale: () => {
    transform.setMode("scale");
    setActiveTransform(toolbarElement, "scale");
  },
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
setActiveTransform(toolbarElement, "grab");
if (viewportOverlay) {
  viewportOverlay.classList.add("is-hidden");
}

if (state.components.length === 0) {
  addPrimitive(scene, state, { type: "box" });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    state.selectNone();
    transform.detach();
    setSelection(state.components, state.selectedId);
    setStatus(statusElement, "Selection cleared.");
  }
  if (event.key.toLowerCase() === "g") {
    transform.setMode("translate");
    setActiveTransform(toolbarElement, "grab");
  }
  if (event.key.toLowerCase() === "r") {
    transform.setMode("rotate");
    setActiveTransform(toolbarElement, "rotate");
  }
  if (event.key.toLowerCase() === "s") {
    transform.setMode("scale");
    setActiveTransform(toolbarElement, "scale");
  }
  if (event.key === "Delete" || event.key === "Backspace") {
    if (state.selectedId) {
      removeComponent(scene, state, state.selectedId);
      transform.detach();
      setSelection(state.components, state.selectedId);
      setStatus(statusElement, "Component removed.");
    }
  }
});

scene.add(camera);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  if (state.selectedId) {
    const selected = state.components.find(
      (component) => component.id === state.selectedId
    );
    if (selected) {
      inspector.updateDetails(selected);
    }
  }
  renderer.render(scene, camera);
}

animate();
