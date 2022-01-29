import Database from "../../../utils/aurora_postgres_db";

const eventDB = new Database("jobs", {
  idField: "id",
  voidField: "deleted",
});

export default async function handler(req, res) {
  let response = null;

  if (req.method == "GET")
    response = await eventDB.getOne(req.query.id);

  if (req.method == "PUT")
    response = await eventDB.update(req.body, req.query.id);

  if (req.method == "DELETE")
    response = await eventDB.delete(req.query.id);

  res.status(200).json(response);
}
