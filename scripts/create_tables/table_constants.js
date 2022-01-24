const DbTable = require("./Table");

const str = "string";
const numb = "number";
const bool = "boolean";
const lstr = "long_string";

const shared_fields = [
	DbTable.field("id", str, true),
	DbTable.field("create_date", str),
	DbTable.field("update_date", str),
	DbTable.field("deleted", bool),
];

let comment = `

This is where we define our tables for our database 
- brothers 
- events 
- accounts 
- permissions 
- dues
`;

const brother_fields = [ 

]

const event_fields = [ 

]


const account_fields = [
	...shared_fields,
	DbTable.field("brother_id", str),
	DbTable.field("active", bool),
];



module.exports = {
	brother_fields, 
	event_fields, 
	account_fields,
	shared_fields,
};
