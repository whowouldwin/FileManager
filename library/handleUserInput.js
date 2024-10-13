import * as path from 'node:path';
import { changeDirectory } from './changeDirectory.js';

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
      case 'cd':
        if (args.length < 2) {
          console.log('Operation failed. You need to specify the directory');
          console.log(`
          Usage: 
            * Absolute path: cd /path/to/directory 
            * Relative path: cd folder_name (moves into the "folder_name" subfolder from your current location)
            * To go back one folder: cd ...
          Example: 
            cd /home/user/docs   (absolute path)
            cd docs   (relative path)
            cd ..
            cd ../folder_name
          `);
        } else {
          currentDir = await changeDirectory(currentDir, args[1]);
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