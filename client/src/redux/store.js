import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import teacherReducer from './teacher/teacherSlice'
import studentReducer from './student/studentSlice'

// combineReducer
const rootReducer = combineReducers({ teacher: teacherReducer, student: studentReducer })

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // persistence configuration and reducer used to persist the state

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store) // Creates a persistor for a given store.