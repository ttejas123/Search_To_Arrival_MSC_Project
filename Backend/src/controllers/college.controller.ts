import { Prisma, PrismaClient, baseCardCourseSchema } from '@prisma/client';
import logger from '../utils/logger'
import { Request, Response, query } from 'express';
import { BaseCardCourse, BaseData, Cordinate, CourseData, Facilitie, Faculty, Placement } from '../models/college.model';
const prisma = new PrismaClient();

type orderBy = "college_name" | "rating"

class CollegeOperationClass {
    //get all list of colleges with basic college details and feture course details and location data
    async getAll(req:Request, res:Response) {
        try {
            const pages: {numberOfRecord: number, pageNumber: number, college_name: string, short_head: string[], placement_comapany: string[], state: string[], city: string[], order: orderBy} = {
                numberOfRecord: req.body.numberOfRecord || 10,
                pageNumber: req.body.pageNumber || 1,
                college_name: req.body.college_name || "",
                short_head: req.body.short_head || [],
                placement_comapany: req.body.placement_comapany || [],
                state: req.body.state || [],
                city: req.body.city || [],
                order: req.body.order || ""
            }

            let filterObject = {
                where: {
                    college_name: {
                            contains: pages.college_name
                    },
                    ...(pages.short_head.length > 0 && {
                        courses: {
                            some: {
                                short_head: {
                                    in: pages.short_head
                                }
                            }
                        }
                    }),
                    ...(pages.placement_comapany.length > 0 && {
                        placements: {
                            some: {
                                company_name: {
                                    in: pages.placement_comapany
                                }
                            }
                        }
                    }),
                    ...(pages.state.length > 0 && {
                        state: {
                            in: pages.state
                        }
                    }),
                    ...(pages.city.length > 0 && {
                        college_city: {
                            in: pages.city
                        }
                    })
                },
                orderBy: {},
                include: {
                    _count: true,
                    baseCardCourseSchema: true,
                    Cordinate: true
                },
                take: pages.numberOfRecord,
                skip: (pages.pageNumber - 1) * pages.numberOfRecord
            }

            if(pages.order.length > 0) {
                filterObject.orderBy = {
                    [pages.order]: 'asc'
                }
            }
            
            const ManyRecordsWithPagination = await prisma.collegeSchema.findMany(filterObject)
            const _count = await prisma.collegeSchema.count({where: filterObject.where})
            logger.info("Get List Of Colleges with Pagination")
            res.status(200).json({
                data: ManyRecordsWithPagination,
                _count
            })
            
        } catch (e) {
            logger.error("Failed to Get All List Of Colleges");
            res.status(500).json({msg: "Failed to Get All List Of Colleges"});
        }
    }

