function boilWater() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Water boiled!");
    }, 2000);
  });
}

async function makeMaggi() {
  console.log("Start cooking...");
  
  const boiled = await boilWater(); // wait here 
  console.log(boiled);              // now continue
  
  console.log("Add masala");
  console.log("Maggi ready!");
}

makeMaggi();
