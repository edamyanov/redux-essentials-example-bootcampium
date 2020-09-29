import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'
import { selectPostById } from './postSlice'
import { useTypedSelector } from '../../app/store'
import { EntityId } from '@reduxjs/toolkit'

type PostExcerptProps = { postId: EntityId }
const PostExcerpt = ({ postId }: PostExcerptProps) => {
  const post = useTypedSelector(state => selectPostById(state, postId))
  return post
    ? (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p>{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
    : (<></>)
}

export default PostExcerpt
