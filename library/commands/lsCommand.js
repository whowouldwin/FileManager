import * as fs from 'node:fs/promises';

export async function lsCommand(currentDir) {
  try {
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    const directories = [];
    const files = [];

    for (const item of items) {
      if (item.isDirectory()) {
        directories.push({ Name: item.name, Type: 'directory' });
      } else if (item.isFile()) {
        files.push({ Name: item.name, Type: 'file' });
      }
    }

    directories.sort((a, b) => a.Name.localeCompare(b.Name));
    files.sort((a, b) => a.Name.localeCompare(b.Name));

    const sortedList = [...directories, ...files];
    console.table(sortedList);
  } catch (e) {
    console.error('Operation failed')
  }
}