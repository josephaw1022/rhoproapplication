import Database from "../../../utils/aurora_postgres_db";

const permissions = new Database("permissions", {
  idField: "account_id",
  voidField: "deleted",
});

export default async function handler(req, res) {
  let response = null;

  if (req.method == "GET")
    response = await permissions.getOne(req.query.id);

  if (req.method == "PUT")
    response = await permissions.update(req.body, req.query.id);

  if (req.method == "DELETE")
    response = await permissions.delete(req.query.id);

  res.status(200).json(response);
}
