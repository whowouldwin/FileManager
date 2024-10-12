import { promptUserName } from './library/promptUserName.js';
import { handleUserInput } from './library/handleUserInput.js';

(async () => {
  const {user, rl, currentDir} = await promptUserName();
  console.log(`Welcome to the File Manager, ${user}`);
  console.log(`You are currently in ${currentDir}`);
  rl.setPrompt('> ')
  rl.prompt();

  rl.on('line', async (line) => {
    await handleUserInput(line, rl, user, currentDir);
  }).on('close', () => {
    console.log(`Thank you for using File Manager, ${user}, goodbye!`);
    process.exit(0);
  })
})();