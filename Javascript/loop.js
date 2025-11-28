
console.log("Loop Examples");
// for loop
for(let i=1;i<=5;i++){
    console.log("for loop number: "+i);
}

// while loop
let j=1;
while(j<=5){
    console.log("While loop iteration: "+j);
    j++;
}

// do while loop
let k=1;
do{
    console.log("Do while loop iteration: "+k);
    k++;
}while(k<=5);


// for (const key in object) {
//   // code to be executed for each property
// }


console.log("for in loop example:");
const user = {
  name: 'Jane Doe',
  age: 30,
  occupation: 'Developer'
};

for (const prop in user) {
  console.log(`${prop}: ${user[prop]}`);
}


console.log("for each loop example:");

// for (DataType elementVariable : collectionName) {
//     // Code to be executed for each element
// }
const numbers = [10, 20, 30, 40, 50];

numbers.forEach((number) => {
  console.log(number);
});

console.log("for of loop example:");
const fruits = ['apple', 'banana', 'cherry'];
for (const fruit of fruits) {
  console.log(fruit);
}

