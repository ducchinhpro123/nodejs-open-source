// import express from "express";
// const app = require("node:http")
import http from "node:http"
const port = 3000;

http.createServer((req, res) => {
    res.write("<h1>Hello, World</h1>")
    res.end()
}).listen(port)


