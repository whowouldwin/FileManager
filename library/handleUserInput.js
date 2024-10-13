import * as path from 'node:path';

export async function handleUserInput (line, rl, user, currentDir) {
  const input = line.trim();
  const args = input.split(' ')
  const command = args[0];

  try {
    switch (command) {
      case '.exit':
        rl.close();
        return currentDir;
      case 'up':
        const parentDir = path.dirname(currentDir);
        if (parentDir !== currentDir) {
          currentDir = parentDir;
        }
        break;
      default:
        console.log('Invalid input')
        break;
    }
  } catch (e) {
    console.log('Operation failed')
  }
  console.log(`You are currently in ${currentDir}`);
  rl.prompt();
  return currentDir;
}