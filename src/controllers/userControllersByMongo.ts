
import { Response, Request, NextFunction } from "express";
//import { MONGODB_URI } from "../util/secrets";
import mongoose from 'mongoose';
import { Users, UserDocument } from "../models/user";
//const connectionString = MONGODB_URI;

export const adduser = (req:Request, res:Response, next:NextFunction)=> {
    mongoose.connect('mongodb://localhost:27017/vicky', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
        const elephant = new Users({
            name: req.body.name,
            password: req.body.password,
            mobilephone: req.body.mobilephone
          });
        elephant.save((err, result) => {
            if (err) {
              return console.error(err);
            }
            console.log('document saved', result);
            db.close(); // 結束與 database 的連線
          });
    });

};

export const getalluser = (req:Request, res:Response, next:NextFunction)=> {
    mongoose.connect('mongodb://localhost:27017/vicky', {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
        const User = mongoose.model('Users');
        User.find({}, (err, result) => {
            if (err) {
              return console.error(err);
            }
            console.log(result);
          });
        console.log("ok");
    });
    
};

export const getuser = (req:Request, res:Response)=> {
    mongoose.connect('mongodb://localhost:27017/vicky', {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    //db.once('open', function() {
        const User = mongoose.model('Users');
        const query = User.find({ 'name': req.params.name })
        query.exec(function (err, result) {
            if (err)  return console.error(err)
            console.log(result);
        });
    //});
    
};