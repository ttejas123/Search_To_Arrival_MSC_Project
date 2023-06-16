"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const prisma = new client_1.PrismaClient();
class CollegeOperationClass {
    //get all list of colleges with basic college details and feture course details and location data
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pages = {
                    numberOfRecord: req.body.numberOfRecord || 10,
                    pageNumber: req.body.pageNumber || 1,
                    college_name: req.body.college_name || "",
                    short_head: req.body.short_head || [],
                    placement_comapany: req.body.placement_comapany || [],
                    state: req.body.state || [],
                    city: req.body.city || [],
                    order: req.body.order || ""
                };
                let filterObject = {
                    where: Object.assign(Object.assign(Object.assign(Object.assign({ college_name: {
                            contains: pages.college_name
                        } }, (pages.short_head.length > 0 && {
                        courses: {
                            some: {
                                short_head: {
                                    in: pages.short_head
                                }
                            }
                        }
                    })), (pages.placement_comapany.length > 0 && {
                        placements: {
                            some: {
                                company_name: {
                                    in: pages.placement_comapany
                                }
                            }
                        }
                    })), (pages.state.length > 0 && {
                        state: {
                            in: pages.state
                        }
                    })), (pages.city.length > 0 && {
                        college_city: {
                            in: pages.city
                        }
                    })),
                    orderBy: {},
                    include: {
                        _count: true,
                        baseCardCourseSchema: true,
                        Cordinate: true
                    },
                    take: pages.numberOfRecord,
                    skip: (pages.pageNumber - 1) * pages.numberOfRecord
                };
                if (pages.order.length > 0) {
                    filterObject.orderBy = {
                        [pages.order]: 'asc'
                    };
                }
                const ManyRecordsWithPagination = yield prisma.collegeSchema.findMany(filterObject);
                const _count = yield prisma.collegeSchema.count({ where: filterObject.where });
                logger_1.default.info("Get List Of Colleges with Pagination");
                res.status(200).json({
                    data: ManyRecordsWithPagination,
                    _count
                });
            }
            catch (e) {
                logger_1.default.error("Failed to Get All List Of Colleges");
                res.status(500).json({ msg: "Failed to Get All List Of Colleges" });
            }
        });
    }
    //get Single College by id with all Details
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const College = yield prisma.collegeSchema.findMany({
                    where: { id },
                    include: {
                        _count: true,
                        baseCardCourseSchema: true,
                        Cordinate: true,
                        courses: true,
                        Facilities: true,
                        Faculty: true,
                        placements: true
                    }
                });
                logger_1.default.info(`Feched Single College: ${id}`);
                res.status(200).json(College);
            }
            catch (err) {
                logger_1.default.error("Failed to fetch College with id");
                res.status(500).json({ msg: "Failed to fetch College with id" });
            }
        });
    }
    //fetch all unique state (GroupBy)
    getAllGroupByCity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collegesByCity = yield prisma.collegeSchema.groupBy({
                    by: ["college_city"],
                    _count: {
                        _all: true
                    }
                });
                logger_1.default.info("fetch All Unique Cities");
                res.status(200).json({
                    city: collegesByCity
                });
            }
            catch (e) {
                logger_1.default.error("Failed to Fetch Unique City Data from DB");
                res.status(500).json({ msg: "Failed to Fetch Unique City Data from DB" });
            }
        });
    }
    //fetch all unique Cities (GroupBY)
    getAllGroupByState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collegesByState = yield prisma.collegeSchema.groupBy({
                    by: ["state"],
                    _count: {
                        _all: true
                    }
                });
                logger_1.default.info("fetch All Unique States");
                res.status(200).json({
                    state: collegesByState
                });
            }
            catch (e) {
                logger_1.default.error("Failed to Fetch Unique State Data from DB");
                res.status(500).json({ msg: "Failed to Fetch Unique State Data from DB" });
            }
        });
    }
    //fetch all unique Cities (GroupBY)
    getAllGroupByCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collegesByCourse = yield prisma.coursesSchema.groupBy({
                    by: ["short_head"],
                    _count: {
                        _all: true
                    }
                });
                // throw new Error("My Error")
                logger_1.default.info("fetch All Unique Course");
                res.status(200).json({
                    course: collegesByCourse
                });
            }
            catch (e) {
                logger_1.default.error("Failed to Fetch Unique Course Data from DB");
                res.status(500).json({ msg: "Failed to Fetch Course State Data from DB" });
            }
        });
    }
    //fetch Colleges By College Name 
    getOneByCollegeName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pages = {
                    numberOfRecord: req.body.numR || 10,
                    pageNumber: req.body.page || 1,
                    query: req.body.query || ""
                };
                const ManyRecordsWithPagination = yield prisma.collegeSchema.findMany({
                    where: {
                        college_name: {
                            contains: pages.query
                        }
                    }
                });
                logger_1.default.info("fetched Colleges by Name");
                res.status(200).json({
                    data: ManyRecordsWithPagination
                });
            }
            catch (e) {
                logger_1.default.error("Failed to Fetch College Data from DB by it's name");
                res.status(500).json({ msg: "Failed to Fetch College Data from DB by it's name" });
            }
        });
    }
    //fetch Colleges By College Name 
    getCollegesByPlacement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const FetchAllUniquePlacementCompanys = yield prisma.placementsSchema.groupBy({
                    by: ["company_name"],
                    _count: {
                        _all: true
                    },
                });
                logger_1.default.info("Fetched All Unique Placement");
                res.status(200).json({
                    data: FetchAllUniquePlacementCompanys
                });
            }
            catch (e) {
                logger_1.default.error("Failed to get all unique Placement Companies");
                res.status(500).json({ msg: "Failed to get all unique Placement Companies" });
            }
        });
    }
    //create single college with basic college data and data like (Placement, course, facility, faculty)
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = req.body.courses;
                const location = req.body.Cordinate;
                const FacultyArray = req.body.faculty;
                const PlacementArray = req.body.placement.placement ? req.body.placement.placement : [];
                const FacilitiesArray = req.body.facility;
                const baseCardCourseArray = req.body.fees;
                const contact = req.body.phone_no.length > 0 ? (req.body.phone_no[0].value ? `${req.body.phone_no[0].value}` : "+91") : "+91";
                const CourseData = courses.map((val, index) => {
                    return {
                        short_head: val.short_head,
                        courses_name: val.display_name,
                        type: val.type,
                        duration: val.duration_year,
                        fees_per_year: val.fees_data ? val.fees_data.amount : "",
                        eligibility: val.eligibility ? val.eligibility : ""
                    };
                });
                const FacilityArrayData = FacilitiesArray.map((val, index) => {
                    return {
                        facility_name: val.name,
                        facility_image: val.image_path
                    };
                });
                const FacultyData = FacultyArray.map((val, index) => {
                    return {
                        faculty_name: val.faculty_name,
                        designation: val.designation,
                        qualification: val.qualification,
                        exp: val.academic_experience
                    };
                });
                const PlacementData = PlacementArray.map((val, index) => {
                    return {
                        company_name: val.company_name,
                        company_image: val.company_image_path
                    };
                });
                const baseCardCourseData = baseCardCourseArray.map((val, index) => {
                    return {
                        fee: val.fee,
                        short_form: val.short_form,
                        name: val.name,
                    };
                });
                const baseData = {
                    college_name: req.body.college_name,
                    state: req.body.state,
                    college_city: req.body.college_city,
                    logo: req.body.logo,
                    cover: req.body.cover,
                    rating: req.body.rating,
                    url: req.body.url,
                    contact: contact,
                };
                console.log(`\x1b[36m%s\x1b[0m`, `College Name: ${req.body.college_name} (${contact})`);
                // console.table([location])
                // console.table(CourseData)
                // console.table(FacilityArrayData)
                // console.table(FacultyData)
                // console.table(PlacementData)
                // console.table(baseCardCourseData)
                // console.log("--------------------------------------------------------------")
                // console.log("--------------------------------------------------------------")
                // console.log(" next ")
                const create = yield prisma.collegeSchema.create({
                    data: Object.assign(Object.assign({}, baseData), { courses: {
                            connectOrCreate: [...CourseData.map((val, index) => {
                                    return {
                                        where: { short_head: `${val.short_head}` },
                                        create: {
                                            courses_name: `${val.courses_name}`,
                                            eligibility: `${val.eligibility}`,
                                            fees_per_year: `${val.fees_per_year}`,
                                            duration: `${val.duration}`,
                                            short_head: `${val.short_head}`,
                                            type: `${val.type}`,
                                        }
                                    };
                                })]
                        }, Cordinate: {
                            create: [...[location].map((val, index) => {
                                    return {
                                        lat: `${val.lat}`,
                                        lng: `${val.lng}`
                                    };
                                })]
                        }, Faculty: {
                            create: [...FacultyData.map((value, index) => {
                                    return {
                                        designation: `${value.designation}`,
                                        exp: `${value.exp}`,
                                        faculty_name: `${value.faculty_name}`,
                                        qualification: `${value.qualification}`
                                    };
                                })]
                        }, placements: {
                            connectOrCreate: [...PlacementData.map((val, index) => {
                                    return {
                                        where: { company_name: `${val.company_name}` },
                                        create: {
                                            company_image: `${val.company_image}`,
                                            company_name: `${val.company_name}`
                                        }
                                    };
                                })]
                        }, Facilities: {
                            connectOrCreate: [...FacilityArrayData.map((val, index) => {
                                    return {
                                        where: { facility_name: `${val.facility_name}` },
                                        create: {
                                            facility_image: `${val.facility_image}`,
                                            facility_name: `${val.facility_name}`
                                        }
                                    };
                                })]
                        }, baseCardCourseSchema: {
                            create: [...baseCardCourseData.map((val, index) => {
                                    return { fee: `${val.fee}`, name: `${val.name}`, short_form: `${val.short_form}` };
                                })]
                        } })
                });
                return res.status(200).json({
                    "create": create
                });
            }
            catch (e) {
                console.log(e);
                logger_1.default.error("Failed to Add Location");
                res.status(500).json({ msg: "Failed to Add Location" });
            }
        });
    }
    //fetch college Data to compare on table on numbers
    compare(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first, second } = req.body;
                const CompareCollege = yield prisma.collegeSchema.findMany({
                    where: {
                        id: {
                            in: [first, second]
                        }
                    },
                    include: {
                        _count: true
                    }
                });
                function CompareBuilder(holder, idx) {
                    return {
                        name: `${holder}`,
                        first: CompareCollege[0]._count[holder],
                        second: CompareCollege[1]._count[holder],
                        idx
                    };
                }
                const Data = [
                    CompareBuilder("placements", 1),
                    CompareBuilder("baseCardCourseSchema", 2),
                    CompareBuilder("courses", 3),
                    CompareBuilder("Facilities", 4),
                    CompareBuilder("Faculty", 5)
                ];
                logger_1.default.info(`Fetch Both College Successfull for Compare`);
                res.status(200).json(Data);
            }
            catch (e) {
                logger_1.default.error("Failed to fetch Colleges College for compare");
                res.status(500).json({ msg: "Failed to fetch College for compare" });
            }
        });
    }
    // Delete College with given ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idsToDelete } = req.body;
                const DeletedCollege = yield prisma.collegeSchema.deleteMany({
                    where: {
                        id: {
                            in: idsToDelete
                        }
                    }
                });
                logger_1.default.warn(`Deleted College Successfull: ${DeletedCollege.count}`);
                res.sendStatus(204);
            }
            catch (e) {
                logger_1.default.error("Failed to Delete College");
                res.status(500).json({ msg: "Failed to Delete College" });
            }
        });
    }
}
const CollegeOperation = new CollegeOperationClass();
exports.default = CollegeOperation;
