import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// /api/v1/students/ ei route e hit hole student route dekhabe.
// /api/v1/students//create-student/ ei route e hit holei controller k call dibe.


// application routes
app.use("/api/v1/students", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
//   const a = 10;
  res.send('hello');
});

export default app;
