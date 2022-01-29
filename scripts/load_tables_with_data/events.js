const faker = require("faker");
const uuid = require("uuid");
const axios = require("axios");
const moment = require("moment");
const AuroraDB = require("../db_client");

const truncateEventTable = async () =>
  await AuroraDB.raw("TRUNCATE TABLE events ; ")
    .then(resp => console.log(resp))
    .catch(error => console.error(error));

const makeFakeEvent = (index, listOfIDs) => {
  const randomItem = list =>
    list[Math.floor(Math.random() * list.length)];
  const start_time = moment()
    .add(Math.floor(Math.random() * 4), "h")
    .add(Math.floor(Math.random() * 40), "m");

  return {
    creator_id: String(randomItem(listOfIDs)),
    id: uuid.v4(),
    date: moment()
      .add(Number(Math.floor(Math.random() * 400)), "d")
      .format("L"),
    start_time: start_time.format("LT"),
    end_time: start_time
      .add(Math.floor(Math.random() * 4), "h")
      .format("LT"),
    name: `event_${index}`,
    location: `location_${index}`,
    comments: "",
  };
};

const postEvent = async item => {
  await axios
    .post("http://localhost:3000/api/calendar", item)
    .then(resp => console.log(resp))
    .catch(error => console.error(error));
};




const main = async () => {
  await truncateEventTable();

  const listOfIDs = await AuroraDB.raw(
    `SELECT DISTINCT id from brothers ; `
  )
    .then(apiResponse => apiResponse.records)
    .then(records => records.map(item => item.id))
    .catch(error => console.log(error));

  let list_of_events = [];

  for (let i = 0; i < 100; i++) {
    let fakeEvent = await makeFakeEvent(i, listOfIDs);
    list_of_events.push(fakeEvent);
  }
  list_of_events.map(event => postEvent(event));
};

main();
