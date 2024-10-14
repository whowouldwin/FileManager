import * as path from 'node:path';
import fs from 'fs';
import { createHash } from 'crypto';

export async function calculateHash(args, rl, currentDir) {
  if (args.length < 2) {
    console.log('Operation failed. Please add the file path.')
    rl.prompt();
    return;
  }
  const filePath = path.isAbsolute(args[1]) ? args[1] : path.join(currentDir, args[1]);

  if (!fs.existsSync(filePath)) {
    console.log('Operation failed. File does not exist');
    rl.prompt();
    return;
  }
  try {
    const hash = createHash('sha256');
    const stream = fs.createReadStream(filePath);

    await new Promise((resolve, reject) => {
      stream.on('data', (chunk) => {
        hash.update(chunk);
      });
      stream.on('end', () => {
        resolve();
      })
      stream.on('error', (e) => {
        reject(e);
      })
    })

    const fileHash = hash.digest('hex');
    console.log(`Hash of the file: ${fileHash}`);

  } catch (e) {
    console.log(`Operation failed. Error: ${e.message}`);
  }
  rl.prompt();
}