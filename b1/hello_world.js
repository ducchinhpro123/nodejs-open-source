// import express from "express";
// const app = require("node:http")
import http from "node:http"
import os from 'os'
const port = 3000;

console.log(os.cpus())
console.log(os.platform())
console.log(os.type())
console.log(os.freemem())

http.createServer((req, res) => {
    res.write("<h1 style='color: red'>Hello, World</h1>")
    res.end()
}).listen(port)

