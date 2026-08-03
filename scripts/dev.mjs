import { spawn } from 'node:child_process';
const jobs = [
  spawn('npm', ['run', 'dev', '-w', '@forrum/api'], { stdio: 'inherit', shell: process.platform === 'win32' }),
  spawn('npm', ['run', 'dev', '-w', '@forrum/web'], { stdio: 'inherit', shell: process.platform === 'win32' }),
];
function stop(code = 0) { for (const job of jobs) job.kill(); process.exit(code); }
for (const job of jobs) job.on('exit', (code) => { if (code && code !== 0) stop(code); });
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
