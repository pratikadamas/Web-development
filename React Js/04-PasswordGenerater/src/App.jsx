import { useState, useCallback,useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numallowed, setNum] = useState(false);
  const [charallowed, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    if (numallowed) {
      str += "0123456789";
    }
    if (charallowed) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numallowed, charallowed, setPassword]);

 


  // useRef 
  const passref = useRef(null);

  const handleCopyPasswordToClipboard=()=>{
    navigator.clipboard.writeText(password);
    passref.current?.select();
    passref.current.focus()
  }


  useEffect(() => {
    generatePassword();
  }, [generatePassword, length, numallowed, charallowed]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Generate Password</h2>

      {/* Password Display */}
      <input
        type="text"
        value={password}
        readOnly
        ref={passref}
        placeholder="password"
        className="w-full text-center border rounded-md p-2 mb-4"
      />

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleCopyPasswordToClipboard}
        >
          Copy
        </button>
        {/* <button
          className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          onClick={generatePassword}
        >
          Generate
        </button> */}
      </div>

      {/* Length Slider */}
      <div className="my-6">
        <input
          type="range"
          min="6"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
        <label htmlFor="length" className="block text-center mt-2">
          Length: {length}
        </label>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="numbers"
            checked={numallowed}
            onChange={() => setNum((prev) => !prev)}
            className="h-4 w-4"
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="characters"
            checked={charallowed}
            onChange={() => setChar((prev) => !prev)}
            className="h-4 w-4"
          />
          <label htmlFor="characters">Include Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
