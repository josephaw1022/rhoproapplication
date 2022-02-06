import Database, { handleSQLRequest } from "../../utils/aurora_postgres_db";

const db = new Database('brothers')

export const getAllBrothers = async () => { 
    return await handleSQLRequest(`SELECT * FROM brothers WHERE (deleted is false and active is true ) ; `) ; 
}


export const getBrother = async (req , res) => { 
    return await db.getOne(req.query.id);

}

export const createBrother = async (req) => { 
    return await db.create(req.body)
}

export const updateBrother = async (req, res) => { 
    return  await db.update(req.body, req.query.id);
}

export const deleteBrother = async(req) => {
    return await db.delete(req.query.id)
}