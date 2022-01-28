const DB = require("./Table");

// types of variables
const str = "string";
const numb = "number";
const bool = "boolean";
const lstr = "long_string";

// Fields included in every entity
const shared_fields = [
  DB.field("id", str),
  DB.field("create_date", str),
  DB.field("update_date", str),
  DB.field("deleted", bool),
];

// fields for the account table 
const account_fields = [
  ...shared_fields,
  DB.field("brother_id", str),
  DB.field("active", bool),
  DB.field("password", lstr),
];


// fields the job table 
const job_fields = [
  ...shared_fields,
  DB.field("job", lstr),
  DB.field("event_id", lstr),
  DB.field("brother_id", lstr),
];

const emergency_contact_field = [
  ...shared_fields, 
  DB.field("emergency_contact_name", lstr), 
  DB.field("emergency_contact_number", lstr), 
  DB.field("brother_id", lstr), 
  DB.field("comments", lstr)
]


module.exports = {
  account_fields,
  shared_fields,
  job_fields, 
  emergency_contact_field, 
};
