import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/login/Login.jsx'
import Register from './components/register/Register.jsx'
import HomePage from './components/home_page/HomePage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' exact Component={Login}/>
        <Route path='/register' exact Component={Register}/>
        <Route path='/homePage' exact Component={HomePage}/>
      </Routes>
    </Router>


   </div>
  )
}

export default App
