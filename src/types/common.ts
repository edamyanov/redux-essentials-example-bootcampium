export interface Post {
  id: string,
  title: string,
  content: string,
  comments: Array<string>,
  date: string,
  reactions: Reaction,
  user: string
}

export interface Reaction {
  thumbsUp: number
  hooray: number
  heart: number
  rocket: number
  eyes: number
}

export interface User {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  name: string
}

export interface Notification {
  id: string,
  date: string,
  message: string,
  user: string,
  read: boolean,
  isNew: boolean
}
