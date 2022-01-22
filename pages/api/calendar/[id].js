import Database from "../../../db/Database";

const eventDB = new Database("Events", {
	idField: "id",
	voidField: "deleted",
});

export default async function eventhandler(req, res) {
	let response = null;

	if (req.method == "GET")
		response = await eventDB.getOne(req.query.id);

	if (req.method == "PUT")
		response = await eventDB.update(req.body, req.query.id);

	if (req.method == "DELETE")
		response = await eventDB.delete(req.query.id);

	res.status(200).json(response);
}