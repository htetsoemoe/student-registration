import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { signOutStart, signOutSuccess, signOutFailure } from '../redux/teacher/teacherSlice'
import { useDispatch } from 'react-redux'

const Navbar = ({ teachername }) => {
    console.log(teachername)
    const dispatch = useDispatch()

    // SignOut Handler
    const signOutHandler = async () => {
        try {
            dispatch(signOutStart())

            const res = await fetch('/api/v1/signout')
            const data = await res.json()

            if (data.success === false) {
                dispatch(signOutFailure(data.message))
                return
            }

            dispatch(signOutSuccess())
        } catch (error) {
            dispatch(signOutFailure(error.message))
        }
    }

    return (
        <div className="flex justify-between bg-slate-500 p-5 pl-16 pr-16">
            <p className="text-xl text-white font-semibold">Student Portal</p>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <FaUserCircle className='text-white' />
                    <p className="text-yellow-300 font-semibold hover:underline hover:cursor-pointer">{teachername}</p>
                </div>
                <p onClick={signOutHandler} className='bg-blue-500 px-2 py-1 border rounded-sm font-semibold hover:bg-blue-300 hover:cursor-pointer'>Logout</p>
            </div>
        </div>
    )
}

export default Navbar
