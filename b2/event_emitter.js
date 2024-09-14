import EventEmitter from 'node:events';

const eventEmitter = new EventEmitter();

eventEmitter.on("end", (number, a) => {
	console.log(`Hello from eventEmitter ${number}`)
})

eventEmitter.emit("end", 100, 1);
