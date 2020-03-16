# Simple CRUD/node.js/mySQL application

##Run with
`npm run start`

##API requests
GET (get all rows from table)

`http://localhost:8080/students`

GET (get one row from table)

`http://localhost:8080/students/3`

POST (insert-update table)

`http://localhost:8080/students`

`{
    "student_id": 4,
    "student_name": "dean",
    "student_email": "dean@dean.com",
    "course_id": 50
}`

DELETE (delete one row from table)

`http://localhost:8080/students/4`

##DB table

`create table studentdetails
(
    student_id    int         not null
        primary key,
    student_name  varchar(20) null,
    student_email varchar(40) null,
    course_id     int         null
);`

##DB rows

`INSERT INTO acc_views.studentdetails (student_id, student_name, student_email, course_id) VALUES (1, 'ana', 'ana@ana.com', 20);`

`INSERT INTO acc_views.studentdetails (student_id, student_name, student_email, course_id) VALUES (2, 'beto', 'beto@beto.com', 30);`

`INSERT INTO acc_views.studentdetails (student_id, student_name, student_email, course_id) VALUES (3, 'coraline', 'coraline@coraline.com', 15);`

##DB details

Change the host, user, password, database in `server.js` as necessary
