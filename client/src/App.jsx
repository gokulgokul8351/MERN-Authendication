import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'

function App () {

  const user = localStorage.getItem('token')

  return (
    <Routes>
      {user && <Route path='/' exact element={<Home/>} />}
      <Route path='/signup' exact element={<Signup/>} />
      <Route path='/login' exact element={<Login/>} />
      <Route path='/*' exact element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;