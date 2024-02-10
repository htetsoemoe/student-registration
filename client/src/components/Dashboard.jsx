import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import { addStudentsToStore } from '../redux/student/studentSlice'
import { useDispatch } from 'react-redux'

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.teacher)
  console.log(currentUser._id)
  const { teachername, _id: teacherId } = currentUser
  console.log(teacherId)
  const { currentStudents } = useSelector((state) => state.student)
  console.log(currentStudents)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    address: ''
  })

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch('/api/v1/student/')
      const data = await res.json()
      return data
    }

    fetchStudents().then(data => dispatch(addStudentsToStore(data)))
  }, [])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    // console.log({...formData, teacherRef: teacherId})
    try {
      setLoading(true)
      setError(false)

      const res = await fetch('/api/v1/student/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          teacherRef: teacherId
        })
      })

      const data = await res.json()
      dispatch(addStudentsToStore([...currentStudents, data]))

    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="">
        <Navbar teachername={teachername} />

        <div className="m-8 p-3 bg-slate-200">
          <h1 className="mb-5 font-semibold">Registration Form</h1>
          <form
            onSubmit={handleFormSubmit}
            className='flex flex-wrap gap-5'
          >
            <input
              onChange={handleChange}
              type="text"
              className='border p-3 rounded-md focus:outline-none'
              id='name' name='name'
              placeholder='Enter Student Name'
              required
            />
            <input
              type="email"
              onChange={handleChange}
              className='border p-3 rounded-md focus:outline-none'
              id='email' name='Email'
              placeholder='Enter Student Email'
              required
            />
            <input
              type="text"
              onChange={handleChange}
              className='border p-3 rounded-md focus:outline-none'
              id='subject' name='subject'
              placeholder='Enter Subject'
              required
            />
            <textarea
              type='text'
              onChange={handleChange}
              className='border p-3 rounded-lg focus:outline-none'
              placeholder='Enter Address'
              name="address" id="address"
              cols="30" rows=""
              required
            />
            <button
              className='px-5 py-1 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Register
            </button>
          </form>
        </div>

        <div className="">
          {currentStudents.map((student, index) => (
            <p className="" key={index}>{student.name}{" "}{student.subject}{" "}{student.email}{" "}{student.address}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
