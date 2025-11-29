setTimeout(() => {
    console.log('task 1');
    setTimeout(()=>
    {
        console.log("task2");
        setTimeout(()=>{
            console.log("task3")
        },2000);
    },5000);
}, 1000);

//synchronos calll back
function greet(name, callback) {
    console.log("Hello " + name);
    callback(); // calling the passed function
}

function afterGreet() {
    console.log("This runs after greet()");
}

greet("Pratik", afterGreet);


//Asynchronos code 

function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "Pratik" };
        callback(data);  // ✔ pass data
    }, 2000);
}

fetchData((result) => {
    console.log("Got data:", result); // ✔ result is defined
});

