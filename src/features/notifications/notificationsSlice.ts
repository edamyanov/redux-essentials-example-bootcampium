import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice, EntityState,
  PayloadAction
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { Notification } from '../../app/types'
import { RootState } from '../../app/store'

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

// Thunk (Async Dispatch)
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications((getState() as RootState))
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.notifications
  }
)


const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead (state) {
      Object.values(state.entities).forEach(notification => {
        notification && (notification.read = true)
      })
    }
  },
  extraReducers: {
    "notifications/fetchNotifications/fulfilled": (
      state, action: PayloadAction<Notification[]>) => {
      console.log(fetchNotifications.fulfilled.toString())
      Object.values(state.entities).forEach(notification => {
        // Any notifications we've read are no longer new
        notification && (notification.isNew = !notification.read)
      })
      notificationsAdapter.upsertMany(state, action.payload)
    }
  }
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice

// Selectors
export const {
  selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors<RootState>(state => state.notifications)
