const DBTable = require("./Table");

// types of variables
const str = "string";
const numb = "number";
const bool = "boolean";
const lstr = "long_string";

// Fields included in every entity
const shared_fields = [
  DBTable.field("id", str),
  DBTable.field("create_date", str),
  DBTable.field("update_date", str),
  DBTable.field("deleted", bool),
];

// fields for the account table
const brother_fields = [
  ...shared_fields,
  DBTable.field("name", lstr),
  DBTable.field("scroll_number", numb),
  DBTable.field("cell_phone", lstr),
  DBTable.field("active", bool),
  DBTable.field("email", lstr),
];

// fields for the account table
const account_fields = [
  ...shared_fields,
  DBTable.field("brother_id", str),
  DBTable.field("password", lstr),
];

// fields for the permissions table
const permission_fields = [
  ...shared_fields,
  DBTable.field("permission_group", lstr),
  DBTable.field("account_id", lstr),
];

// fields for the job table
const job_fields = [
  ...shared_fields,
  DBTable.field("job", lstr),
  DBTable.field("event_id", lstr),
  DBTable.field("brother_id", lstr),
  DBTable.field("creator_id", lstr),
];

// fields for the emergency contact table
const emergency_contact_fields = [
  ...shared_fields,
  DBTable.field("emergency_contact_name", lstr),
  DBTable.field("emergency_contact_number", lstr),
  DBTable.field("brother_id", lstr),
  DBTable.field("comments", lstr),
];

// fields for the merits table
const merit_fields = [
  ...shared_fields,
  DBTable.field("date", lstr),
  DBTable.field("reason", lstr),
  DBTable.field("comments", lstr),
  DBTable.field("brother_id", lstr),
  DBTable.field("creator_id", lstr),
];

// fields for the merits table
const demerit_fields = [
  ...shared_fields,
  DBTable.field("date", lstr),
  DBTable.field("reason", lstr),
  DBTable.field("comments", lstr),
  DBTable.field("brother_id", lstr),
  DBTable.field("creator_id", lstr),
];

module.exports = {
  brother_fields,
  account_fields,
  shared_fields,
  job_fields,
  emergency_contact_fields,
  merit_fields,
  demerit_fields,
  permission_fields,
};
