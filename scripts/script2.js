const defaultFields = {
	idField: "id",
	voidField: "deleted",
};

class DB {
	constructor(tableName, fields = {}) {
		const tempFields = Object.assign({}, defaultFields, fields);
		this.idField = tempFields.idField;
		this.voidField = tempFields.voidField;
		this.tableName = tableName;
	}
}

class CRUD extends DB {
	constructor() {
		super();
	}
	#handleType(variable) {
		return typeof variable == "string"
			? ` '${variable}',`
			: ` ${variable} ,`;
	}

	#popString(string) {
		return string.substring(0, string.length - 1);
	}

	usePrivateInheritedMethod() {
		const variable = "hello";
		let response = this.#handleType(variable);
		return response;
	}
}

const classInstance = new CRUD("table", {
	idField: "id",
	voidField: "deleted",
});

console.log(classInstance.usePrivateInheritedMethod());
