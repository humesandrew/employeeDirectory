const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const dotenv = require("dotenv");
const inquirer = require("inquirer");
const fs = require("fs");

const mysql = require("mysql2");

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "employees_db",
    },
    console.log("Connected to employees_db on Port 3001")
);

inquirer
    .prompt([{
        type: "list",
        name: "viewAll",
        message: "What would you like to view (all)?",
        choices: ["Department", "Role", "Employee"],
    }, ])
    .then((answers) => {
            // console.log(JSON.stringify(answers, null, "  "))

            switch (answers.name) {
                case "Department",
                db.query("SELECT * FROM department", function (err, results) {
                    console.log(results);
                }), }

        }
                //     db.query("SELECT * FROM department", function (err, results) {
                //         console.log(results);
                // //   console.log(answers.viewAll);
                //     }
                //   );
                // 
                app.listen(PORT, () => console.log("Server started on port: 3001"));