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
    const { user, posts, initialized, initUser, createPost, } = useBlog()
    const [data, setData] = useState<{
        title: string;
        description: string;
        image: File | null;
    }>({
        title: '',
        description: '',
        image: null
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;

        if (target.type === 'file') {
            const file = (target as HTMLInputElement).files?.[0];
            if (file) {
                console.log('Selected file:', file);
                setData((prevData) => ({
                    ...prevData,
                    image: file
                }));
            }
        } else {
            const { name, value } = target;
            setData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            const { title, description, image } = data;

            if (image) {
                const reader = new FileReader();

                reader.onload = async () => {
                    const base64Image = (reader.result as string)?.split(',')[1] as string;
                    // console.log(typeof base64Image === 'string')
                    await createPost(title, description, URL.createObjectURL(image) as string)

                    // Reset the form data after processing
                    setData({
                        title: '',
                        description: '',
                        image: null
                    });

                };

                reader.readAsDataURL(image);
            } else {
                // Handle case where no image is selected
                console.log('No image selected');
            }
        } catch (error) {
            console.error(error);
        } finally {
            // router.push('/blogs');
        }
    };

    return (
        <TracingBeam className='max-w-4xl'>
            <div className='mt-12 mx-10'>
                <h2 className={`text-3xl font-medium ${pressfont.className}`}>Create Post</h2>
                <div className='flex flex-col flex-1 gap-3 flex-wrap justify-center mx-[auto]'>
                    {
                        data?.image ? <>
                            <div
                                className='flex flex-1 justify-between  mt-5 gap-2'
                            >
                                <div
                                    className='flex-1 flex gap-2'
                                >

                                    <Image
                                        width={100}
                                        height={100}
                                        src={URL.createObjectURL(data.image)}
                                        className='rounded-lg'
                                        alt={data.image.name} />
                                    <div
                                        className='flex gap-2 flex-1 flex-col py-1'
                                    >
                                        <h2
                                            className='text-2xl font-medium'
                                        >{data.image.name}</h2>
                                        <p
                                            className='text-[15px] opacity-50'
                                        >Size: {data.image.size}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setData((prevData) => ({
                                        ...prevData,
                                        image: null
                                    }))}
                                >X</button>
                            </div>
                        </> :
                            <div
                                onClick={() => {
                                    fileInputRef?.current?.click();
                                }}
                                className='mt-5 capitalize glassmorphism cursor-pointer text-[#ffffff6d] hover:text-white border-[#ffffff6d] hover:border-white transition-all duration-1000 ease-in-out p-4 h-[100px] justify-center items-center flex border-2 border-dotted rounded-lg'
                            >
                                upload image
                            </div>
                    }
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        accept="image/*" // Optional: restrict file types to images only
                    />
                    <div className='flex flex-1 flex-col gap-1 mt-3'>
                        <label htmlFor="title" className='ml-1 mb-1 capitalize'>Title</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            className='p-2 rounded-lg border-2 border-[#ffffff6d] bg-black'
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
                            className='mt-2 bg-[green] p-3 rounded-lg'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </TracingBeam>
    );
};

export default Page;
