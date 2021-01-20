import { doSomething } from './main'

export async function handler() {
  // Can we log the trace with the following line?
  console.trace()

  // And then we'll invoke the function that returns an error
  return doSomething()
}