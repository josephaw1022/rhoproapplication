const {db:AuroraDB} = require("../db_client");
const CommonFields = require("./utils/handle_common_fields");
const PostItem = require("./utils/post_item");

const createBrother = index => {
  const scrollNumberAsInteger = 800 + index;
  return {
    ...CommonFields(),
    name: `Person ${index}`,
    scroll_number: scrollNumberAsInteger.toString(),
    cell_phone: Math.random().toString().slice(2, 11),
    email: `Person${index}@gmail.com`,
    active: true,
  };
};

const main = async () => {
  let listOfBrothers = [];
  for (let i = 0; i < 160; i++) listOfBrothers.push(createBrother(i));

  for (let i = 0; i < 160; i++)
    PostItem(listOfBrothers[i], "brothers");
};

main();
