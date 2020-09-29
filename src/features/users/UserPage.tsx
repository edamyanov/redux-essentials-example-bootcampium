import React from 'react'
import { selectUserById } from './usersSlice'
import { selectPostsByUser } from '../posts/postSlice'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'

type TParams = { userId: string }
const UserPage = ({ match }: RouteComponentProps<TParams>) => {
  const { userId } = match.params
  const user = useTypedSelector(state => selectUserById(state, userId))!

  const postsForUser = useTypedSelector(state => selectPostsByUser(state, userId))

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage
