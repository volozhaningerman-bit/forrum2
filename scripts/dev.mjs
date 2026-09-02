import { spawn } from 'node:child_process';

const forwarded = process.argv.slice(2);
const isSupervisedPreview = forwarded.includes('--strictPort');
const nextArgs = forwarded
  .filter((argument) => argument !== '--strictPort')
  .map((argument) =>
    argument === '--host' ? '--hostname' : argument,
  );
const spawnOptions = {
  stdio: 'inherit',
  shell: process.platform === 'win32',
};
const jobs = isSupervisedPreview
  ? [
      spawn(
        'npm',
        [
          'run',
          'dev',
          '-w',
          '@forrum/web',
          '--',
          ...nextArgs,
        ],
        spawnOptions,
      ),
    ]
  : [
      spawn(
        'npm',
        ['run', 'dev', '-w', '@forrum/api'],
        spawnOptions,
      ),
      spawn(
        'npm',
        ['run', 'dev', '-w', '@forrum/web'],
        spawnOptions,
      ),
    ];

function stop(code = 0) { for (const job of jobs) job.kill(); process.exit(code); }
for (const job of jobs) job.on('exit', (code) => { if (code && code !== 0) stop(code); });
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
