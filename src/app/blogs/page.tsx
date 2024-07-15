'use client'
import Background from '@/components/Background'
import Loading from '@/components/Loading'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { useBlog } from '@/context/Blog'
import { Press_Start_2P, Quantico } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import rehypeRaw from 'rehype-raw'

const truncateText = (input: string, length: number) => {
    if (input?.length <= length) {
        return input;
    }
    return input?.substring(0, length) + '...';
};
interface Posts {
    account: {
        title: string;
        content: string;
        image: string;
        date: string
    },
    publicKey: any
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
    const { initialized, posts } = useBlog()

    if (!initialized) return <Loading />

    if (!posts.length && initialized) return <TracingBeam
        className="h-[90vh] px-5 flex flex-col justify-center items-center"
    >
        <div
            className={`${pressfont.className} flex items-center justify-center w-[100%] text-center text-4xl my-[auto]`}
        >There is no Posts</div>
        <div
            onClick={() => {
                router.push('/create')
            }}
            className={`${quanticoHeading.className} mt-5 h-[100px] max-w-4xl mx-[auto] capitalize glassmorphism cursor-pointer text-[#ffffff6d] hover:text-white border-[#ffffff6d] hover:border-white transition-all duration-1000 ease-in-out p-4  justify-center items-center flex border-2 border-dotted rounded-lg text-[2rem]`}
        >
            create post
        </div>
    </TracingBeam>
    return (
        <Background>
            <Main />
            <button
                onClick={() => router.push('/create')}
                className='fixed lg:right-20 md:right-20 right-10 rounded-full p-4 box w-[50px] h-[50px] z-10 text-3xl md:bottom-20 lg:bottom-20 bottom-10'
            >+</button>
        </Background>
    )
}
const Main = () => {
    const { posts, } = useBlog()
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
                src={posts[0]?.account.image || '/solana.jpg'}
                alt=''
            />
            <div
                className='flex-[2] my-3 basis-[300px] flex flex-col'
            >
                <h2
                    className={`lg:text-[37px] md:text-[30px] text-[25px]  ${pressfont.className} font-bold`}
                >
                    {posts[0]?.account.title}
                </h2>
                <span
                    className='ml-2 opacity-70 text-sm'
                >
                    {posts[0]?.account.date}
                </span>
                <p
                    className={`${quantico.className} leading-6 font-thin mt-5 text-justify`}
                >
                    {truncateText((posts[0]?.account.content).replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/(https?)([a-z])/g, '$1 $2').replace(/(com)([A-Z])/g, '$1 $2'), 100)}
                </p>
                <Link
                    href={`/blogs/${posts[0]?.publicKey.toString()}`}
                    className={`leading-5 text-end self-end font-extralight text-[12px]`}
                >Read more</Link>
            </div>
        </div>


        {/* all blogs */}
        <>
            <BlogsContainer />
        </>
    </main>
}



const BlogsContainer = () => {
    const { posts, } = useBlog()
    // console.log(posts)

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
                                className='max-h-[400px] h-[400px] transition-all text-wrap max-w-[300px] overflow-hidden p-2 duration-1000 ease-in-out hover:scale-105 flex-1 relative z-[2] glassmorphism rounded-lg border-[1px] border-[#ffffff30] hover:border-[#8000805d] gap-3 flex flex-col'
                            >
                                <Image
                                    width={200}
                                    height={200}
                                    style={{
                                        border: '1px solid white',
                                        padding: 2,
                                        borderRadius: 4,
                                        width: '100%',
                                        minHeight: '190px',
                                        maxHeight: '190px',
                                        objectFit: 'cover'
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
                                        >
                                            {item.account.date}
                                        </span>
                                        <h2
                                            className={`text-[12px] mt-2 ${pressfont.className} font-bold`}
                                        >
                                            {item.account.title}
                                        </h2>
                                        <p
                                            className={`leading-5 text-justify font-extralight mt-1 text-[12px]`}
                                        >

                                            {truncateText((item.account.content).replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/(https?)([a-z])/g, '$1 $2').replace(/(com)([A-Z])/g, '$1 $2'), 100)}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/blogs/${item.publicKey.toString()}`}
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