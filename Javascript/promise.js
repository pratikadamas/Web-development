let mypromise = new Promise((resolve, reject) => {
    if (false) {
        resolve({ status: 200, msg: "ok" })
    } else {
        reject({ status: 400, msg: "not solve" })
    }
})

mypromise
  .then((data) => {
      console.log(data)
  })
  .catch((err) => {
      console.log(err)
  })
  .finally(() => {
      console.log("end")
  })
