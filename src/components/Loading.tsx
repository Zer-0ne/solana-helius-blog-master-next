import { Press_Start_2P } from 'next/font/google'
import React from 'react'
const pressfont = Press_Start_2P({
    subsets: ['latin'],
    weight: '400'
})
const Loading = () => {
    return (
        <div className={`${pressfont.className} flex h-[90vh] items-center justify-center w-[100%] text-center lg:text-4xl md:text-4xl text-2xl my-[auto]`}>
            <span className="dots"></span>
        </div>
    )
}

export default Loading