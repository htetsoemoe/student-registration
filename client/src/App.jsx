import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import PrivateRoutes from './components/PrivateRoutes'
import UpdateStudent from './components/UpdateStudent'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/student/:id' element={<UpdateStudent />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
