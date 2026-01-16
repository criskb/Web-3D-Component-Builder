import { saveProject, loadProject } from "./storage.js";

export function registerRoutes(app) {
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/projects", (req, res) => {
    const project = saveProject(req.body);
    res.json(project);
  });

  app.get("/api/projects/:id", (req, res) => {
    const project = loadProject(req.params.id);
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(project);
  });
}
