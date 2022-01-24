const DbTable = require("./Table");

const Fields = require("./table_constants");

const accountDB = new DbTable("accounts", Fields.account_fields);

console.log(accountDB.createSQL());
console.log(accountDB.deleteTable());
