'use client'
import { useBlog } from '@/context/Blog'
import { Plaster } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const plaster = Plaster({
    subsets: ['latin'],
    weight: '400'
})

const Navbar = () => {
    const { user } = useBlog()

    return (
        <header
            className='glassmorphism border-b-[#ffffff30] border-b-[1px] z-10 sticky top-0 py-[.8rem] left-2 right-2 mb-5 flex flex-1 gap-3 justify-between items-center px-5 bg-[purple]'
        >
            <div
                className={`text-[25px] ${plaster.className}`}
            >AB</div>
            <div
                className='capitalize flex gap-6 justify-center items-center'
            >
                <Link
                    className='hover-underline'
                    href='/'
                >home</Link>
                <Link
                    className='hover-underline'
                    href='/blogs'
                >blogs</Link>
                <div
                >
                    <Image
                        width={30}
                        height={30}
                        src={user?.avatar}
                        alt=''
                        style={{
                            border: '2px solid #ffffff82',
                            padding: 2,
                        }}
                        className='rounded-full'
                    />
                </div>
            </div>
        </header>
    )
}

export default Navbar