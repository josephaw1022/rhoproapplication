const moment = require("moment");
const uuid = require("uuid");


function formatDateTimeForDB(datestr) {
  if (!datestr) return datestr;
  let date =  moment.utc(datestr, moment.ISO_8601);
  return String(date.format("YYYY-MM-DD HH:mm:ss"));
}

const handleCommonFields = () => {
  let now = formatDateTimeForDB(moment())

  return {
    id: String(uuid.v4()),
    create_date: String(now),
    update_date: String(now),
    deleted: false,
  };
};

module.exports = handleCommonFields;
