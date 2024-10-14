import * as path from 'node:path';
import { cdCommand } from './commands/cdCommand.js';
import { lsCommand } from './commands/lsCommand.js';
import { catCommand } from './commands/catCommand.js';
import { addCommand } from './commands/addCommand.js';
import { renameCommand } from './commands/renameCommand.js';

export async function handleUserInput(line, rl, user, currentDir) {
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
      case 'cd':
        currentDir = await cdCommand(currentDir, args);
        break;
      case 'ls':
        await lsCommand(currentDir);
        break;
      case 'cat':
        await catCommand(currentDir, args, rl);
        break;
      case 'add':
        await addCommand(currentDir, args);
        break;
      case 'rn':
        await renameCommand(currentDir, args);
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