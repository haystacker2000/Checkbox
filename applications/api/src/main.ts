import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/ping", (req: Request, res: Response) => {
  res.send("API running");
});

app.listen(port);
console.log(`API running on http://localhost:${port}`);