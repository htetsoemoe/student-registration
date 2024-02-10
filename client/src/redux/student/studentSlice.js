import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentStudents: []
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        addStudentsToStore: (state, action) => {
            state.currentStudents = action.payload
        }
    }
})

export const { addStudentsToStore } = studentSlice.actions
export default studentSlice.reducer