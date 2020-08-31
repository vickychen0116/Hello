import { indexOf, remove } from "lodash";
import { resolve } from "path";
import express from "express";
import bodyParser from "body-parser";
import { Response, Request, NextFunction } from "express";
import async from "async";
import { allowedNodeEnvironmentFlags } from "process";
import fs from "fs";
import { Error } from "./models/errorModel";
/* Controllers (route handlers) */
import * as userController from "./controllers/userControllers";
import * as userControllersByMongo from "./controllers/userControllersByMongo";
/* Create Express server */
const app = express();

/* Connect to PostgreSQL */

/* Express configuration */
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));
//default用json
app.use(function (err: Error, req:Request, res:Response, next:NextFunction) {
  res.header('Content-Type', 'application/json');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
  next();
});

/* Primary app routes */
app.post("/users", userController.adduser);
app.get("/users", userController.getalluser);
app.get("/users/:id", userController.getuser);
app.delete("/users/:id", userController.deleteuser);

app.post("/usersByMongo", userControllersByMongo.adduser);
app.get("/usersByMongo", userControllersByMongo.getalluser);
app.get("/usersByMongo/:name", userControllersByMongo.getuser);

app.get('/index.html', function (req:string, res:any) {
  res.header('Content-Type', 'application/html');
   res.sendFile( __dirname + "/" + "index.html" );
})

const server = app.listen(app.get("port"), function () {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("Press CTRL-C to stop\n");
});