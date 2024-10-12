export async function handleUserInput (line, rl, user, currentDir) {
  const input = line.trim();
  if (input === '.exit') {
    rl.close();
  } else {
    console.log('Invalid input')
  }
  rl.prompt();
}