import Database from "../../../db/Database";

const brotherDB = new Database("brothers", {idField: 'id', voidField:'deleted'})

export default async function handler(req, res) {
  let records = await brotherDB.getAll() ; 
  res.status(200).json(records)
}
