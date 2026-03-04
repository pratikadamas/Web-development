// write functional component in react
import Chai from "./Chai"
import { useState } from "react"

// hooks are used in functional component to manage state and side effects


function App() {

  const [user, setUser] = useState("John Doe")// useState is a hook that returns an array with two elements: the current state value and a function to update it. We can use array destructuring to assign these values to variables. In this case, we are initializing the user state with the value "John Doe" and providing a function setUser to update it.
  const age=25
  console.log(user)

  function handleClick(){
    // alert("button is clicked")
    setUser("pratik giri")
  }

  return (
    <div>
      <h1>user name is {user} and value of age is {age}
      </h1>
      <Chai />
      <button onClick={handleClick}>click</button>
    </div>
  )
}

export default App