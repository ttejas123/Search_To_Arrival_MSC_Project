export interface Cordinate { lat:string, lng:string }

export interface Faculty {
    faculty_name : string
    designation  : string
    exp          : string
    qualification: string
}

export interface Placement {
    company_name : string
    company_image: string
}

export interface Facilitie {
    facility_name:  string
    facility_image: string
}  

export interface BaseCardCourse {
    fee             : string 
    short_form      : string 
    name            : string
}

export interface CourseData {
    short_head      : string 
    courses_name    : string
    type            : string 
    duration        : string 
    fees_per_year   : string 
    eligibility     : string
}

export interface BaseCollegeDataModel {
    college_name  : string
    state         : string
    college_city  : string
    logo          : string
    cover         : string
    rating        : string
    url           : string 
    contact       : string 
    id            : string
    Cordinate     : Cordinate[]
    Facilities    : Facilitie[]
    Faculty       : Faculty[]
    baseCardCourseSchema: BaseCardCourse[]
    courses       : CourseData[]
    placements    : Placement[]
    _count        : any
}