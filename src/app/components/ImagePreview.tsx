"use client"
import Image from 'next/image'
import { stringify } from 'querystring'
import React, { ChangeEvent, useState } from 'react'

type Props = {}

const ImagePreview = (props: Props) => {
  const [imagePrev,SetImagePrev] = useState<string | null>(null)
    const [selectedImage,SetSelectedImage] = useState<File | null>(null)

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if(file) {
            const render = new FileReader()

            render.onloadend = () => {
                SetImagePrev(render.result as string)
                SetSelectedImage(file)
            }

            render.readAsDataURL(file)

        }
    }

    return (
    <div>
        {imagePrev && (
            <div className='flex justify-center mb-4'>
                    <Image 
                    src={imagePrev}
                    alt='pre visualização'
                    className='w-[434px] h-[434px] object-cover'
                    width={494}
                    height={494}
                    />
            </div>
        )}
        <label>Selecionar imagem</label>
        <input type="file" id='image' name='image' accept='image/' onChange={handleChangeImage}  className="p-2 border border-zinc-300 rounded w-full text-sm placeholder: text-zinc-400" />

        {selectedImage && (
            <input type="hidden" name='imageFile' value={selectedImage.name} />
        )}
    </div>
  )
}

export default ImagePreview