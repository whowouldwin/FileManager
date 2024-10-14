import os from 'node:os';

export async function cpusCommand() {
  const cpus = os.cpus();
  console.log(`Total number of CPUs is ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`Model: ${cpu.model}`)
    console.log(`Speed: ${cpu.speed / 1000}GHz`)
  });
}