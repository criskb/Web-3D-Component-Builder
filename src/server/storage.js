const projects = new Map();

export function saveProject(payload) {
  const id = payload?.id ?? crypto.randomUUID();
  const project = {
    id,
    name: payload?.name ?? "Untitled Project",
    scene: payload?.scene ?? {},
    updatedAt: new Date().toISOString(),
  };
  projects.set(id, project);
  return project;
}

export function loadProject(id) {
  return projects.get(id);
}
