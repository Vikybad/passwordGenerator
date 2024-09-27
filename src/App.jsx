import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"


function App() {
  const [copyButtonText, setCopyButtonText] = useState("Copy")
  const [length, setLength] = useState(8);
  const [allowNum, setAllowNum] = useState(false);
  const [allowSpecialChar, setAllowChar] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (allowSpecialChar) str += "!@#$%^&*"
    if (allowNum) str += "0123456789"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)

  }, [setpassword, length, allowNum, allowSpecialChar])

  useEffect(()=> {
    generatePassword();
  }, [generatePassword, allowNum, allowSpecialChar, length])

  const copyText = useCallback(()=> {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);

    setCopyButtonText("Copied");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 1000);

  }, [password, setCopyButtonText])

  return (
    <>
      <div className="w-full max-w-max mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 text-center">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-3">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder='password'
            readOnly
            ref={passwordRef}

          />

          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyText}
          >
            {copyButtonText}
          </button>

        </div>
        <div
          className="flex text-sm gap-x-2"
        >
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowNum}
              id="numberInput"
              onChange={() => {
                setAllowNum((prevVal) => !prevVal)
              }}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowSpecialChar}
              id="numberSpecialCharacters"
              onChange={() => {
                setAllowChar((prevVal) => !prevVal)
              }}
            />
            <label>Special Characters </label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
