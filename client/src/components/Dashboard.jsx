import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import { addStudentsToStore } from '../redux/student/studentSlice'
import { useDispatch } from 'react-redux'
import { Table } from '@mantine/core'
import Swal from 'sweetalert2'

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

  const deleteStudent = async (studentId) => {
    try {
      const res = await fetch(`/api/v1/student/delete/${studentId}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (data.success === false) {
        console.log(data.message)
        return
      }

      dispatch(addStudentsToStore(currentStudents.filter((student) => student._id !== studentId)))
    } catch (error) {

    }
  }

  // delete contact handler
  const deleteStudentHandler = (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
        )
        await deleteStudent(studentId)
      }
    })
  }

  // create rows for students
  const rows = currentStudents?.map((student, index) => {
    return (
      <tr key={index}>
        <td className='text-center py-5 px-3 text-slate-900'>{index + 1}</td>
        <td className='text-center text-slate-900'>{student?.name}</td>
        <td className='text-center text-slate-900'>{student?.subject}</td>
        <td className='text-center text-slate-900'>{student?.email}</td>
        <td className='text-center text-slate-900'>{student?.address}</td>
        <td className="">
          <p
            onClick={() => deleteStudentHandler(student._id)}
            className='px-3 py-2 bg-red-500 text-center text-white hover:bg-red-400 rounded-md cursor-pointer'>
            Delete
          </p>
        </td>
      </tr>
    )
  })

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

        <div className="m-8 p-3 bg-slate-200">
          <table className='w-[1240px]'>
            <thead className=''>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
