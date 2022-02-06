require("dotenv").config();

const DbTable = require("./Table");
const Fields = require("./table_fields");
const auroraDB = require("../db_client");

const brotherTable = new DbTable("brothers", Fields.brother_fields);
const accountTable = new DbTable("accounts", Fields.account_fields);
const jobTable = new DbTable("jobs", Fields.job_fields);
const emergencyContactTable = new DbTable("emergency_contacts",Fields.emergency_contact_fields);
const meritTable = new DbTable("merits", Fields.merit_fields);
const demeritTable = new DbTable("demerits", Fields.demerit_fields);
const permissionTable = new DbTable("permissions",Fields.permission_fields);
const eventTable = new DbTable("events", Fields.event_fields);

const all_tables = [
  brotherTable,
  accountTable,
  jobTable,
  emergencyContactTable,
  meritTable,
  demeritTable,
  permissionTable, 
  eventTable,
];

const createAllTables = async () => all_tables.map(item => item.createTable()) 
const deleteAllTables = async () => all_tables.map(item => item.deleteTable())
const truncateAllTables = async () => all_tables.map(item => item.truncateTable());

// createAllTables()
// deleteAllTables()
// truncateAllTables()
jobTable.truncateTable()