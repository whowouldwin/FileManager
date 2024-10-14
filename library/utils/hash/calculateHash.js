import * as path from 'node:path';
import fs from 'fs';
import { createHash } from 'crypto';

export async function calculateHash(args, rl, currentDir) {
  return new Promise((resolve, reject) => {
    if (args.length < 2) {
      console.log('Operation failed. Please add the file path.')
      rl.prompt();
      resolve();
      return;
    }
    const filePath = path.isAbsolute(args[1]) ? args[1] : path.join(currentDir, args[1]);

    try {
      if (!fs.existsSync(filePath)) {
        console.log('Operation failed. File does not exist');
        rl.prompt();
        resolve();
        return;
      }

      const hash = createHash('sha256');
      const stream = fs.createReadStream(filePath);

      stream.on('data', (chunk) => {
        hash.update(chunk);
      });
      stream.on('end', () => {
        const fileHash = hash.digest('hex');
        console.log(`Hash of the file: ${fileHash}`);
        rl.prompt();
        resolve();
      })
      stream.on('error', (e) => {
        console.log('Operation failed. Could not read file');
        rl.prompt();
        reject(e);
      })
    } catch (e) {
      console.log(`Operation failed. Error: ${e.message}`);
      rl.prompt();
      reject(e);
    }
  })
}