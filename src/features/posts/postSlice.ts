import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { Post, Reaction } from '../../app/types'
import { RootState } from '../../app/store'

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})

// Thunk (Async Dispatch)
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost: Partial<Post>) => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    // The response includes the complete post object, including unique ID
    return response.post
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Actions (Don't try to mutate any data outside of createSlice)
    reactionAdded (
      state,
      action: PayloadAction<{ postId: string, reaction: keyof Reaction }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated (state, action: PayloadAction<Pick<Post, 'id' | 'title' | 'content'>>) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending.type]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      // Use the `upsertMany` reducer as a mutating update utility
      postsAdapter.upsertMany(state, action.payload)
    },
    [fetchPosts.rejected.type]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    // Use the `addOne` reducer for the fulfilled case
    [addNewPost.fulfilled.type]: postsAdapter.addOne
  }
})

export const { postUpdated, reactionAdded } = postSlice.actions

// Selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors<any>(state => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)

export default postSlice.reducer
