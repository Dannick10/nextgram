import { User } from 'next-auth'
import React from 'react'

type profileForm = {
    user: User
}

const Profileform = ({user}: profileForm) => {
  return (
    <div>Profileform</div>
  )
}

export default Profileform