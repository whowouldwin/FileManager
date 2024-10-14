import * as path from 'node:path';
import fs from 'fs/promises';

export async function renameCommand(currentDir, args) {
  if (args.length < 3) {
    console.log('Operation failed. Please specify the path and the file name');
    return;
  }
  const oldFilePath = path.isAbsolute(args[1]) ? args[1] : path.join(currentDir, args[1]);
  const newFileName = args[2];
  const newFilePath = path.join(path.dirname(oldFilePath), newFileName);

  try {
    await fs.rename(oldFilePath, newFilePath);
    console.log(`File renamed successfully to ${newFileName}`);
  } catch (e) {
    console.log('Failed to rename file:', err.message);
  }
}