import { useState } from 'react'
import './App.css'
import AllRoutes from './All_Routes'
import main_background from  "./assets/Images/main_background.jpg"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{background:`url(${main_background})`}}>
          <AllRoutes/>
    </div>
  )
}

export default App
