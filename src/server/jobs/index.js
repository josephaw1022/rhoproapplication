import Database, { handleSQLRequest } from "../../utils/aurora_postgres_db"


const db = new Database('jobs')

export const getJobsByEvent = async (req) => { 
    return await handleSQLRequest(`SELECT * FROM  events, jobs, brothers WHERE ( jobs.event_id = events.id AND brothers.id = jobs.brother_id AND events.id = '${req.query.id}') ; `)
}

export const getJob = async req => { 
    return await db.getJob(req.query.id)
}