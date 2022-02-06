import {
	createEvent, deleteEvent, getEvent, updateEvent
} from "../../../server/calendar";
  
  export default async function handler(req, res) {
	let response = null;
	if (req.method == "GET") response = await getEvent(req);
	if (req.method == "POST") response = await createEvent(req);
	if (req.method == "PUT") response = await updateEvent(req);
	if (req.method == "DELETE") response = await deleteEvent(req);
  
	res.status(200).json(response);
  }
  