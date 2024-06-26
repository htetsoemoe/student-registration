import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    // @returns — The selected part of the state or derived data.
    // useSelector((state) => console.log(state.teacher)) 
    // state.teacher is 'teacherSlice name' = returns {currentUser: {…}, error: null, loading: false}

    const { currentUser } = useSelector((state) => state.teacher)
    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoutes
