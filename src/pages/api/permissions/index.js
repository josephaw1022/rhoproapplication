import Database from "../../../utils/aurora_postgres_db";

const db = new Database("permissions", {
	idField: "id",
	voidField: "deleted",
});

export default async function handler(req, res) {
	let response = null;

	if (req.method == "GET") response = await db.getAll();

	if (req.method == "POST") response = await db.create(req.body);

	res.status(200).json(response);
}
