import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.teacher)
  const { teachername } = currentUser

  return (
    <div>
      <div className="">
        <Navbar teachername={teachername} />
      </div>
    </div>
  )
}

export default Dashboard
