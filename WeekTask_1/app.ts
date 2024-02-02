// Question 1

import { log } from "console";

//Fix The Factoris Issue.
function factorial(n: number): number {
  if (n <= 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

const result = factorial(5);
console.log(`Factorial of 5: ${result}`);

// Question2
// Simulating an asynchronous API request
function fetchData(callback: (data: string) => void): void {
  setTimeout(() => {
    const data = "Sample data from API";
    callback(data);
  }, 1000);
}

// Callback function to process the fetched data
function processCallbackData(data: string): void {
  console.log(`Processing data: ${data}`);
}

// Trigger the API request
fetchData(processCallbackData);
// Answer
// 1.) the callback function processCallbackData will be called when the asynchronous operation is complete. Meanwhile every other code in the fetchData function that is not asynchronous will be executed.

// Question 3
// Answer
// A call back function is a function that is passed as an argument to another function and is executed after some operation is completed.
// A call back function is used to structure our code in such a way that our code responds to actions and events in a logical and organized manner.

// Question 4
// Answer
// tsc --init

// Quetion 5
// Answer
// To handle file operations like creating, reading, deleting, etc., Node.js provides an inbuilt module called FS (File System). Node.js gives the functionality of file I/O by providing wrappers around the standard POSIX functions. All file system operations can have synchronous and asynchronous forms depending upon user requirements while HTTP is an in-build module which is pre-installed along with NodeJS. It is used to create server and set up connections. Using this connection, data sending and receiving can be done as long as connections use a hypertext transfer protocol.

// Question 6
// Answer
// ECMAScript 2022 (ES13)

// Quesiton 7
// Answer
function simpleInterest(p: number, r: number, t: number): number {
  let si = (p * r * t) / 100;
  return si;
}

const rest = simpleInterest(1000, 5, 2);
console.log(rest);
