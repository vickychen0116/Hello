//import { UserModel } from './userModel';
/*export interface UserModel{
  readonly id:number,
  readonly name:string,
  password:string,
  years:number
};
*/

export type UserModel = {
  userid:number,
  name:string,
  password:string,
  mobilephone:string,
  postalcode:number,
  areaname:string,
  address:string
};