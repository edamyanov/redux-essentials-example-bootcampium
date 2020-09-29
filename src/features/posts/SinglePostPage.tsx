import React from 'react'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import { selectPostById } from './postSlice'
import { RouteComponentProps } from 'react-router-dom'

type TParams = { postId: string }
export const SinglePostPage = ({ match }: RouteComponentProps<TParams>) => {
  const { postId } = match.params
  const post = useSelector(state => selectPostById(state, postId))

  return post
    ? (
      <section>
        <article className='post'>
          <h2>{post.title}</h2>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
          <p className='post-content'>{post.content}</p>
        </article>
      </section>
    )
    : (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
}
