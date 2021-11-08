import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { Navbar } from './app/components/Navbar'
import { PostsList } from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import UserPage from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationList'
import UsersList from './features/users/UsersList'
import { AddNewPostPage } from './features/posts/AddNewPostPage'

function App () {
  return (
    <Router>
      <Navbar />
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => <PostsList />}
          />
          <Route exact path='/posts/new' component={AddNewPostPage} />
          <Route exact path='/posts/:postId' component={SinglePostPage} />
          <Route exact path='/editPost/:postId' component={EditPostForm} />
          <Route exact path='/users' component={UsersList} />
          <Route exact path='/users/:userId' component={UserPage} />
          <Route exact path='/notifications' component={NotificationsList} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}

export default App
