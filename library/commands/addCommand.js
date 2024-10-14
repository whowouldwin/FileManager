import fs from 'fs/promises';
import * as path from 'node:path';

export async function addCommand(currentDir, args) {
  if (args.length < 2) {
    console.log('Operation failed. Please add the file name');
    return;
  }
  const newFileName = args[1];
  const newFilePath = path.join(currentDir, newFileName);

  try {
    await fs.writeFile(newFilePath, '');
    console.log('New file created');
  } catch (e) {
    console.log('Operation failed');
  }
}
