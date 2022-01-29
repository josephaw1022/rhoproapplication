const axios = require("axios");

const postEvent = async (item, table) => {
  await axios
    .post(`http://localhost:3000/api/${table}`, item)
    .then(resp => console.log(resp))
    .catch(error => console.error(error));
};

module.exports = postEvent;
