
//* winston : A logger for just about everything. - http://github.com/winstonjs/winston 
//* winston-daily-rotate-file - https://www.npmjs.com/package/winston-daily-rotate-file 
//* winston exapmle - https://github.com/winstonjs/winston/tree/master/examples 
//* Source from https://github.com/winstonjs/winston/blob/master/examples/quick-start.js
// const { createLogger, format, transports } = require('winston');
import {createLogger,format,transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

//require('winston-daily-rotate-file');

// require('winston-mongodb');

//* Creating your own Logger - https://github.com/winstonjs/winston#creating-your-own-logger
//! https://github.com/winstonjs/winston#logging-levels
//! https://github.com/winstonjs/winston#formats
//! https://github.com/winstonjs/logform
//! https://github.com/winstonjs/logform#metadata
const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),    
    format.errors({ stack: true }),
    format.splat(),
    format.metadata({fillExcept:["level","timestamp","service","message","stack"]}),
    format.json(), // default is JSON Format.
    format.prettyPrint()    
  ),
  defaultMeta: { service: 'nodets' },
  transports: [    
    // new transports.File({ filename: 'log/error.json', level: 'error' }),
    // new transports.File({ filename: 'log/combined.json' }),
    //! winston-daily-rotate-file transports - https://www.npmjs.com/package/winston-daily-rotate-file#options      
    
    new DailyRotateFile({      
      // level: 'warn',
      level: 'error',
      filename: 'log/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',      
      maxSize: '20m',
      handleExceptions: true
    }),
    new DailyRotateFile({          
      filename: 'log/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',      
      maxSize: '20m',
      handleExceptions: true
    }),    
    //! MongoDB transport - https://github.com/winstonjs/winston-mongodb
    // new transports.MongoDB({
    //   level:'debug',  
    //   db:'mongodb://wayne-lab:swsefJun5DaSh6sAhzyQxYVsNtkgeNgVBmiVcvN3xSyf5hplTJHaLmUQVXmRX2rWYCPzYRD8AcXNXVytcxwCOQ==@wayne-lab.mongo.cosmos.azure.com:10255/mymongo?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@wayne-lab@',
    //   options: {useUnifiedTopology: true}            
    //   // collection: 'fff'         
    // })
  ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      // format.colorize(),      
      // format.simple(),
      // format.logstash(), 
      // format.json(),
      // format.prettyPrint(),
      // format.printf(({ level, message,label, service, timestamp }) => {
      //   return `${timestamp} [${service}] [${label}] ${level}: ${message}`;
      // }),
      // format.printf((info) => {
      //   return `${info.timestamp} [${info.service}] ${info.level}: ${info.message} - ${info.meta}`;
      // }),
    )
  }));
}

//* ***************
//* Allows for JSON logging
//* ***************

// logger.debug({
//   message: 'Allows for JSON logging',
//   additional: 'properties',
//   are: 'passed along'
// });


//* ***************
//* Allows for parameter-based logging
//* ***************

// logger.info('Allows for parameter-based logging', {
//   additional: 'properties',
//   are: 'passed along'
// });

// logger.debug("log user", {
//   gender:"Female",
//   name:"Milk"
// }); 


//* ***************
//* Allows for string interpolation
//* ***************
// logger.debug('Allows for string interpolation - %s', 'my string');
// logger.debug('Allows for string interpolation - %d', 123);
// logger.debug('Allows for string interpolation - %s, %s', 'first', 'second', { number: 123 });
// logger.info('Found %s at %s', 'error', new Date());
// logger.info('Found %s at %s', 'error', new Error('chill winston'));
// logger.info('Found %s at %s', 'error', /WUT/);
// logger.info('Found %s at %s', 'error', true);
// logger.info('Found %s at %s', 'error', 100.00);
// logger.info('Found %s at %s', 'error', ['1, 2, 3']);



//* ***************
//* Allows for logging Error instances
//* ***************

// logger.warn('Maybe important error: ', new Error('Error passed as meta'));
// logger.error(new Error('Error passed as info'));


//* ***************
//* show logger load success when debug
//* ***************

logger.debug("winston logger up and running.")

export default logger;