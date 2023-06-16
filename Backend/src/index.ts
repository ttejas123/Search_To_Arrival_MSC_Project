import collegeRoutes from "./routes/college.routes";
import cors from 'cors'
const PORT:number = process.argv[2] ? parseInt(process.argv[2]+"") : parseInt(8000+""); 

import express, { Application, Request, Response } from "express";

class TriptoServer {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors())
  }

  private configureRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "We are live", PORT });
    });

    this.app.use("/college", collegeRoutes)
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

const TripToServerInstance = new TriptoServer(PORT);
TripToServerInstance.start();
