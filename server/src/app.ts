import "dotenv/config";
import express from "express";
import routes from "./routes/routes";
import cors from "cors";
import { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
