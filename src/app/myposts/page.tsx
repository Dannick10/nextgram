import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { getUserPost } from '../actions'

const page = async () => {

  const session = await auth()

  let userId = null 

  if(session) {
    userId = session.user.userId 
  } else {
    redirect("/")
  }

  const post = await getUserPost(userId)

  return (
    <div>
      {post.map((items,index) => (
        <p key={index}>{items.caption}</p>
      ))}
    </div>
  )
}

export default page