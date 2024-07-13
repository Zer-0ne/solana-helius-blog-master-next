'use client'
import Background from '@/components/Background'
import { useBlog } from '@/context/Blog'
import { Press_Start_2P, Quantico } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Posts {
    account: {
        title: string;
        content: string;
        image: string
    }
}

const quantico = Quantico({
    subsets: ['latin'],
    weight: '400'
})

const quanticoHeading = Quantico({
    subsets: ['latin'],
    weight: '700'
})


const pressfont = Press_Start_2P({
    subsets: ['latin'],
    weight: '400'
})

const page = () => {
    const router = useRouter()

    return (
        <Background>
            <Main />
            <button
                onClick={() => router.push('/create')}
                className='fixed right-20 rounded-full p-4 box w-[50px] h-[50px] z-10 text-3xl bottom-20'
            >+</button>
        </Background>
    )
}
const Main = () => {
    return <main
        className="flex relative mx-5 mt-10 flex-1 flex-col justify-center items-center my-auto min-h-[80vh]"
    >

        {/* here the first blogs */}
        <div
            className='flex flex-1 flex-wrap max-w-[90%] z-[2px] gap-6 justify-evenly '
        >
            <Image
                width={600}
                height={600}
                style={{
                    border: '1px solid white',
                    padding: 2,
                    borderRadius: 2,
                    flex: 1
                }}
                src="https://cdn.dribbble.com/users/5729314/screenshots/15231155/media/04172c4f33614bab3c4a547edb8a63a2.jpg?compress=1&resize=1600x1200&vertical=top"
                alt=''
            />
            <div
                className='flex-[2] my-3 basis-[300px] flex flex-col'
            >
                <h2
                    className={`text-[37px] ${pressfont.className} font-bold`}
                >What is helius</h2>
                <span
                    className='ml-2 opacity-70 text-sm'
                >2024-07-11</span>
                <p
                    className={`${quantico.className} leading-6 font-thin mt-5 text-justify`}
                >Helius is a Solana infrastructure startup that provides developers with APIs, webhooks, and RPCs to make it easier to build applications on Solana. It was founded in 2022 by Mert Mumtaz, Vishant Agarwal, and Nikhil Acharya Prakash</p>
            </div>
        </div>


        {/* all blogs */}
        <>
            <BlogsContainer />
        </>
    </main>
}
const BlogsContainer = () => {
    const { user, posts, } = useBlog()
    console.log(posts)
    return <>
        <div
            className='mt-16 flex flex-col w-[95%]'
        >
            <h2
                className={`${quanticoHeading.className} text-[30px] font-bold`}
            >All Blogs</h2>


            <div
                className='flex flex-wrap my-10 justify-center mt-7 items-center  gap-7'
            >
                {
                    (posts as Posts[])?.map((item, index) => (
                        <div
                            className='card grow-0 basis-[300px]'
                            key={index}
                        >
                            <div
                                className='max-h-[400px] h-[400px] transition-all text-wrap max-w-[300px] overflow-hidden p-2 duration-1000 ease-in-out hover:scale-105 flex-1 relative z-[2] glassmorphism rounded-lg border-[1px] border-[#ffffff44] gap-3 flex flex-col'
                            >
                                <Image
                                    width={200}
                                    height={200}
                                    style={{
                                        border: '1px solid white',
                                        padding: 2,
                                        borderRadius: 4,
                                        width: '100%',
                                        // flex: 1
                                    }}
                                    src={item.account.image || "https://cdn.dribbble.com/users/5729314/screenshots/15231155/media/04172c4f33614bab3c4a547edb8a63a2.jpg?compress=1&resize=1600x1200&vertical=top"}
                                    alt=''
                                    className=''
                                />
                                <div
                                    className='p-3 justify-between flex flex-col flex-1'
                                >
                                    <div>

                                        <span
                                            className='ml-2 text-[10px] opacity-70 text-sm'
                                        >2024-07-11</span>
                                        <h2
                                            className={`text-[12px] mt-2 ${pressfont.className} font-bold`}
                                        >
                                            {item.account.title}
                                        </h2>
                                        <p
                                            className={`leading-5 font-extralight mt-1 text-[12px]`}
                                        >{item.account.content}</p>
                                    </div>

                                    <Link
                                        href='/'
                                        className={`leading-5 text-end self-end font-extralight text-[12px]`}
                                    >Read more</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}

export default page