// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Database from "../../utils/aurora_postgres_db";

const brotherDB = new Database("brothers", {
	idField: "id",
	voidField: "deleted",
});

export default async function handler(req, res) {
	let { records } = await brotherDB.getAll();
	res.status(200).json(records);
}
