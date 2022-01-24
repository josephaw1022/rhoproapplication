class DbTable {
	/**
	 * constructor
	 * @param {string} tableName
	 * @param {{field: string, field_type:string, primary_key?: boolean}[]} fields
	 */
	constructor(tableName, fields) {
		this.tableName = tableName;
		this.fields = fields;
	}

	/**
	 * createSql - this creates the sql to create the table for the fields
	 * @returns {string}the sql to run
	 */
	createSQL() {
		let fieldString = ``;
		this.fields.forEach(
			item => (fieldString += this.#makeSqlStringFromObject(item))
		);
		fieldString = this.#popString(fieldString);

		let sqlString = `CREATE ${this.tableName} ( 
            ${fieldString}
        ) ;`;

		return sqlString;
	}

	/**
	 * field - construct an object that is meant to be nested in a list and then used in the createSQL method
	 * @param {string} field_name
	 * @param {string} field_type
	 * @param {boolean} primary_key
	 * @returns { field_type:String, field_name: string,  primary_key?: boolean} - sqlObject
	 */
	static field(field_name, field_type, primary_key = false) {
		return {
			field_name: field_name,
			field_type: field_type,
			primary_key: primary_key,
		};
	}

	/**
	 *
	 * @param{*} type any type of variable
	 * @returns {string} typeof variable in sql
	 */
	#handleType = type => {
		if (type == "string") return "VARCHAR (255)";
		if (type == "number") return "INT";
		if (type == "boolean") return "BOOLEAN";
		if (type == "long_string") return "TEXT";
	};

	/**
	 * makeSqlStringFromObject - create a sql String from an javascript object
	 * @param {type: string, primary_key: boolean , field: string } sqlObject
	 * @returns
	 */
	#makeSqlStringFromObject = sqlObject => {
		const pkString = sqlObject.primary_key ? "PRIMARY_KEY" : "";
		const sqlString = `\n${sqlObject.field_name} ${this.#handleType(
			sqlObject.field_type
		)} ${pkString} ,`;

		return sqlString;
	};

	/**
	 * popString - intended to remove the comma from the end of the string
	 * @param {string} stringVariable
	 * @returns {string} formatted string
	 */
	#popString = stringVariable =>
		stringVariable.substring(0, stringVariable.length - 1);

	/**
	 * deleteTable - creates the sql to delete the table
	 * @returns sql
	 */
	deleteTable = () => `DROP TABLE ${this.tableName} ; `;
}

module.exports = DbTable;
