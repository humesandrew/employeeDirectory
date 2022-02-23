INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Andy", "Humes", 1, 1),
       (2, "Joel", "Gonzales", 1, 1),
       (3, "Anna", "Pappas", 1, 1),
       (4, "Bob", "Gordon", 1, null),
       (5, "Ashley", "House", 2, 2),
       (6, "Eldon", "Renaud", 2, 2),
       (7, "Lance", "Forstot", 2, null),
       (8, "Angela", "Devries", 3, 3),
       (9, "Darshan", "Parikh", 3, null);
       

INSERT INTO department (id, name)
VALUES (1, "Clinical"),
       (2, "Physicians"),
       (3, "Human Resources");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Technician", 45000, 1),
       (2, "Doctor", 200000, 2),
       (3, "HR Professional", 35000, 3);