import * as path from 'node:path';
import fs from 'fs/promises';

export async function removeCommand(currentDir, args) {
  if (args.length < 2) {
    console.log('Operation failed. Please enter the valid file path to delete')
    return;
  }

  const filePath = path.isAbsolute(args[1]) ? args[1] : path.join(currentDir, args[1]);

  try {
    await fs.access(filePath)
    await fs.unlink(filePath)
    console.log(`Deleted ${filePath}`)
  } catch (e) {
    console.log(`Operation failed. Error: ${e.message}`)
  }

}