// const job_fields = [
//     ...shared_fields,
//     DBTable.field("job", lstr),
//     DBTable.field("event_id", lstr),
//     DBTable.field("brother_id", lstr),
//     DBTable.field("creator_id", lstr),
//   ];

const CommonFields = require("./utils/handle_common_fields");
const PostItem = require("./utils/post_item");
const { handleSQLRequest } = require("../db_client");

const createItem = (eventID, brotherID, creator, index) => {
  return {
    ...CommonFields(),
    event_id: eventID,
    brother_id: brotherID,
    creator_id:creator,
    job: "random job",
  };
};

const main = async () => {
  try {

    const brotherIDList = await handleSQLRequest(
      `SELECT id FROM brothers WHERE (active = true AND deleted = false) ; `
    ).then(list => list.map(item => item.id));

    const eventIDList = await handleSQLRequest(
        `SELECT id FROM events WHERE (deleted = false) ; `
    ).then(list => list.map(item => item.id));


    let jobList = []
    eventIDList.map((event, index )=> { 
        jobList.push(createItem(event, brotherIDList[ Number(brotherIDList?.length || 0) % index] ,brotherIDList[1], index ))
    })

    for(let job of jobList)
        await PostItem(job, 'jobs')
    

  } catch (e) {
    console.clear();
    console.error(e);
  }
};

main();
