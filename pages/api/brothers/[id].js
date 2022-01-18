import Database from "../../../db/Database";

const brotherDB = new Database("brothers", {
	idField: "id",
	voidField: "deleted",
});

export default async function handler(req, res) {
	let response = null;

	try {
		if (req.method == "GET") {
			console.clear();
			console.log("I am getting here");
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
	} catch (err) {

		res.json(err)
	}
}
