import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { deletePost, getUserPost } from '../actions'
import Link from 'next/link'
import Image from 'next/image'

const page = async () => {

  const session = await auth()

  let userId = null 

  if(session) {
    userId = session.user.userId 
  } else {
    redirect("/")
  }

  const posts = await getUserPost(userId)

  return (
    <div className='mx-auto my-10 p-4'>

      <h1 className='text-[2rem] leading-10 font-semibold text-center'>
        Minhas Postagens </h1>

      {posts.length === 0 ? (
        <div className='text-center'>
          <Link href={"/post/new"}>
          <button> Criar nova Postagem</button>
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 '>
        {posts.map((post,index) => (
          <div className='border rounded p-4 shadow-sm' key={index}>
            <Image 
            src={post.imageUrl}
            alt={post.caption ?? "imagem do post"}
            className='w-[365px] h-[218px] object-cover mb-4 rounded'
            width={366}
            height={218}
            />

            {post.caption && <p className='mb-2 text-sm font-medium'>{post.caption}</p>}

              <form action={deletePost}>
                <input type="hidden" name='userId' value={userId} />
                <input type="hidden" name='postId' value={post.id} />
                <div className='flex justify-end'>
                <button
              type="submit"
              className="px-4 py-2 bg-red-400 rounded cursor-pointer"
            >
              Excluir
            </button>
                </div>
              </form>

          </div>
        ))}
      
        </div>
      )}

    </div>
  )
}

export default page