import * as path from 'node:path';
import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream'

const pipelineAsyncStream = promisify(pipeline);

export async function copyCommand(currentDir, args){
  if (args.length < 3){
    console.log('Operation failed. Please add the file path and the path to the new directory.');
    return;
  }

  const sourcePath = path.isAbsolute(args[1]) ? args[1] : path.join(currentDir, args[1]);
  const destPath = path.isAbsolute(args[2]) ? args[2] : path.join(currentDir, args[2]);

  try {
    await fsPromises.access(sourcePath);
    const stats = await fsPromises.stat(destPath);
    if (!stats.isDirectory()) {
      console.log('Operation failed. Destination is not a directory');
      return;
    }

    const fileName = path.basename(sourcePath);
    const destFilePath = path.join(destPath, fileName);

    const readStream = fs.createReadStream(sourcePath)
    const writeStream = fs.createWriteStream(destFilePath);

    await  pipelineAsyncStream(readStream, writeStream);
    console.log('Successfully copying file');

  } catch (e) {
    console.log(`Operation failed. error: ${e} `);
  }
}