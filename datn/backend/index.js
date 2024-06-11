const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const passport = require('passport');
const routes = require('./routes');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors')
const session = require('express-session');
const cookieParser = require("cookie-parser");
// const { initRedis } = require('./config/redis');
const Server = async () => {
    dotenv.config();
    port = process.env.PORT || 3001;
    // initRedis()
    const app = express();
    app.set('view engine', 'ejs');
    app.use(cors())
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));

    app.use(
        session({
            resave: false,
            saveUninitialized: true,
            secret: "22feeb802e98e7b392057ad0acd4c48a"
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });
    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
    mongoose.connect(`${process.env.MONGODB_URI}`)
        .then(() => {
            console.log('Connect success!')
        })
        .catch((err) => {
            console.log(err)
        })



    routes(app)
    app.use((error, req, res, next) => {

        const statusCode = error.status || 500
        return res.status(statusCode).json(
            {
                status: 'error',
                code: statusCode,
                message: error.message || 'Internal Server Error'
            }
        )

    })

    app.listen(port, () => {
        console.log('Server is running in port', + port)
    })
}

Server()

