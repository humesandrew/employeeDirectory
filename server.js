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
          db.query("SELECT * FROM role", function (err, answer) {
            console.table(answer)
            startPrompt();
          });
          break;

        case "View all Employees":
          db.query("SELECT * FROM employees", function (err, answer) {
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

          case "Add Role?":
            addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;




      }
    });
}










// inquirer
//   .prompt([
//     {
//       type: "list",
//       name: "viewAll",
//       message: "What would you like to view (all)?",
//       choices: ["Department", "Role", "Employees"],
//     },
//   ])

//   .then((answer) => {
//     switch (answer.viewAll) {
//       case "Department":
//         db.query("SELECT * FROM department", function (err, answer) {
//           console.table(answer);
//         });
//         break;

//       case "Role":
//         db.query("SELECT * FROM role", function (err, answer) {
//           console.table(answer);
//         });
//         break;

//       case "Employees":
//         db.query("SELECT * FROM employees", function (err, answer) {
//           console.table(answer);
//         });
//         break;
//     }
//   });

app.listen(PORT, () => console.log("Server started on port: 3001"));

// junniper // TOD\