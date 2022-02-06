import Database, { handleSQLRequest } from "../../utils/aurora_postgres_db";

const db = new Database('events')

export const getAllEvents = async () => { 
    return await db.getAll()
}


export const getEvent = async (req , res) => { 
    return await db.getOne(req.query.id);

}

export const createEvent = async (req) => { 
    return await db.create(req.body)
}

export const updateEvent = async (req, res) => { 
    return  await db.update(req.body, req.query.id);
}

export const deleteEvent = async(req) => {
    return await db.delete(req.query.id)
}