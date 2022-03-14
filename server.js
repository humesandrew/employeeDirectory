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

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log("Connected to employees_db on Port 3001")
);

inquirer
  .prompt([
    {
      type: "list",
      name: "viewAll",
      message: "What would you like to view (all)?",
      choices: ["Department", "Role", "Employee"],
    },
  ])

  .then((answer) => {
    switch (answer.viewAll) {
      case "Department":
        db.query("SELECT * FROM department", function (err, answer) {
          console.table(answer);
        });
        break;

      case "Role":
        db.query("SELECT * FROM role", function (err, answer) {
          console.table(answer);
        });
        break;

      case "Employee":
        db.query("SELECT * FROM employee", function (err, answer) {
          console.table(answer);
        });
        break;
    }
  });

app.listen(PORT, () => console.log("Server started on port: 3001"));

// junniper // TOD\
