import * as path from 'node:path';
import { cdCommand } from './commands/cdCommand.js';
import { lsCommand } from './commands/lsCommand.js';
import { catCommand } from './commands/catCommand.js';
import { addCommand } from './commands/addCommand.js';
import { renameCommand } from './commands/renameCommand.js';
import { copyCommand } from './commands/copyCommand.js';
import { moveCommand } from './commands/moveCommand.js';
import { removeCommand } from './commands/removeCommand.js';
import { osCommands } from './commands/osCommands.js';
import { calculateHash } from './utils/hash/calculateHash.js';
import { compressFile } from './utils/compression/fileCompression.js';

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
      case 'cp':
        await copyCommand(currentDir, args);
        break;
      case 'mv':
        await moveCommand(currentDir, args);
        break;
      case 'rm':
        await removeCommand(currentDir, args);
        break;
      case 'os' :
        await osCommands(args);
        break;
      case 'hash':
        await calculateHash(args, rl, currentDir);
        break;
      case 'compress':
        await compressFile(args, currentDir);
        break;
      case 'decompress':
        await decompressFile(args, currentDir);
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