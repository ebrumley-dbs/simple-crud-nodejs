const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();

//Configuring express server
app.use(bodyparser.json());

//db details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'qodadmin',
    password: 'root1234',
    database: 'acc_views',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the student details from the MySQL Database
app.get('/students', (req, res) => {
    mysqlConnection.query('SELECT * FROM studentdetails', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to GET specific student detail from the MySQL database
app.get('/students/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM studentdetails WHERE student_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to POST and INSERT/UPDATE a student's detail
app.post('/students', (req, res) => {
    let student = req.body;
    mysqlConnection.query('INSERT INTO studentdetails\n' +
        '    (student_id, student_name, student_email, course_id)\n' +
        'VALUES\n' +
        '    (?, ?, ?, ?)\n' +
        'ON DUPLICATE KEY UPDATE\n' +
        '    student_name = ?,\n' +
        '    student_email = ?,\n' +
        '    course_id = ?',
        [student.student_id, student.student_name, student.student_email, student.course_id,
            student.student_name, student.student_email, student.course_id], (err, rows, fields) => {
            if (!err)
                res.send('inserted/updated rows: ' + rows.affectedRows);
            else
                console.log(err);
        })
});

//Router to DELETE a student's detail
app.delete('/students/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM studentdetails WHERE student_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('deleted rows: ' + rows.affectedRows);
        else
            console.log(err);
    })
});