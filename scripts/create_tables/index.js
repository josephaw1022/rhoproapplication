require("dotenv").config();

const DbTable = require("./Table");
const Fields = require("./table_constants");
const auroraDB = require("../db_client");

const createTable = async dbTableInstance => {
  await auroraDB
    .raw(dbTableInstance.createTableSQL())
    .then(response => DbTable.handleResponse(response))
    .catch(error => DbTable.handleError(error));
};

const deleteTable = async dbTableInstance => {
  await auroraDB
    .raw(dbTableInstance.deleteTable())
    .then(response => DbTable.handleResponse(response))
    .catch(error => DbTable.handleError(error));
};

const truncateTable = async dbInstance => {
  await auroraDB
    .raw(dbInstance.truncateTable())
    .then(response => DbTable.handleResponse(response))
    .catch(error => DbTable.handleError(error));
};

// database tables
const brotherDB = new DbTable("brothers", Fields.brother_fields);
const accountDB = new DbTable("accounts", Fields.account_fields);
const jobDB = new DbTable("jobs", Fields.job_fields);
const emergencyContactDB = new DbTable("emergency_contacts",Fields.emergency_contact_fields);
const meritDB = new DbTable("merits", Fields.merit_fields);
const demeritDB = new DbTable("demerits", Fields.demerit_fields);
const permissionDB = new DbTable("permissions",Fields.permission_fields);
const eventDB = new DbTable("events", Fields.event_fields)

/**
 * Brother Table
 */
// createTable(brotherDB)
// deleteTable(brotherDB)
// truncateTable(brotherDB)

/**
 *  Account Tab;e
 */

// createTable(accountDB)
// deleteTable(accountDB)
// truncateTable(accountDB)

/**
 * Job Table
 */

// createTable(jobDB);
// deleteTable(jobDB)

/**
 * Emergency Contact Table
 */

// createTable(emergencyContactDB)
// deleteTable(emergencyContactDB)

/**
 *  Merit / Demerit Tables
 */

// createTable(meritDB)
// deleteTable(meritDB)
// createTable(demeritDB)
// deleteTable(demeritDB)

/**
 * Permissions Fields
 */

// createTable(permissionDB)
// deleteTable(permissionDB)
// truncateTable(permissionDB)


/**
 * Permissions Fields
 */

 createTable(eventDB)
//  deleteTable(eventDB)
 // truncateTable(eventDB)
 