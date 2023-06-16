"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const college_controller_1 = __importDefault(require("../controllers/college.controller"));
class OpenAiRoutesClass {
    constructor(router) {
        this.router = router;
        this.router.post("/", college_controller_1.default.getAll); //main api with all filters
        this.router.get("/groupbyCity", college_controller_1.default.getAllGroupByCity); // filter option city
        this.router.get("/groupbyState", college_controller_1.default.getAllGroupByState); //filter option state
        this.router.get("/placement", college_controller_1.default.getCollegesByPlacement); //filter option companies
        this.router.get("/college", college_controller_1.default.getOneByCollegeName); //single college search  
        this.router.get("/courses", college_controller_1.default.getAllGroupByCourse); //filter option course
        this.router.post("/compare", college_controller_1.default.compare); // Fetch colleges to compare data 
        this.router.get("/:id", college_controller_1.default.getById); // Details of single college
        this.router.post("/", college_controller_1.default.create); // create one college with all required details 
        this.router.delete("/", college_controller_1.default.delete);
    }
}
const OpenAiRoutes = new OpenAiRoutesClass(express_1.default.Router());
exports.default = OpenAiRoutes.router;
