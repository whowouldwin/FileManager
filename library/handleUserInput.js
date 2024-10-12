export async function handleUserInput (line, rl, user, currentDir) {
  const input = line.trim();
  const args = input.split(' ')
  const command = args[0];

  try {
    switch (command) {
      case '.exit':
        rl.close();
        return;
      default:
        console.log('Invalid input')
        break;
    }
  } catch (e) {
    console.log('Operation failed')
  }
  console.log(`You are currently in ${currentDir}`);
  rl.prompt();
}