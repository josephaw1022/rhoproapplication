const moment = require("moment");

const formatDateForDB = (datestr = moment()) => {
  if (!datestr) return datestr;
  let date = moment.utc(datestr, moment.ISO_8601);
  return String(date.format("YYYY-MM-DD"));
};

const formatDateForFrontEnd = (
  date = formatDateForDB(moment())
) => {
    return String(date.clone().format('"MMM Do YY"'))

};

const formatDateTimeForDB = (date = moment()) => {
    return date.clone().toISOString()
};

const formatDateTimeForFrontEnd = (date = moment()) => {
    return date.clone().format('MMMM Do YYYY, h:mm:ss a')
};

const formatTimeForDB = (date = moment()) => {
    return date.clone().format('h:mm:ss')
};

const formatTimeForFrontEnd = (date = moment()) => {
    return date.clone().format('h:mm:ss a')
};



module.exports = { 
    formatDateForDB, 
    formatDateTimeForDB, 
    formatTimeForDB, 
    formatDateForFrontEnd, 
    formatDateTimeForFrontEnd, 
    formatTimeForFrontEnd, 
}