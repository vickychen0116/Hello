import { indexOf } from "lodash";

//串字串===========================
let myName: string ="Tom";
let myAge : number = 25;
let valuestring : string = `Hello, my name is ${myName}. I'll be ${myAge + 1} years old` ;
console.log("反引號 串字串:",valuestring);

//聯合型別===========================
let myStringNumber : string | number;
myStringNumber = "seven";
myStringNumber = 7;
console.log("聯合型別:", myStringNumber);

//json===========================
const jsonstring = '{"abc":"XXX", "def":123}';
let JsonModel :{
    abc: string;
    def: number;
}
let temp1:{abc:string, def:number} = JSON.parse(jsonstring);

//列舉===========================
enum weekdate {sunday,monday,tuesday, wednesday};
let weekdayofbirthiday = weekdate.tuesday;

//interface /id唯讀屬性/age可選屬性/propName任意屬性===========================
interface IPerson {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom: IPerson = {
  id: 1234,
  name: 'Tom',
  gender: 'male'  
};
console.log(tom);

//陣列===========================
//let strings = ['hi', 'how are you', 'goodbye'];
//let numbers = [1, 2, 3, 4, 5];
//型別
//let numbers : number[]; 
//陣列泛型
let numbers : Array<number>; 
numbers  = [1,2,3,4];
// for of
/*for(let a of numbers){
  console.log(a);
}*/
//let doublenum = numbers.map(function(x){return x*2;});
let doublenum = numbers.map(x => x *2); //同上
console.log('陣列 map' , doublenum);

//interface 陣列泛型===========================
interface Ifibonacci{
  [index: number]: number;
}
let Testfibonacci:Ifibonacci;
Testfibonacci = [1,2,3,4];

//any 陣列===========================
let list: any[] = ['xcatliu', 25, { website: 'http://foya.com' }];
console.log(list);

//函式表示式===========================
let mySum = function(num1:number, num2:number):number{
    return num1 + num2;
}
console.log(mySum(1,2));

//剩余参数===========================
function addNumbers(...nums:number[]) {  
  let i:number=0;   
  let sum:number = 0; 
  nums.forEach(x=>sum+=x);
  console.log("加總：",sum) 
} 
addNumbers(1,2,3) 
addNumbers(10,10,10,10,10)

//反轉reverse===========================
console.log("reverse:", numbers.reverse());

//push 添加至陣列末端===========================
let testValue: [string, number];
testValue = ['tony', 25];
testValue.push(30);
testValue.push('aaa','bbb');
console.log("Push:" ,testValue);

//Class / extends===========================
class Animal {
  _strName!: string;
  constructor(strName:string) {
      this._strName = strName;
  }  

  sayHi() {
      return `My name is ${this._strName}`;
  }
}

class Cat extends Animal {
  constructor(strName:string) {
      super(strName); // 呼叫父類別的 constructor(name)
      console.log("Cat:" , this._strName);
  }
  sayHi() {
      return 'Meow, ' + super.sayHi(); // 呼叫父類別的 sayHi()
  }
}

let test = new Animal('Jack');
console.log(test.sayHi());// My name is Jack
let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
//-------------------------------------------------------

//Decorator 裝飾器 會錯======================================
/*
function decr1():void{
  console.log('this is Decorator1.');
}
@decr1()
class decr {
  constructor(temp:string) {
    console.log('this is class decorator.');
  }
}*/
interface ICar{
  color: string;
  getCarInfo(): string;
}

class CarI implements ICar {
  desc : string;
  color: string;
  protected brakes: string; //煞車
  constructor(color:string) {
    this.color = color;
    this.desc = '第一代車';
    this.brakes = '商業機密';
  }

  public getCarInfo():string{
     return `${this.desc}, ${this.color}`;
  }

  public treggerBrakes():string{
    let returlval: string = '普通煞車';
    if (this.brakes=='商業機密')
      returlval = '商業機密';

    return `煞車 ${this.brakes}`;
  }
}

class CarII extends CarI {

  constructor(color:string) {
    super(color);
  }

  public getCarInfo():string{
    return super.getCarInfo() +'改良款';
  }

  public treggerBrakes():string{
    return super.treggerBrakes() +'改良款';
  }
}

let myCar = new CarI('白色');
let testCar1:ICar = new CarI('dd');
let testCar2:ICar = new CarII('dd');

console.log(myCar.getCarInfo());
console.log(myCar.treggerBrakes());

let myCar2 = new CarII('紅色');
console.log(myCar2.getCarInfo());
console.log(myCar2.treggerBrakes());

//======================================
//Strategy Pattern 策略模式 - 出實作不同的相同行為
interface IInvoiceBehavior{
  invoice(name: string):void
}

class InvoiceFromAPE implements IInvoiceBehavior {
  public invoice(name: string): void {
    console.log(`${name} 亞太開發票`);
  }
}

class InvoiceFromDDMC implements IInvoiceBehavior {
  public invoice(name: string): void {
    console.log(`${name} DDMC開發票`);
  }
}
//---------------
class invoiceCenter {
  name: string;
  private InvoiceBehavior: IInvoiceBehavior;
  constructor(name: string, InvoiceBehavior: IInvoiceBehavior) {
    this.name = name;
    this.InvoiceBehavior = InvoiceBehavior;
  }

  public invoice(): void {
    this.InvoiceBehavior.invoice(this.name);
  }
}

class PPMember extends invoiceCenter {
  constructor() {
    super('PARKPAY', new InvoiceFromDDMC());
  }
}
class APEMember extends invoiceCenter {
  constructor() {
    super('APE', new InvoiceFromAPE());
  }
}
//==================================================================
//Payment ---------------
interface IPaymentBehavior{
  plan():string;
  pay():boolean;
}
class CreditCard implements IPaymentBehavior{
  public plan():string{
    return '使用信用卡付款';
  }
  public pay():boolean{
    return false;
  }
}
class LinePay implements IPaymentBehavior{
  public plan():string{
    return '使用LinePay付款';
  }
  public pay():boolean{
    return true;
  }
}

class paymentCenter {
  private PaymentBehavior: IPaymentBehavior;
  constructor(PaymentBehavior: IPaymentBehavior){
    this.PaymentBehavior = PaymentBehavior;
  }
   public plan(){
     return this.PaymentBehavior.plan();
   }
   public pay(){
     return this.PaymentBehavior.pay();
   }
}

class PaymentLinePay extends paymentCenter {
  constructor() {
    super(new LinePay());
  }
}

class PaymentCreditCard extends paymentCenter {
  constructor() {
    super(new CreditCard());
  }
}

class PaymentFactory {
  public static usePayment(type:string){
    switch(type){
      case "LinePay" : {
        return new PaymentLinePay();
      }
      case "CreditCard": {
        return new PaymentCreditCard();
      }
      default:
        break; 
    }
  }
}

let myPay =  PaymentFactory.usePayment("CreditCard");
let myPlan = myPay?.plan();
console.log(myPlan);
let payResult = myPay?.pay();
if (payResult){
  console.log("付款成功456");
}else{
  console.log("付款失敗123");
}

//myPay
let myInvoice = new PPMember()
myInvoice.invoice();
let apeMember = new APEMember()
apeMember.invoice();


var express = require('express');
var app = express();
var apis = require('./routes/api'); // 加在require部分
app.use('./routes/', apis); // 加在app.use部分

