import express, { Router } from "express";
import CollegeController from "../controllers/college.controller";

class OpenAiRoutesClass {
    router: Router;
    constructor(router: Router){
        this.router = router; 
        this.router.post("/", CollegeController.getAll); //main api with all filters
        this.router.get("/groupbyCity", CollegeController.getAllGroupByCity); // filter option city
        this.router.get("/groupbyState", CollegeController.getAllGroupByState); //filter option state
        this.router.get("/placement", CollegeController.getCollegesByPlacement); //filter option companies
        this.router.get("/college", CollegeController.getOneByCollegeName); //single college search  
        this.router.get("/courses", CollegeController.getAllGroupByCourse); //filter option course
        this.router.post("/compare", CollegeController.compare); // Fetch colleges to compare data 
        this.router.get("/:id", CollegeController.getById); // Details of single college
        this.router.post("/", CollegeController.create); // create one college with all required details 
        this.router.delete("/", CollegeController.delete);
    }
}

const OpenAiRoutes = new OpenAiRoutesClass(express.Router());
export default OpenAiRoutes.router;