const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const dotenv = require("dotenv");
const inquirer = require("inquirer");
const fs = require("fs");

const mysql = require("mysql2");

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log("Connected to employees_db on Port 3001"),
  startPrompt()
);

function startPrompt() {
  inquirer
    .prompt([{
      type: "list",
      message: "Welcome to the Employee Directory. What would you like to do?",
      name: "choice",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee",
      ],
    }, ])
    .then(function (answer) {
      switch (answer.choice) {
        case "View all Departments":
          db.query("SELECT * FROM department", function (err, answer) {
            console.table(answer)
            startPrompt();
          });
          break;

        case "View all Roles":
          db.query("SELECT * FROM role RIGHT OUTER JOIN department ON department.id=role.department_id;", function (err, answer) {
            console.table(answer)
            startPrompt();
          });
          break;

        case "View all Employees":
          db.query("SELECT * FROM employees INNER JOIN role ON role_id=role.id", function (err, answer) {
            console.table(answer)
            startPrompt();
          });
          break;

        case "Add Department":
          inquirer.prompt([{
            name: "addDepartment",
            type: "input",
            message: "What Department would you like to add?"
          }]).then(function (res) {
            db.query(
              "INSERT INTO department SET ? ", {
                name: res.addDepartment

              },
              function (err) {
                if (err) throw err
                console.table(res);
                startPrompt();
              }
            )
          });
          break;

        case "Add Role":
          db.query("SELECT role.title AS Title, role.salary AS Salary, role.department_id AS Department FROM role", function (err, res) {
            inquirer.prompt([{
                  name: "Title",
                  type: "input",
                  message: "What is the roles Title?"
                },
                {
                  name: "Salary",
                  type: "input",
                  message: "What is the Salary?"

                },
                {
                  name: "Department",
                  type: "input",
                  message: "What is the Department ID?"

                }
              ])
              .then(function (res) {
                db.query(
                  "INSERT INTO role SET ?", {
                    title: res.Title,
                    salary: res.Salary,
                    department_id: res.Department
                  },
                  function (err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                  }
                )

              });
          });
          break;

        case "Add Employee":
          db.query("SELECT employees.first_name AS FirstName, employees.last_name AS LastName, employees.role_id as RoleId, employees.manager_id as ManagerId FROM employees", function (err, res) {
            inquirer.prompt([{
                  name: "FirstName",
                  type: "input",
                  message: "What is the employees first name?"
                },
                {
                  name: "LastName",
                  type: "input",
                  message: "What is the employees last name?"

                },
                {
                  name: "RoleId",
                  type: "input",
                  message: "What is the employees roll id?"

                },
                {
                  name: "ManagerId",
                  type: "input",
                  message: "What is the employees manager id?"

                }
              ])
              .then(function (res) {
                db.query(
                  "INSERT INTO employees SET ?", {
                    first_name: res.FirstName,
                    last_name: res.LastName,
                    role_id: res.RoleId,
                    manager_id: res.ManagerId
                  },
                  function (err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                  }
                )

              });
          });
          break;

        case "Update Employee":
          // var employeesArr = [];
          // db.query("SELECT * FROM employees INNER JOIN role ON employees.role_id = role.id", function (err, res) {
          //   console.table(res);
          //   if (err) throw err;
          //   for (var i = 0; i < res.length; i++) {
          //     employeesArr.push(res[i].first_name + " " + res[i].last_name);
          //   };


          //   inquirer.prompt([{
          //       name: "updateEmployee",
          //       type: "list",
          //       message: "Select employee.",
          //       choices: employeesArr
          //     },
          //     {
          //       name: "updateRole",
          //       type: "input",
          //       message: "What would you like the new role ID to be (1: Technician, 2: Doctor 3. HR?",
          //     }
          //   ]).then(function (res) {
                
          //     console.log(res.updateEmployee);
          //   })
          // });


          function updateRole() {
            connection.promise().query('SELECT * FROM employee')
                .then(([results]) => {
                    let updates = [];
                    results.map(
                        (result) => {
                            updates.push(result.id + ' ' + result.first_name);
                        }
                    );
                    // Selects the employee
                    inquirer.prompt([{
                            type: "list",
                            name: 'employee',
                            message: 'Choose the employee',
                            choices: updates
                        }])
                        .then(answers => {
                            // Targets the selected employee's ID
                            let id = answers.employee.substr(0, 4);
                            // Selects role titles from database
                            connection.promise().query('SELECT * FROM role')
                                .then(([results]) => {
                                    let updates = [];
                                    results.map(
                                        (result) => {
                                            updates.push(result.id + ' ' + result.title);
                                        }
                                    );
                                    // Selects the new role
                                    inquirer.prompt([{
                                            type: 'list',
                                            name: 'role',
                                            message: 'Select the new role',
                                            choices: updates
                                        }])
                                        .then(answers => {
                                            // Updates the new role in the database using the selected roles id
                                            let role_id = answers.role.substr(0, 4);
                                            connection.promise().query('UPDATE employee SET role_id = ? WHERE id=?', [role_id, id]);
                                            getEmployees();
                                            // questions();
                                        });
                                });
                        });
                });


              }





          
      }
    })
}

app.listen(PORT, () => console.log("Server started on port: 3001"));


// // SELECT * FROM employees_db.employees;

// "UPDATE employees SET role_id="2" WHERE id="1"";// 
// this works in sql workbench to update employee with id 1 (Andy Humes) to have role_id of 2 (doctor)//
           
//             // 