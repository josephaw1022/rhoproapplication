import Database from "../../../db/Database";

const db = new Database("events", {
	idField: "id",
	voidField: "deleted",
});

export default async function handler(req, res) {
	let response = null;

	if (req.method == "GET") response = await db.getAll();

	if (req.method == "POST") response = await db.create(req.body);

	res.status(200).json(response);
}
