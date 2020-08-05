import * as express from "express";
import * as bodyParser from "body-parser";
import * as fs from 'fs';
import apiRoutes from './DBMapping/Api/ApiRoutes';

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

let http = require("http").Server(app);

app.use('/API', apiRoutes);

const server = http.listen(3000, function () {
    console.log("listening on *:3000");
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Geti', {useNewUrlParser: true, useUnifiedTopology: true});
