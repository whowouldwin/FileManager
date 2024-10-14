import * as os from 'node:os';
import * as readline from 'node:readline';
export async function promptUserName(){
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question('Please enter a valid username ', (username) => {
      const user = username.trim() ? username.trim() : 'User';
      const currentDir = os.homedir();
      resolve({user, rl, currentDir})
    })
  })
}