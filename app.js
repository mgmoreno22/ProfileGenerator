const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array to hold employee info
const employees = [];

// Questions to be asked in prompts
const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name? "
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID? "
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email? "
    },
    {
        type: "checkbox",
        name: "role",
        message: "What role is this employee?",
        choices: ["Manager", "Engineer", "Intern"]
    }
];
const managerQ = [
    {
        type: "input",
        name: "officeNum",
        message: "Please enter this manager's office number? "
    }
];
const engineerQ = [
    {
        type: "input",
        name: "github",
        message: "Please enter this engineer's github username? "
    }
];
const internQ = [
    {
        type: "input",
        name: "school",
        message: "Please enter this intern's school? "
    }
];

// ****** BEGINING OF FUNCTIONS *****
function newEmployee() {
    inquirer.prompt(employeeQuestions).then((data) => {

        if (data.role[0] === "Manager") {
            inquirer.prompt(managerQ).then((roleData) => {
                let newManager = new Manager(data.name, data.id, data.email, roleData.officeNum)
                console.log(newManager);
                employees.push(newManager)
                keepAdding()
            })
        } else if (data.role[0] === "Engineer") {
            inquirer.prompt(engineerQ).then((roleData) => {
                let newEngineer = new Engineer(data.name, data.id, data.email, roleData.github)
                console.log(newEngineer);
                employees.push(newEngineer)
                keepAdding()
            })
        } else if (data.role[0] === "Engineer") {
            inquirer.prompt(engineerQ).then((roleData) => {
                let newEngineer = new Engineer(data.name, data.id, data.email, roleData.github)
                console.log(newEngineer);
                employees.push(newEngineer)
                keepAdding()
            })
        } else if (data.role[0] === "Intern") {
            inquirer.prompt(internQ).then((roleData) => {
                let newIntern = new Intern(data.name, data.id, data.email, roleData.school)
                console.log(newIntern);
                employees.push(newIntern)
                keepAdding()
            })
        } else {
            console.log("Something went wrong, please try again")
            keepAdding()
        }
    })
};

function keepAdding() {
    inquirer.prompt({
        type: "confirm",
        name: "continue",
        message: "Would you like to add another employee? "
    }).then((response) => {
        if(response.continue) {
            console.log()
            newEmployee()
        } else {
            endProgram(employees)
            console.log("Your file has been generated!")
        }
    })
}

function endProgram(employees) {
    var generatedHtml = render(employees)
        fs.writeFile(outputPath, generatedHtml, (err) => {
            if (err) throw err;
            console.log("Your file has been generated.")
        })
}

newEmployee()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will  
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
