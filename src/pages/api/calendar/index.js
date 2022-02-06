import { createEvent, getAllEvents } from "../../../server/calendar";

export default async function handler(req, res) {
  let response = null;
  if (req.method == "POST") response = await createEvent(req);
  if (req.method == "GET") response = await getAllEvents(req);
  res.status(200).json(response);
}
