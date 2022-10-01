// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../../app/store'
import { RootState } from '../../app/rootReducer'

export interface AuthError {
    message: string
}

export interface AuthState {
    isAuth: boolean
    currentUser?: CurrentUser
    isLoading: boolean
    error: AuthError
}

export interface CurrentUser {
    id: string
    display_name: string
    email: string
    photo_url: string
}
export const initialState: AuthState = {
    isAuth: false,
    isLoading: false,
    error: {message: 'An Error occurred'},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, {payload}: PayloadAction&lt) => {
            state.isLoading = payload
        },
        setAuthSuccess: (state, { payload }: PayloadAction) => {
            state.currentUser = payload
            state.isAuth = true
        },
        setLogOut: (state) => {
            state.isAuth = false
            state.currentUser = undefined
        },
        setAuthFailed: (state, { payload }: PayloadAction) => {
            state.error = payload
            state.isAuth = false
        },
    },
})

export const { setAuthSuccess, setLogOut, setLoading, setAuthFailed} = authSlice.actions

export const authSelector = (state: RootState) => state.auth