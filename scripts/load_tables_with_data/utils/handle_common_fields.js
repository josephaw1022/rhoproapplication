const moment = require("moment");
const uuid = require("uuid");

const handleCommonFields = () => {
  const now = String(moment().format("ll"));
  return {
    id: String(uuid.v4()),
    create_date: now,
    update_date: now,
    deleted: false,
  };
};

module.exports = handleCommonFields;
