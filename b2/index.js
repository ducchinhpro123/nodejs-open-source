import os from "node:os";
import http from "node:http";
import fs from "node:fs";
import EventEmitter from "node:events";

// init event mitter
const eventEmitter = new EventEmitter();
eventEmitter.on("writtenSuccessfully", () => {
  console.log("Completed Task!");
})

const information = {
  osType: os.type(),
  platform: os.platform(),
  ram: os.totalmem(),
  usedRam: os.totalmem() - os.freemem(),
  CPU: os.cpus(),
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(information, null, 2));
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

fs.writeFile("/home/duchinh/programming/nodejs/b2/homework.txt",
  JSON.stringify(information, null, 2), (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File written successfully");
    eventEmitter.emit("writtenSuccessfully");
  },
);

