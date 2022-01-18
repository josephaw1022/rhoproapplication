import Database from "../../../db/Database"

const eventDB = new Database("events", {idField: 'id', voidField:'deleted'})

export default async function handler(req, res) {
  let {records} = await eventDB.getAll()
  res.status(200).json(records)
}
