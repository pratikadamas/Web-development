function getUser() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: 1, name: "Pratik" }), 1000);
  });
}

function getOrders(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(["phone","car","cooler","jama"]), 1000);
  });
}

async function show() {
  try {
    const user = await getUser();
    console.log(user)
    const orders = await getOrders(user.id);
    console.log(orders)
    

   
  } catch (err) {
    console.error("Error:", err);
  }
  finally{
    console.log("code execution stop")
  }
}

// Invoke the async function so the code actually runs
show();