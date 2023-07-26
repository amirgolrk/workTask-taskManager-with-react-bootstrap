import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Features/loginSlice'


export default configureStore({
    reducer : {
        login : loginSlice,
    }
})