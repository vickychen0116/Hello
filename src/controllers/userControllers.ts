import express from "express";
import { Response, Request, NextFunction } from "express";
import { UserModel } from "../models/userModel";
import fs from "fs";

let lstUser : UserModel[] = new Array<UserModel>();
function getUser(){
  if (lstUser.length==0){
    let data = fs.readFileSync("./data/user.json","utf-8");
    for(let a of (<Array<UserModel>>JSON.parse(data))){
      let myUsers : UserModel = {
        id: a.id,
        name: a.name,
        password: a.password,
        years: a.years|0
      };
      lstUser.push(myUsers);
    }
  }
}

//Add
export const adduser = (req:Request, res:Response)=> {
  getUser();
  let myUsers : UserModel = {
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
    years: req.body.years|0
  };
  lstUser.push(myUsers);
  console.log(lstUser);
  res.end(JSON.stringify(lstUser));
};

//Get All
export const getalluser = (req:Request, res:Response)=> {
  getUser();
  console.log(lstUser);
  res.send(JSON.stringify(lstUser));
};
//Get :id
export const getuser = (req:Request, res:Response)=> {
  getUser();
  let user = lstUser.filter(x=>x.id.toString()==req.params.id);
  console.log('user1:' , user);
  res.end(JSON.stringify(user));
};

//Delete
export const deleteuser = (req:Request, res:Response)=> {
  fs.readFile("./data/user.json",{encoding:"utf-8"},(err:any,data:any)=>{
    data = JSON.parse(data);
    delete data[req.params.id];
      console.log(data);
      res.end(JSON.stringify(data));
  });
};