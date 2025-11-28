function makeCounter() {
    let value = 0;

    return {
        inc() { value++; },
        get() { return value; }
    };
}

const c = makeCounter();
c.inc();
c.inc();
c.inc();
console.log(c.get()); 

function greet(prefix) {
    return function(name) {
        console.log(prefix + " " + name);
    };
}

const hello = greet("Hello");
hello("Pratik");

