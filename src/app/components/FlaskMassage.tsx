"use client"

import React, { useEffect, useState } from 'react'

type flashMessageProps = {
    message: string
    type: string
}

const FlaskMassage = ({message, type}: flashMessageProps) => {
    const [visible, SetVisible] = useState(true)

    useEffect(() => {
        
        const timer = setTimeout(() => {
                SetVisible(false)
        }, 3000);

        return () => clearTimeout(timer)
    })

    if(!visible) return null
  return (
    <div className={`fixed top-6 right-6 p-4 shado-md text-white ${type === "sucess" ? "bg-emerald-600" : "bg-red-600"}`}>{message}</div>
  )
}

export default FlaskMassage