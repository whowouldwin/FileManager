import * as path from 'node:path';
import fs from 'fs';
import { promisify } from 'util';

export async function catCommand(currentDir, args) {
  return new Promise(async(resolve, reject) => {
    const fileName = args[1];
    if (args.length < 2) {
      console.log('Operation failed. You need to specify a file name');
      resolve();
      return;
    }

    const filePath = path.isAbsolute(fileName) ? fileName : path.join(currentDir, fileName);

    try {
      const access = promisify(fs.access);
      await access(filePath);

      const readStream = fs.createReadStream(filePath, 'utf-8');

      readStream.on('data', (chunk) => {
        process.stdout.write(chunk.toString());
      });
      readStream.on('end', () => {
        console.log();
        resolve();
      });
      readStream.on('error', (e) => {
        console.error(`Operation failed. Could not read file: ${filePath}`);
        resolve();
      });

    } catch (e) {
      console.error(`Operation failed. Error: ${e.message}`);
      resolve();
    }
  });
}