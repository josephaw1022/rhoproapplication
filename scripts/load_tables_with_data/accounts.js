const CommonFields = require("./utils/handle_common_fields");
const PostItem = require("./utils/post_item");
const {handleSQLRequest} = require("../db_client")

const createItem = (index, brother_id) => {
  return {
    ...CommonFields(),
    brother_id,
    password: `P@$$word${index}`,
  };
};

const main = async () => {
  try { 
    let idList = await handleSQLRequest(` SELECT id FROM brothers ; `)
    .then(list => list.map(listItem => listItem.id))

    let list = [];

    idList.map((brotherID, index) =>
      list.push(createItem(index, brotherID))
    );

    list.map(account => PostItem(account, "accounts"));
    
  
  } 
    catch(error){ 
      console.log(error)
    }
};

main();
