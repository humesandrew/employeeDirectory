

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Humes", 1, 1),
       ("Joel", "Gonzales", 1, 1),
       ("Anna", "Pappas", 1, 1),
       ("Bob", "Gordon", 1, null),
       ("Ashley", "House", 2, 2),
       ("Eldon", "Renaud", 2, 2),
       ("Lance", "Forstot", 2, null),
       ("Angela", "Devries", 3, 3),
       ("Darshan", "Parikh", 3, null);
       

INSERT INTO department (name)
VALUES ("Clinical"),
       ("Physicians"),
       ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Technician", 45000, 1),
       ("Doctor", 200000, 2),
       ("HR Professional", 35000, 3);