import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'

type TimeAgoProps = { timestamp: string }
const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
