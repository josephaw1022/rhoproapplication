import Database from "../../../db/Database";

const brotherDB = new Database("brothers", {
	idField: "id",
	voidField: "deleted",
});

export default async function handler(req, res) {
	let response = null;

	

	if (req.method == "GET") {
		response = await brotherDB.getOne(req.query.id);
	}

	if (req.method == "POST") {
		response = await brotherDB.create(req.body);
	}

	if (req.method == "PUT") {
		response = await brotherDB.update(req.body, req.query.id);
	}

	if (req.method == "DELETE") {
		response = await brotherDB.delete(req.query.id);
	}

	res.status(200).json(response);
}
