const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, office) {
        super(name, id, email);
        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = office;
        this.role = "Manager"
    }

    getOfficeNumber() {
        return this.officeNumber
    }
}

module.exports = Manager;