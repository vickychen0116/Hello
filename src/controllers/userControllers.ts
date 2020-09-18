
import { Response, Request, NextFunction } from "express";
import { Client } from 'pg';
import { POSTGRESQL_URI } from "../util/secrets";

const connectionString = POSTGRESQL_URI;
//let lstUser1 : UserModel[] = new Array<UserModel>();
/*const lstUser = new Array<UserModel>();
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
}*/

//Add
export const adduser = (req:Request, res:Response, next:NextFunction)=> {
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();
  client.query('INSERT INTO public.user(userid,name,password,mobilephone,postalcode,areaname,address)VALUES($1::int, $2::varchar, $3::varchar, $4::varchar, $5::int, $6::varchar, $7::varchar)', [req.body.userid,req.body.name,req.body.password,req.body.mobilephone,req.body.areano,req.body.areaname,req.body.address], function (err, result) {
    if (err) {
        console.log(err);
        res.status(400).send(err);
    }
    //console.log(result);
    res.status(200).send(result.rows);
    client.end();
  });

  /*getUser();
  const reqUser = req.body as UserModel;
  reqUser.years = reqUser.years|0;
  //let myUsers : UserModel = {
  //  id: req.body.id,
  //  name: req.body.name,
  //  password: req.body.password,
  //  years: req.body.years|0
  //};
  lstUser.push(reqUser);
  console.log(lstUser);
  res.end(JSON.stringify(lstUser));
  */
};

//Get All
export const getalluser = (req:Request, res:Response, next:NextFunction)=> {
  //getUser();
  //console.log(lstUser);
  //res.send(JSON.stringify(lstUser));
  const client = new Client({
      connectionString: connectionString
  });
  client.connect();
  client.query('SELECT * FROM public.user', [], function (err, result) {
    if (err) {
        console.log(err);
        res.status(400).send(err);
    }
    //console.log(result);
    res.status(200).send(result.rows);
    client.end();
  });
};

//Get :id
export const getuser = (req:Request, res:Response)=> {
  /*getUser();
  let user = lstUser.filter(x=>x.id.toString()==req.params.id);
  console.log('user1:' , user);
  res.end(JSON.stringify(user));*/
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();
  client.query('SELECT * FROM public.user WHERE userid = $1', [req.params.userid], function (err, result) {
    if (err) {
        console.log(err);
        res.status(400).send(err);
    }
    //console.log(result);
    res.status(200).send(result.rows);
    client.end();
  });
};

//Delete
export const deleteuser = (req:Request, res:Response, next:NextFunction)=> {
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();
  client.query('DELETE FROM public.user WHERE userid = $1', [req.params.userid], function (err, result) {
    if (err) {
        console.log(err);
        res.status(400).send(err);
    }
    //console.log(result);
    res.status(200).send(result.rows);
    client.end();
  });
  /*fs.readFile("./data/user111.json",{encoding:"utf-8"},(err:any,data:any)=>{
    if (err) {
      
      //let myerr = new Error as Error;
      //myerr.status = 404
      //myerr.message = '找不到檔案'
      //logger.debug(myerr);
      
      logger.debug("找不到檔案", err);
      return next(err); 
    }
    data = JSON.parse(data);
    delete data[req.params.id];
      console.log(data);
      res.end(JSON.stringify(data));
  });*/
};

export const putuser = (req:Request, res:Response, next:NextFunction)=> {
  console.log(req.body.name);
  console.log(req.body.userid);
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();
  client.query('UPDATE public.user SET name=$1, password=$2, mobilephone=$3, postalcode=$4, areaname=$5, address=$6 WHERE userid=$7', [req.body.name, req.body.password, req.body.mobilephone, req.body.areano, req.body.areaname, req.body.address, req.body.userid], function (err, result) {
    if (err) {
        console.log(err);
        res.status(400).send(err);
    }
    //console.log(result);
    res.status(200).send(result.rows);
    client.end();
  });
};