import { changeDirectory } from '../utils/changeDirectory.js';

export async function cdCommand(currentDir, args) {
  if (args.length < 2) {
    console.log('Operation failed. You need to specify the directory')
    console.log(`
     Usage: 
       * Absolute path: cd /path/to/directory 
       * Relative path: cd folder_name (moves into the "folder_name" subfolder from your current location)
       * To go back one folder: cd ..
       Example: 
       cd /home/user/docs   (absolute path)
       cd docs   (relative path)
       cd ..
       cd ../folder_name
       
       `);
    return currentDir;
  } else {
    return await changeDirectory(currentDir, args[1])
  }
}