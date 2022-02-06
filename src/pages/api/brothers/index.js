
import { createBrother, getAllBrothers } from "../../../server/brothers";

export default async function handler(req, res) {
  let response = null;
  if (req.method == "POST") response = await createBrother(req)
  if (req.method == "GET")  response = await getAllBrothers(req)
  res.status(200).json(response)
}
