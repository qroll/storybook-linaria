import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Dog } from "@lifesg/react-design-system/dog";
import { Cat } from "@lifesg/react-design-system/cat";
import { Navbar } from "@lifesg/react-design-system/navbar";
import { Alert } from "@lifesg/react-design-system/alert";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Alert type="error">Hello</Alert>
        <Navbar items={{desktop: []}} />
        <Cat type="tabby" />
        <Cat type="siamese" size="small" />
        <Dog type="husky" />
        <Dog type="poodle" style={{height: 100, width: 180}} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
