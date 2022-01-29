import Database from "../../../utils/aurora_postgres_db";

const accountDB = new Database("accounts", {
	idField: "id",
	voidField: "deleted",
});

export default async function handler(req, res) {
	let response = null;

	try {
		if (req.method == "GET") {
			response = await accountDB.getOne(req.query.id);
		}

		if (req.method == "POST") {
			response = await accountDB.create(req.body);
		}

		if (req.method == "PUT") {
			response = await accountDB.update(req.body, req.query.id);
		}

		if (req.method == "DELETE") {
			response = await accountDB.delete(req.query.id);
		}

		res.status(200).json(response);
	} catch (err) {
		res.json(err);
	}
}
