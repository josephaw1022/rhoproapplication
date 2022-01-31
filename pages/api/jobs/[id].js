import Database from "../../../utils/aurora_postgres_db";

const jobDB = new Database("jobs", {
  idField: "id",
  voidField: "deleted",
});

export default async function handler(req, res) {
  let response = null;

  if (req.method == "GET")
    response = await jobDB.getOne(req.query.id);

  if (req.method == "PUT")
    response = await jobDB.update(req.body, req.query.id);

  if (req.method == "DELETE")
    response = await jobDB.delete(req.query.id);

  res.status(200).json(response);
}
