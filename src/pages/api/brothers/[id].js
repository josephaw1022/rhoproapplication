import {
  getBrother,
  createBrother,
  updateBrother,
  deleteBrother,
} from "../../../server/brothers";

export default async function handler(req, res) {
  let response = null;
  if (req.method == "GET") response = await getBrother(req);
  if (req.method == "POST") response = await createBrother(req);
  if (req.method == "PUT") response = await updateBrother(req);
  if (req.method == "DELETE") response = await deleteBrother(req);

  res.status(200).json(response);
}
