import moment from "moment";
import { google } from "googleapis";

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = "+05:30";

export default class GoogleCalendar {
  /**
   *  getEvents - fetch all the events from the google calendar
   * @returns {event[] } items
   */
  static getEvents = async () => {
    let now = moment();
    let response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: now.clone().subtract(100, "days").format(),
      timeMax: now.clone().add(100, "days").format(),
    });

    let items = response["data"]["items"];
    return items;
  };

  /**
   * createEvent - create an event and add it to the calendar
   * @returns {number} sucess / failure response
   */
  static createEvent = async () => {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    });

    if (response["status"] == 200 && response["statusText"] === "OK")
      return 1;

    return 0;
  };

  static updateEvent = async () => {};

  static deleteEvents = async () => {};
}
