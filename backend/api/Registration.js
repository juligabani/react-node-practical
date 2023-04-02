var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var conn = require('../database/connection.db');
const helpers = require("../helpers/generalFunctions.js");
var bcrypt = require('bcrypt');
var saltRounds = 10;

router.post('/', [
    check('name').exists(),
    check('email').exists().isEmail(),
    check('password').exists(),
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(201).json( helpers.formatValidationResponse(errors) );
        return;
    }
    console.log('Hostname: ', process.env.DB_HOSTNAME);
    const { name, email, password } = req.body;

    var to_save = {
        'name': name,
        'email': email,
        'password': bcrypt.hashSync(password, saltRounds)
    };

    conn.query('SELECT * FROM users WHERE email = ?',[email], async function (error, result) {
        if (error) {
            res.status(400).json( helpers.error('Internal server error!') );
        } else {
            if(result.length > 0){
                res.status(400).json( helpers.error('Email Already Exist!') );
            } else {
                conn.query("INSERT INTO users SET ?", to_save, function(err, results) {
                    if (err) {
                        res.status(400).json( helpers.error('Internal server error!') );
                    } else {
                        res.status(200).json( helpers.success("Registered Successfully!"));
                    }
                })
            }
        }
    })

});

module.exports = router;