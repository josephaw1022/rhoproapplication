import Database from "../../../db/Database";

const brotherDB = new Database("brothers", {
	idField: "id",
	voidField: "deleted",
});

export default async function handler(req, res) {
	let response = null;

	if (req.method == "POST") {
		response = await brotherDB.create(req.body);
	}

	if (req.method == "GET") response = await brotherDB.getAll();
  
	res.status(200).json(response);
}
