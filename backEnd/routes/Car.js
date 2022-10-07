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
        var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (username VARCHAR(255) , date VARCHAR(255), location VARCHAR(255), description TEXT, image VARCHAR(255))";
        connection.query(carTableQuery, function (err, result) {
            if (result.warningCount === 0) {
                console.log("Car Table Created");
            }
        })
    }
})

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'D:/IJSE Course/Mobile Applications/CourseWork/Car Selling/CarSelling/images/');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post('/save',upload.single('photo'),(req,res)=>{
    
    console.log(req.body.username);
    console.log(req.body.date);
    console.log(req.body.location);
    console.log(req.body.description);
    // console.log(req.body.date);
    // console.log(req.file);
    res.send({"message":"Uploaded"});
})

module.exports = router