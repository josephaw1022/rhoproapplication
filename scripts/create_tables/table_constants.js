const DbTable = require("./Table");

// types of variables
const str = "string";
const numb = "number";
const bool = "boolean";
const lstr = "long_string";

// Fields included in every entity
const shared_fields = [
  DbTable.field("id", str),
  DbTable.field("create_date", str),
  DbTable.field("update_date", str),
  DbTable.field("deleted", bool),
];



// account fields 
const account_fields = [
  ...shared_fields,
  DbTable.field("brother_id", str),
  DbTable.field("active", bool),
  DbTable.field("password", lstr),
];





module.exports = {
  account_fields,
  shared_fields,
};
