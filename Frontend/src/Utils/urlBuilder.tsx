export const BASEURL = import.meta.env.VITE_REACT_APP_BASE_URL

const UrlBaseFrame:any = {
    getAllColleges: '/college/',
    singleCollege: '/college/',
    placement: "/college/placement",
    courses: "/college/courses",
    state: "/college/groupbyState",
    city: "/college/groupbyCity",
    stats: "/college/compare" 
}

const buildUrl = (param:string) => {
    return (
        BASEURL + UrlBaseFrame[param]
    )
}

export default buildUrl