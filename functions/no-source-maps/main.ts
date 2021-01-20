export function doSomething() {
  // Get a random number
  const randomNumbar = getRandomNumber(0, 100);

  // And pass it to the function that throws an error
  functionThatThrowsAnError(randomNumbar);
}

function getRandomNumber (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function functionThatThrowsAnError(number: number) {
  console.log('A function that throws an error is invoked');

  throw new Error(`Received number ${number}`);
}