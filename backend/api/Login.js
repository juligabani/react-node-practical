var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var conn = require('../database/connection.db');
const helpers = require("../helpers/generalFunctions.js");
var bcrypt = require('bcrypt');
var saltRounds = 10;

router.post('/', [
    check('email').exists(),
    check('password').exists()
], (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(201).json( helpers.formatValidationResponse(errors) );
        return;
    }

    const { email, password } = req.body;

    
    conn.query('SELECT * FROM users WHERE email = ?',[email], async function (error, result) {
        if (error) {
            res.status(400).json( helpers.error('Internal server error!') );
        } else {
            if(result.length >0) {
                const comparision = await bcrypt.compare(password, result[0].password);
                if(comparision) {
                    res.status(200).json( helpers.success("Login Successfully!"));
                } else {
                    res.status(400).json( helpers.error('Email and password does not match!') );
                }
            }
            else {
                res.status(400).json( helpers.error('Email does not exits!') );
            }
        }
    });

    
});

module.exports = router;