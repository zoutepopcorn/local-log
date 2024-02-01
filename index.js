import { exec } from 'node:child_process';
const OUT = exec('docker logs -f --tail=100 localstack-main')
OUT.stdout.on('data', (data) => {
	const DATA = data.toString();
	const LINES = DATA.split('\n');
	for(const LINE of LINES) {
		const INFO = LINE.indexOf("INFO\t");
		if(INFO > 0) {
			console.log(LINE.substring(INFO + 5, LINE.length))
		}
	}
})
OUT.stderr.on('data', (data) => {
	console.log('stderr: ' + data.toString())
})
OUT.on('exit', (code) => {
	console.log('child process exited with code ' + code.toString())
})