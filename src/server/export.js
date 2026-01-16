export function queueExport(project) {
  return {
    id: crypto.randomUUID(),
    projectId: project.id,
    status: "queued",
    requestedAt: new Date().toISOString(),
  };
}
