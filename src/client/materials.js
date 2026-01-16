import * as THREE from "three";

const cache = new Map();

export function getMaterial(type = "standard", options = {}) {
  const key = `${type}-${JSON.stringify(options)}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  let material;
  if (type === "standard") {
    material = new THREE.MeshStandardMaterial({
      color: options.color ?? "#5b8cff",
      metalness: options.metalness ?? 0.2,
      roughness: options.roughness ?? 0.6,
    });
  } else {
    material = new THREE.MeshNormalMaterial();
  }

  cache.set(key, material);
  return material;
}
