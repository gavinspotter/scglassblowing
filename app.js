const express = require("express")
const app = express();
require('dotenv').config()

const httpServer = require("http").createServer(app);


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});


app.use((req, res, next) => {
    const error = new HttpError("could not find this route", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "an unknown error occured" });
});

httpServer.listen(process.env.PORT || 5000)
        console.log("connected")