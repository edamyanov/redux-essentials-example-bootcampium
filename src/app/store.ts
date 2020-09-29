import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postSlice'
import usersReducer from '../features/users/usersSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import notificationsSlice from '../features/notifications/notificationsSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
