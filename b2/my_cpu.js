import os from 'os'


function my_cpu() {
	var my_cpu = {
		cpu: os.cpus(),
	};
	return my_cpu;
}

export default my_cpu;



