import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export async function changeDirectory(currentDir, targetDir) {
  if (!targetDir) {
    console.log('Operation failed. You need to specify the directory');
    return currentDir;
  }
  const resolvedPath = path.isAbsolute(targetDir) ? targetDir : path.join(currentDir, targetDir);

  try {
    await fs.access(resolvedPath);
    const stats = await fs.lstat(resolvedPath);

    if (stats.isDirectory()) {
      return resolvedPath
    } else {
      console.log('Operation failed. Not a directory.');
      return currentDir
    }
  } catch (e) {
    console.log('Operation failed. Directory not found.');
    return currentDir;
  }
}