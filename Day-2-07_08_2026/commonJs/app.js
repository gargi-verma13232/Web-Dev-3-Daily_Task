// const cities = require('./data/myData.js');
// console.log(cities);
// const chalk = require('chalk');
// console.log(chalk.italic.green('Success!'));
// console.log(chalk.red.bold('Error!'));

//fs Core Module

// const fs = require('fs');
// fs.writeFileSync('data/data.txt', 'Hello, world~!');

// OS Core Module
// const os = require('os')
// const userinfo = os.userInfo()
// const platform = os.platform()
// const architecture = os.arch()
// const uptime = os.uptime()
// console.log(uptime)
// console.log(platform)
// console.log(architecture)
// console.log(userinfo)

// Path Core Module

// const path = require('path')
// const filepath = path.join(__dirname, 'data', 'data.txt')
// // __dirname to take all path from root , if not from root that is relative then simply leave it
// console.log(filepath)

// Crypto Core Module

// const crypto = require('crypto')
// const hash = crypto.createHash('sha256')
// hash.update('Hello, world~!')
// console.log(hash.digest('hex'))
// UUID assignment
// const uuid = crypto.randomUUID();
// console.log('UUID:', uuid)

// URL Core Module

// const url = require('url')
// const url = require('url')
// const myURL = 'https://example.com?name=John&age=30&city=New%20York'
// const parsedURL = new URL(myURL)
// console.log(parsedURL)

//DNS Module

// const dns = require("dns")
// dns.lookup('google.com', (err, address) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(address)
// })

//  Process Object

// const process = require('process')
// console.log(process.cwd)
// console.log(process.pid)
// console.log(process.ppid)
// console.log(process.execPath)
// console.log(process.execArgv)
// console.log(process.argv[2])
// console.log(process.argv)

// dotenv package access .env
// require('dotenv').config();
// console.log(process.env.PORT);
// console.log(process.env.BODY_COUNT);
