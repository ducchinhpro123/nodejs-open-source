import http from "node:http"
import os from 'os'
import path from 'path'
import my_cpu from "./my_cpu.js";


const port = 3000;

let name = 'data.txt';
let folder = 'public';
console.log(path.join(folder, name));

console.log(my_cpu())

http.createServer((req, res) => {
	res.write("<h1 style='color: red'>Hello, Chinh</h1>")
	res.end()
}).listen(port)
