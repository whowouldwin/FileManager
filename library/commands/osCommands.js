import * as os from 'node:os';
import { cpusCommand } from '../utils/cpus/cpusCommand.js';

export async function osCommands(args) {
  const command = args[1]
  if (args.length < 2) {
    console.log('Operation failed. Please provide a valid args (--EOL, --cpus)')
    return;
  }
  try {
    switch (command) {
      case '--EOL':
        console.log(`Default symbol is ${JSON.stringify(os.EOL)}`);
        break;
      case '--cpus':
        await cpusCommand();
        break;
      case '--homedir':
        const homedir = os.homedir();
        console.log(`Home directory: ${homedir}`);
        break;
      case '--username':
        const info = os.userInfo();
        console.log(`User name: ${info.username}`);
        break;
      default:
        console.log('Operation failed. Please use the correct flags!');
    }

  } catch (e) {
    console.log('Operation failed. Please use the correct flags!');
  }
}