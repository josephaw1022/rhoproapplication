const CommonFields = require("./utils/handle_common_fields");
const PostItem = require("./utils/post_item");
const AuroraDB = require(`../db_client`);

const createAccount = (index, brother_id) => {
  return {
    ...CommonFields(),
    brother_id,
    password: `P@$$word${index}`,
  };
};

const main = async () => {
  await AuroraDB.raw(` SELECT id FROM brothers ; `)
    .then(resp => resp.records)
    .then(list => list.map(listItem => listItem.id))
    .then(idList => {
      let accountList = [];

      idList.map((brotherID, index) =>
        accountList.push(createAccount(index, brotherID))
      );

      accountList.map(account => PostItem(account, "accounts"));
    })
    .catch(error => console.log(error));
};

main();
