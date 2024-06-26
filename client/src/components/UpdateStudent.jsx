import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'

const UpdateStudent = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    console.log(id)

    const { currentUser } = useSelector((state) => state.teacher)
    console.log(currentUser._id)
    const { teachername, _id: teacherId } = currentUser
    console.log(teacherId)

    const [formData, setFormData] = useState({})

    useEffect(() => {
        const fetchStudent = async () => {
            const res = await fetch(`/api/v1/student/`) // Fetch all students
            const data = await res.json()
            console.log(data)

            const updatedStudent = data.find((student) => student._id === id)
            console.log(updatedStudent)

            if (!res.ok) {
                console.log(data.message)
                return
            }

            if (res.ok) {
                setFormData(updatedStudent)
            }
        }

        try {
            fetchStudent()
        } catch (error) {
            console.log(error.message)
        }
    }, [id])

    console.log(formData)

    const onChangeHandler = (event) => setFormData({ ...formData, [event.target.id]: event.target.value })

    const updateStudentFormSubmitHandler = async (event) => {
        event.preventDefault()
        // console.log(`/api/v1/student/update/${teacherId}/${id}`)
        console.log(formData)

        const res = await fetch(`/api/v1/student/update/${teacherId}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        // console.log(data)
        
        if (!res.ok) {
            return
        }
        if (res.ok) {
            navigate(`/`)
        }
    }

    return (
        <div>
            <Navbar teachername={teachername} />

            <div className="m-8 p-3 bg-slate-200">
                <h1 className="mb-5 font-semibold">Update Student Information</h1>
                <form
                    onSubmit={updateStudentFormSubmitHandler}
                    className='flex flex-wrap gap-5'
                >
                    <input
                        type="text"
                        className='border p-3 rounded-md focus:outline-none'
                        id='name' name='name'
                        value={formData.name}
                        onChange={onChangeHandler}
                        placeholder='Enter Student Name'
                        required
                    />
                    <input
                        type="email"
                        className='border p-3 rounded-md focus:outline-none'
                        id='email' name='Email'
                        value={formData.email}
                        onChange={onChangeHandler}
                        placeholder='Enter Student Email'
                        required
                    />
                    <input
                        type="text"
                        className='border p-3 rounded-md focus:outline-none'
                        id='subject' name='subject'
                        value={formData.subject}
                        onChange={onChangeHandler}
                        placeholder='Enter Subject'
                        required
                    />
                    <textarea
                        type='text'
                        className='border p-3 rounded-lg focus:outline-none'
                        placeholder='Enter Address'
                        value={formData.address}
                        onChange={onChangeHandler}
                        name="address" id="address"
                        cols="30" rows=""
                        required
                    />
                    <button
                        className='px-5 py-1 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent
