import Database from "../../../utils/aurora_postgres_db";

const brotherDB = new Database("brothers", {
  idField: "id",
  voidField: "deleted",
});

export default async function handler(req, res) {
  let response = null;

  if (req.method == "POST") {
    response = await brotherDB.create(req.body);
  }

  if (req.method == "GET")
    response = await brotherDB
      .executeSQL(
        `SELECT * FROM brothers WHERE ( deleted = false AND active = true ) ; `
      )
      .then(item => item.records);

  res.status(200).json(response);
}