    //get Single College by id with all Details
    async getById(req:Request, res:Response) {
        try{
            const { id } = req.params;
            const College = await prisma.collegeSchema.findMany({
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
            logger.info(`Feched Single College: ${id}`);
            res.status(200).json(College);
        } catch (err) {
            logger.error("Failed to fetch College with id");
            res.status(500).json({msg: "Failed to fetch College with id"})
        }
    }

    //fetch all unique state (GroupBy)
    async getAllGroupByCity(req:Request, res:Response) {
        try {
            const collegesByCity = await prisma.collegeSchema.groupBy({
                by: ["college_city"],
                _count: {
                    _all: true
                }
            });
            
            logger.info("fetch All Unique Cities");
            res.status(200).json({
                city: collegesByCity
            })
        } catch (e) {
            logger.error("Failed to Fetch Unique City Data from DB");
            res.status(500).json({msg: "Failed to Fetch Unique City Data from DB"});
        }
    }

    //fetch all unique Cities (GroupBY)
    async getAllGroupByState(req:Request, res:Response) {
        try {
            const collegesByState = await prisma.collegeSchema.groupBy({
                by: ["state"],
                _count: {
                    _all: true
                }
            });
            
            logger.info("fetch All Unique States");
            res.status(200).json({
                state: collegesByState
            })
        } catch (e) {
            logger.error("Failed to Fetch Unique State Data from DB");
            res.status(500).json({msg: "Failed to Fetch Unique State Data from DB"});
        }
    }

    //fetch all unique Cities (GroupBY)
    async getAllGroupByCourse(req:Request, res:Response) {
        try {
            const collegesByCourse = await prisma.coursesSchema.groupBy({
                by: ["short_head"],
                _count: {
                    _all: true
                }
            });

            // throw new Error("My Error")
            
            logger.info("fetch All Unique Course");
            res.status(200).json({
                course: collegesByCourse
            })
        } catch (e) {
            logger.error("Failed to Fetch Unique Course Data from DB");
            res.status(500).json({msg: "Failed to Fetch Course State Data from DB"});
        }
    }

    //fetch Colleges By College Name 
    async getOneByCollegeName(req:Request, res:Response) {
        try {
            const pages: {numberOfRecord: number, pageNumber: number, query: string} = {
                numberOfRecord: req.body.numR || 10,
                pageNumber: req.body.page || 1,
                query: req.body.query || ""
            }
  
            const ManyRecordsWithPagination = await prisma.collegeSchema.findMany({
                where: {
                    college_name: {
                        contains: pages.query
                    }
                }
            })
            
            logger.info("fetched Colleges by Name");
            res.status(200).json({
                data: ManyRecordsWithPagination
            })
        } catch (e) {
            logger.error("Failed to Fetch College Data from DB by it's name");
            res.status(500).json({msg: "Failed to Fetch College Data from DB by it's name"});
        }
    }

    //fetch Colleges By College Name 
    async getCollegesByPlacement(req:Request, res:Response) {
        try {
            const FetchAllUniquePlacementCompanys = await prisma.placementsSchema.groupBy({
                by: ["company_name"],
                _count: {
                    _all: true
                },
                
            })
            
            logger.info("Fetched All Unique Placement");
            res.status(200).json({
                data: FetchAllUniquePlacementCompanys
            })
        } catch (e) {
            logger.error("Failed to get all unique Placement Companies");
            res.status(500).json({msg: "Failed to get all unique Placement Companies"});
        }
    }

    //create single college with basic college data and data like (Placement, course, facility, faculty)
    async create(req:Request, res:Response) {
        try {
            const courses:any = req.body.courses;
            const location:Cordinate = req.body.Cordinate;
            const FacultyArray:any= req.body.faculty
            const PlacementArray:any = req.body.placement.placement ? req.body.placement.placement : []
            const FacilitiesArray: any = req.body.facility
            const baseCardCourseArray: any = req.body.fees

            const contact:string = req.body.phone_no.length > 0 ? (req.body.phone_no[0].value ? `${req.body.phone_no[0].value}` : "+91")  : "+91";
            const CourseData:CourseData[] = courses.map((val:any, index:number)=> {
                return { 
                    short_head: val.short_head, 
                    courses_name: val.display_name, 
                    type: val.type, 
                    duration: val.duration_year, 
                    fees_per_year: val.fees_data ? val.fees_data.amount : "", 
                    eligibility:val.eligibility ? val.eligibility : ""}
            })
            const FacilityArrayData:Facilitie[] = FacilitiesArray.map((val:any, index:number)=> {
                return {
                    facility_name: val.name, 
                    facility_image: val.image_path
                }
            })
            const FacultyData:Faculty[] = FacultyArray.map((val:any, index:number) => {
                return { 
                    faculty_name: val.faculty_name, 
                    designation:val.designation, 
                    qualification:val.qualification, 
                    exp: val.academic_experience 
                }
            })
            const PlacementData:Placement[] = PlacementArray.map((val:any, index:number) => {
                return {
                    company_name: val.company_name, 
                    company_image: val.company_image_path
                }
            })
            const baseCardCourseData: BaseCardCourse[] = baseCardCourseArray.map((val:any, index:number) => {
                return {
                    fee             : val.fee ,
                    short_form      : val.short_form ,
                    name            : val.name ,
                }
            })

            const baseData:BaseData = {
                college_name  : req.body.college_name,
                state         : req.body.state,
                college_city  : req.body.college_city,
                logo          : req.body.logo,
                cover         : req.body.cover,
                rating        : req.body.rating,
                url           : req.body.url,
                contact       : contact,  
            } 

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

            const create = await prisma.collegeSchema.create({
                data: {
                    ...baseData,
                    courses: {
                        connectOrCreate: [...CourseData.map((val:CourseData, index:number) => {
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
                            }
                        })]
                    },
                    Cordinate: {
                        create: [...[location].map((val:Cordinate, index:number) => {
                            return {
                                lat: `${val.lat}`,
                                lng: `${val.lng}`
                            }
                        })]
                    },
                    Faculty: {
                        create: [...FacultyData.map((value: Faculty, index: number) => {
                            return {
                                designation: `${value.designation}`,
                                exp: `${value.exp}`,
                                faculty_name: `${value.faculty_name}`,
                                qualification: `${value.qualification}` 
                            }
                        })]
                    },
                    placements: {
                        connectOrCreate: [...PlacementData.map((val: Placement, index:number) => {
                            return {
                                where: { company_name: `${val.company_name}` },
                                create: {
                                    company_image: `${val.company_image}`,
                                    company_name: `${val.company_name}`
                                }
                            }
                        })]
                    },
                    Facilities: {
                        connectOrCreate: [...FacilityArrayData.map((val:Facilitie, index:number) => {
                            return {
                                where: { facility_name: `${val.facility_name}` },
                                create: {
                                    facility_image: `${val.facility_image}`,
                                    facility_name: `${val.facility_name}`
                                }
                            }
                        })]
                    },
                    baseCardCourseSchema: {
                        create: [...baseCardCourseData.map((val: BaseCardCourse, index: number) => {
                            return { fee: `${val.fee}`, name: `${val.name}`, short_form: `${val.short_form}` }      
                        })]
                    }
                }
            })

            return res.status(200).json({
                "create": create
            });
        } catch(e) {
            console.log(e)
            logger.error("Failed to Add Location");
            res.status(500).json({msg: "Failed to Add Location"})
        }
    }

    //fetch college Data to compare on table on numbers
   async compare(req: Request, res: Response) {
        try{
            const { first, second } = req.body;
            const CompareCollege = await prisma.collegeSchema.findMany({ 
                where: {
                    id: {
                        in: [first, second]
                    }
                },
                include: {
                    _count: true
                }
            });

            interface CompareFor {
                idx: number
                name: string | "" 
                first: number | 0
                second: number | 0
            }

            type CompareProperty = "placements" | "Cordinate" | "Faculty" | "baseCardCourseSchema" | "Facilities" | "courses"

            function CompareBuilder(holder:CompareProperty, idx:number):CompareFor {
                return {
                    name: `${holder}`,
                    first: CompareCollege[0]._count[holder],
                    second: CompareCollege[1]._count[holder],
                    idx
                }
            }

            const Data: CompareFor[] = [
                CompareBuilder("placements", 1),
                CompareBuilder("baseCardCourseSchema", 2),
                CompareBuilder("courses", 3),
                CompareBuilder("Facilities", 4), 
                CompareBuilder("Faculty", 5)
            ]

            logger.info(`Fetch Both College Successfull for Compare`);
            res.status(200).json(Data);
        } catch(e) {
            logger.error("Failed to fetch Colleges College for compare");
            res.status(500).json({msg: "Failed to fetch College for compare"})
        }
   }

    // Delete College with given ID
    async delete(req:Request, res:Response) {
        try{
            const { idsToDelete } = req.body;
            const DeletedCollege = await prisma.collegeSchema.deleteMany({ 
                where: {
                    id: {
                        in: idsToDelete
                    }
                }
             });
            logger.warn(`Deleted College Successfull: ${DeletedCollege.count}`);
            res.sendStatus(204);
        } catch(e) {
            logger.error("Failed to Delete College");
            res.status(500).json({msg: "Failed to Delete College"})
        }
    }
}

const CollegeOperation = new CollegeOperationClass();

export default CollegeOperation;


