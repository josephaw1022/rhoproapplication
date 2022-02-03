const AuroraDB = require("../db_client");
const CommonFields = require("./utils/handle_common_fields");
const PostItem = require("./utils/post_item");
const moment = require("moment");

const createEvent = (index, id) => {
  const time = moment().add(Math.floor(Math.random() * 12), "h");
  const start_time = time.clone().format("h:mm:ss");
  const end_time = time
    .clone()
    .add(Math.random() * 3, "h")
    .format("h:mm:ss");
  const day = moment()
    .add(Math.floor(Math.random(400, "d")))
    .format("L");

  return {
    ...CommonFields(),
    name: `Event ${index}`,
    start_time,
    end_time,
    date: day,
    location: `location ${index}`,
    creator_id: id,
  };
};

const main = async () => {
  const response = await AuroraDB.raw(
    "SELECT id FROM brothers WHERE ( deleted = false )"
  )
    .then(resp => resp.records)
    .then(items => items.map(item => item.id));

  let listOfEvents = [];
  for (let i = 0; i < 160; i++) {
    let randomID =
      response[Math.floor(Math.random() * response.length - 1)];
    listOfEvents.push(createEvent(i, randomID));
  }
  // console.log(listOfEvents)
  for (let i = 0; i < 160; i++) PostItem(listOfEvents[i], "calendar");
};

main();
