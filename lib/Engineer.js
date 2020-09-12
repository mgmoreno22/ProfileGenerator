const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
        this.role = "Engineer"
    }

    getGithub() {
        return this.github
    }
}

module.exports = Engineer;