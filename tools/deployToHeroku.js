import GitRepo from 'git-repository';
import fetch from 'node-fetch';
import run from './run';

const app = 'calm-chamber-81422';
const remote = {
  name: 'heroku',
  url: `https://git.heroku.com/${app}.git`,
  branch: 'master',
  website: `https://${app}.herokuapp.com`,
};

async function deployToHeroku() {
  // Initialize a new Git repository inside the '/build' folder
  // if it doesn't exist yet
  const repo = await GitRepo.open('build', { init: true });
  await repo.setRemote(remote.name, remote.url);

  // Fetch the remote repository if it exists
  const refExists = await repo.hasRef(remote.url, remote.branch);
  if (refExists) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/${remote.branch}`, { hard: true });
    await repo.clean({ force: true });
  }

  // Build the project in RELEASE mode witch
  // generates optimized and minimized bundles
  process.argv.push('--release');
  await run(require('./build'));

  // Push the contents of the build folder to the remote server via Git
  await repo.add('--all .');
  await repo.commit(`Update ${new Date().toISOString()}`);
  await repo.push(remote.name, `master:${remote.branch}`);

  const response = await fetch(remote.website);
  console.log(`${remote.website} -> ${response.status}`);
}

export default deployToHeroku;
