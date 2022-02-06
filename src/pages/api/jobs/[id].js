
import { getJob } from "../../../server/jobs";

export default async function handler(req, res) {
  let response = null;

  if (req.method == "GET") response = await getJob(req)
    
  res.status(200).json(response);
}
