'use client'
import Background from '@/components/Background'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { useBlog } from '@/context/Blog'
import { Press_Start_2P } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const pressfont = Press_Start_2P({
    subsets: ['latin'],
    weight: '400'
})

const Page = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const { user, posts, initialized, transactionPending, createPost, } = useBlog()
    const [data, setData] = useState<{
        title: string;
        description: string;
        image: string | null;
    }>({
        title: '',
        description: '',
        image: null
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        const { name, value } = target;

        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });
    };


    const handleSubmit = async () => {
        try {
            const { title, description, image } = data;


            if (image) {
                // if (!image.includes('unsplash')) {
                //     alert('Only Image URL from Unsplash is allowed');
                //     return
                // }
                await createPost(title, description, image as string)
            } else {
                alert('image is not provided');
            }
        } catch (error) {
            console.error(error);
        } finally {
            router.push('/blogs');
        }
    };

    return (
        <TracingBeam className='max-w-4xl'>
            <div className='mt-12 mx-10'>
                <h2 className={`text-3xl font-medium ${pressfont.className}`}>Create Post</h2>
                <div className='flex flex-col flex-1 gap-3 flex-wrap justify-center mx-[auto]'>
                    <div className='flex flex-1 flex-col gap-1 mt-3'>
                        <label htmlFor="image" className='ml-1  mb-1 capitalize'>Image Link</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            className='p-2 rounded-lg mb-3 border-2 border-[#ffffff6d] bg-black'
                            name='image'
                        />
                        <label htmlFor="title" className='ml-1 mb-1 capitalize'>Title</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            className='p-2 rounded-lg mb-3 border-2 border-[#ffffff6d] bg-black'
                            name='title'
                        />
                        <label htmlFor="description" className='ml-1 mb-1 capitalize'>Description</label>
                        <textarea
                            onChange={handleChange}
                            rows={15}
                            className='p-2 rounded-lg border-2 border-[#ffffff6d] bg-black'
                            name='description'
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={transactionPending}
                            className='mt-2 bg-[green] p-3 rounded-lg'
                        >
                            {transactionPending
                                ? 'Please wait...' : 'Submit'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </TracingBeam>
    );
};

export default Page;
