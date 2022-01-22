import Database from "../../../db/Database";

const eventDB = new Database("events", {
	idField: "id",
	voidField: "deleted",
});

export default async function eventhandler(req, res) {
	let response = null;
	try {
		if (req.method == "GET")
			response = await eventDB.getOne(req.query.id);

		if (req.method == "POST") {
			response = await eventDB.create(req.body);
		}

		if (req.method == "PUT") {
			response = await eventDB.update(req.body, req.params.id);
		}

		if (req.method == "DELETE") {
			response = await eventDB.delete(req.params.id);
		}
	} catch (err) {
		res.status(500).json(err);
	}

	res.status(200).json(response);
}
