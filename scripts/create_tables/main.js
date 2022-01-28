require("dotenv").config();

const DbTable = require("./Table");
const Fields = require("./table_constants");
const db = require("./db_client");

const createTable = async dbTableInstance => {
  await db
    .raw(dbTableInstance.createTableSQL())
    .then(response => DbTable.handleResponse(response))
    .catch(error => DbTable.handleError(error));
};

const deleteTable = async dbTableInstance => {
  await db
    .raw(dbTableInstance.deleteTable())
    .then(response => DbTable.handleResponse(response))
    .catch(error => DbTable.handleError(error));
};

// database tables
const accountDB = new DbTable("accounts", Fields.account_fields);
const jobDB = new DbTable("jobs", Fields.job_fields);
const emergencyContactDB = new DbTable("emergency_contacts", Fields.emergency_contact_field) 

/**
 *  Account DB
 */

// createTable(accountDB)
// deleteTable(accountDB)


/**
 * Job DB 
 */

// createTable(jobDB);
// deleteTable(jobDB)



/**
 * Emergency Contact DB
 */

// createTable(emergencyContactDB)
// deleteTable(emergencyContactDB)