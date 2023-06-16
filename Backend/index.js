"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import collegeRoutes from "./routes/college.routes";
const PORT = process.argv[2] ? parseInt(process.argv[2] + "") : parseInt(8000 + "");
const express_1 = __importDefault(require("express"));
class TriptoServer {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    configureRoutes() {
        this.app.get("/", (req, res) => {
            res.status(200).json({ message: "We are live", PORT });
        });
        // this.app.use("/college", collegeRoutes)
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
const TripToServerInstance = new TriptoServer(PORT);
TripToServerInstance.start();
