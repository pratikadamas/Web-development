// function boilwater() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const success = true; // simulate sometimes failing
//             if (success) {
//                 resolve("Water boiled! take 2s.");
//             } else {
//                 reject("Water boiler broken!");
//             }
//         }, 2000);
//     });
// }

// function grindcoffee() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const success = true; // simulate sometimes failing
//             if (success) {
//                 resolve("Coffee ground! take 1s.");
//             } else {
//                 reject("Coffee grinder broken!");
//             }
//         }, 1000);
//     });
// }
// async function makeCoffee() {
//     console.log("Start making coffee...");
//     try {
//         const boiled = await boilwater(); // wait here
//         console.log(boiled);              // now continue
//         const ground = await grindcoffee(); // wait here
//         console.log(ground);              // now continue
//         console.log("Coffee is ready!");
//         console.log("Enjoy your coffee!");
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }   

// makeCoffee();


async function demo() {
    console.log("inside 1");
    await new Promise(res => setTimeout(res, 2000));
    console.log("stop 1");
     console.log("stop 2");
      console.log("stop 3");
       console.log("stop 4");

}

console.log("outside A");
demo();
console.log("outside B");

