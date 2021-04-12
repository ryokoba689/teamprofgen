const inquirer = require("inquirer");
const Employee = require("./Library/Employee");
const Engineer = require("./Library/Engineer");
const Intern = require("./Library/Intern");
const Manager = require("./Library/Manager");

const fs = require("fs");


function runInquirer() {
    const promptArray = [{
        type: "input",
        message: "What is your name?",
        name: "name"
    }, {
        type: "input",
        message: "What is your office ID?",
        name: "id"
    }, {
        type: "input",
        message: "What is your email? address",
        name: "email"
    }, {
        type: "list",
        message: "What is your job title",
        choices: ["Manager", "Engineer", "Intern"],
        name: "title"
    }];

    return inquirer
        .prompt(promptArray);
}

function runInquirerManager() {
    const promptArray = [{
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }];

    return inquirer
        .prompt(promptArray);
}

function runInquirerEngineer() {
    const promptArray = [{
        type: "input",
        message: "What is your github username?",
        name: "github"
    }];

    return inquirer
        .prompt(promptArray);
}

function runInquirerIntern() {
    const promptArray = [{
        type: "input",
        message: "What school do you attend?",
        name: "school"
    }];

    return inquirer
        .prompt(promptArray);
}


async function run() {
    let employeeArray = [];
    const maxTimes = 5;
    for (i = 0; i < maxTimes; i++) {
        const promise = new Promise((resolve, reject) => {
            runInquirer()
                .then(function ({ name, id, email, title }) {

                    if (title === "Manager") {
                        runInquirerManager().then(function ({ officeNumber }) {
                            this.employee = new Manager(name, id, email, officeNumber, title);
                            console.log(officeNumber);
                            employeeArray.push(employee);
                            resolve("done");
                        });

                    } else if (title === "Engineer") {
                        runInquirerEngineer().then(function ({ github }) {
                            this.employee = new Engineer(name, id, email, github, title);
                            console.log(github);
                            employeeArray.push(employee);
                            resolve("done");
                        });
                    } else if (title === "Intern") {
                        runInquirerIntern().then(function ({ school }) {
                            this.employee = new Intern(name, id, email, school, title);
                            console.log(school);
                            employeeArray.push(employee);
                            resolve("done");
                        });
                    }

                }).catch(function (err) {
                    console.log("There was an error.");
                    console.log(err);
                });
        });

        const result = await promise;
        console.log(result);
    }

   

    function displayTitle(employee) {
        if (employee.title === "Manager") {
            console.log(employee.officeNumber);
            return `office number: ${employee.officeNumber}`;
        }

        if (employee.title === "Intern") {
            return `school: ${employee.school}`;
        }

        if (employee.title === "Engineer") {
            return `gitHub: <a href="#">www.github.com/${employee.github}</a>`;
        }

    }
    function getCardHtml() {
        let html = "";
        for (j = 0; j < maxTimes; j++) {
            console.log(employeeArray[j])
            html += `<div class="card bg-dark justify-content-center align-items-center" style="width: 20rem;">
                <div class="col card-header">
                    <h4>${employeeArray[j].name}</h4>
                </div>

                <div class="col card-header">
                    <h4>${employeeArray[j].title}</h4 >
                </div >

                <ul class="list-group list-group-flush text">
                    <li class="list-group-item">ID: ${employeeArray[j].id}</li>
                    <li class="list-group-item">Email:<a href="mailto:${employeeArray[j].email}"> ${employeeArray[j].email}</li></a>
                    <li class="list-group-item"> ${displayTitle(employeeArray[j])}</li>
                </ul>

            </div > `;
        }
        return html;
    }



    let html = `< !DOCTYPE html >
                <html lang="en">

                    <head>
                        <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                                        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                                        <title>Document</title>

                                        <style>
                                            .row {
                                                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .card {
                                                padding: 10px;
                border-radius: 6px;
                background-color: white;
                color: grey;
                margin: 10px;
            }

            .text {
                                                padding: 10px;
                border-radius: 6px;
                background-color: grey;
                color: black;
                margin: 150x;
            }

            .col {
                                                flex: 1;
                text-align: center;
            }
        </style>
    </head>

                                    <body>
                                        <nav class="navbar navbar-dark bg-dark justify-content-center align-items-center">
                                            <span class="navbar-brand mb-0 h1">
                                                <h1>My Team</h1>
                                            </span>
                                        </nav>
                                        <div class="row">

                                            ${getCardHtml()}


                                        </div>

                                    </body>
    
    </html>

    `;




    console.log(html);
    const fs = require("fs");
    fs.writeFile('newprofile.html', html, function (err) {
        if (err) throw err;
        console.log('File is saved successfully');
    });
}
run()


