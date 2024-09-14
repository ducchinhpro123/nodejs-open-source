import fs from 'node:fs'

fs.readFile("./text.txt", 'utf8', (error, data) => {
	console.log(data)
})


