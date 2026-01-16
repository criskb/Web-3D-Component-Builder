import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5174;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../dist")));

registerRoutes(app);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
