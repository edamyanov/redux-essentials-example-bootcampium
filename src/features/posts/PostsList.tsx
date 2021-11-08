import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchPosts, selectPostIds } from './postSlice'
import PostExcerpt from './PostExcerpt'
import { RootState, useAppDispatch } from '../../app/store'
import { Link } from 'react-router-dom'

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const orderedPostIds = useSelector(selectPostIds)

  const postStatus = useSelector<RootState>(state => state.posts.status)
  const error = useSelector<RootState>(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  }

  return (
    <section className="posts-list">
      <div style={ { display: 'flex', justifyContent: 'space-between' } }>
        <h2>Posts</h2>
        <Link to={'/posts/new'} className="button" style={ { alignSelf: 'center' } } >
          Add New Post
        </Link>
      </div>
      {error}
      {content}
    </section>
  )
}
