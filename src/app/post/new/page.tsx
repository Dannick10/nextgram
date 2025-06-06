import CreatePostForm from '@/app/components/CreatePostForm'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const session = await auth()

  if(!session) return redirect("/")

  return (
    <div className='w-[35rem] mx-auto p-4 my-10'>
      <h1 className='text-[2rem] leanding-10 font-semibold text-center'>Criar novo post</h1>
      <div className='border border-zinc-300 p-4 rounded mt-8'>
        <CreatePostForm />
      </div>
    </div>
  )
}

export default page