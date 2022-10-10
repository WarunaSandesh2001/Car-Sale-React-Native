const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../configs/db.configs');
const multer  = require('multer')


const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (carId INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) , date VARCHAR(255), location VARCHAR(255), description TEXT, image VARCHAR(255))";
        // var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (username VARCHAR(255) , date VARCHAR(255), location VARCHAR(255), description TEXT, image VARCHAR(255))";
        connection.query(carTableQuery, function (err, result) {
            if (result.warningCount === 0) {
                console.log("Car Table Created");
            }
        })
    }
})

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'D:/IJSE Course/Mobile Applications/CourseWork/Car Selling/CarSelling/images');
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post('/save',upload.single('photo'),(req,res)=>{

    console.log("Post Method In Car - Express");
    // console.log(req.file.originalname);
    
    const username = req.body.username
    const date = req.body.date
    const location = req.body.location
    const description = req.body.description
    const image = req.file.originalname

    var query = "INSERT INTO cars (username, date, location, description, image) VALUES (?, ?, ?, ?, ?)";

    connection.query(query, [username, date, location, description, image], (err) => {
        if (err) {
            res.send({ 'message': 'duplicate entry' })
        } else {
            res.send({ 'message': 'user created!' })
        }
    })
})

router.get('/:username', (req, res) => {

    const username = req.params.username;

    //console.log(username);

    var query = "SELECT * FROM cars where username=? ";
    connection.query(query,[username], (err, rows) => {
        if (err) console.log(err)
        //console.log(rows)
        res.send(rows)
    })
    //console.log(req.body);
})

router.delete('/deleteCar/:carId', (req, res) => {
    const carId = req.params.carId;

    var query = "DELETE FROM cars WHERE carId=?";

    connection.query(query, [carId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'Car deleted' })
        } else {
            res.send({ 'message': 'Car not found' })
        }
    })
})

// router.put('/update', (req, res) => {
//     const carId = req.body.carId;
//     const date = req.body.date;
//     const location = req.body.location;
//     const description = req.body.description;

//     var query = "UPDATE cars SET date=?,location=?,description=? WHERE carId=?";

//     connection.query(query, [date, location, description, carId], (err) => {
//         if (err) {
//             res.send({
//                 "status": "500",
//                 "message": "Error occured.Try again!"
//             });
//         } else {
//             res.send({
//                 "status": "200",
//                 "message": "Car updated successfully"
//             });
//         }
//     })
// })

module.exports = router