import * as path from 'node:path';
import fs from 'fs';
import * as zlib from 'node:zlib';

async function processFile(args, currentDir, operation) {
  if (args.length < 3) {
    console.log('Please add a source file and destination file');
    return;
  }

  const filePath = path.resolve(currentDir, args[1]);
  let destPath = path.resolve(currentDir, args[2]);

  if (fs.existsSync(destPath) && fs.statSync(destPath).isDirectory()) {
    const fileName = operation === 'compress'
      ? path.basename(filePath) + '.br'
      : path.basename(filePath, '.br');
    destPath = path.join(destPath, fileName);
  }

  if (!fs.existsSync(filePath)) {
    console.log('Operation failed');
    return;
  }

  return await new Promise((resolve, reject) => {
    const inputStream = fs.createReadStream(filePath);
    const outputStream = fs.createWriteStream(destPath);

    const brotli = operation === 'compress' ?
      zlib.createBrotliCompress() : zlib.createBrotliDecompress();

    outputStream.on('error', (err) => {
      console.log(`Operation failed. Error during ${operation}`, err);
      reject(new Error(`Error during ${operation}`));
    })
    outputStream.on('finish', () => {
      console.log(`Successfully ${operation} file`);
      resolve();
    });
    inputStream.pipe(brotli).pipe(outputStream);
  });
}

export async function compressFile(args, currentDir) {
  return processFile(args, currentDir, 'compress')
}

export async function decompressFile(args, currentDir) {
  return processFile(args, currentDir, 'decompress')
}