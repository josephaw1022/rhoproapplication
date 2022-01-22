const data = {
	name: "hello",
	age: 12,
};

// console.log(`${Object.keys(data)}`);
// console.log(`${Object.values(data)}`);

const testObject = {
	id: "447ab43b-6b27-11ec-8f30-08d23ea38422",
	name: "Party1",
	date: "october-2-2023",
	start_time: "9pm",
	end_time: "12am",
	location: "pall mall",
	comments: "be on time",
	creator_id: "a9d76f23-6a7a-11ec-8490-08d23ea38422",
	create_date: "2022-01-01 12:21:33.844141",
	update_date: "2022-01-01 12:21:33.844141",
	deleted: false,
};

const handleType = variable =>
	typeof variable == "string" ? `'${variable}' ,` : `${variable}`;

function formatSQL(table, object) {

    const id = object.id 

    if(object['id']) 
        delete object.id

    let sqlString = ''
	for (let key in object) {
		objectValue = ` ${key} = ${handleType(object[key])}`;
        sqlString+=objectValue ; 
	}

    sqlString = `UPDATE ${table} SET ${sqlString} WHERE id = ${id} ; `; 
    console.log(sqlString)

}

formatSQL("table", testObject);
