
import { request } from "../../../utils/request"

export const getJobsForEvent = async (eventID, callback)  =>{ 

    const {data}  = await request.get(`/api/jobs_for_event/${eventID}`)

    return data ; 
}