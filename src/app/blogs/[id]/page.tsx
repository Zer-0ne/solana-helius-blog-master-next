'use client'
import { TracingBeam } from '@/components/ui/tracing-beam'
import dynamic from 'next/dynamic';
import rehypeRaw from 'rehype-raw'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import idl from '@/idl.json'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program, Provider } from '@project-serum/anchor';
import { getPostById } from '@/context/functions/getPostById';
import { Press_Start_2P, Quantico } from 'next/font/google';

const pressfont = Press_Start_2P({
    subsets: ['latin'],
    weight: '400'
})

const quanticoHeading = Quantico({
    subsets: ['latin'],
    weight: '700'
})

const quantico = Quantico({
    subsets: ['latin'],
    weight: '400'
})

const ReactMarkdown = dynamic(() => import('react-markdown'))

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

function getProgram(provider: Provider) {
    return new Program(idl as any, PROGRAM_KEY, provider);
}
const page = () => {
    const { id } = useParams();
    // console.log(id)
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const [provider, setProvider] = useState<Provider | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState<
        {
            id: string;
            title: any;
            content: any;
            userId: any;
        } | undefined>();
    useEffect(() => {
        try {
            if (provider) {
                const getPost = async () => {
                    try {
                        const program = getProgram(provider);
                        const post = await getPostById(id.toString(), program);
                        setPost(post);
                    } catch (error) {
                        console.log(error)
                    } finally {
                        setIsLoading(false)
                    }
                };
                getPost();
            }
        } catch { }
    }, [provider]);

    useEffect(() => {
        if (wallet) {
            const provider = new AnchorProvider(connection, wallet, {});
            setProvider(provider);
        }
    }, [connection, wallet]);
    return (
        <TracingBeam
            className='max-w-2xl'
        >
            <div
                className='flex flex-col m-3 mx-4 ml-8 lg:ml-4 md:ml-4'
            >

                <div>
                    <h1 className={`${pressfont.className} text-4xl mb-6 font-bold`}>{post?.title}</h1>
                </div>
                <ReactMarkdown
                    className='flex flex-col'
                    components={{
                        h1: ({ children }) => <h1 className={`text-3xl font-bold ${quanticoHeading.className}`}>{children}</h1>,
                        h2: ({ children }) => <h2 className={`text-2xl font-bold ${quanticoHeading.className}`}>{children}</h2>,
                        h3: ({ children }) => <h3 className={`text-xl font-bold ${quanticoHeading.className}`}>{children}</h3>,
                        h4: ({ children }) => <h4 className={`text-lg font-bold ${quanticoHeading.className}`}>{children}</h4>,
                        h5: ({ children }) => <h5 className={`text-base font-bold ${quanticoHeading.className}`}>{children}</h5>,
                        h6: ({ children }) => <h6 className={`text-sm font-bold ${quanticoHeading.className}`}>{children}</h6>,
                        p: ({ children }) => <p className={`text-sm leading-7 text-justify mt-2`}>{children
                        }</p>,
                        a: ({ children, href }) => <Link className={`'text-sm ${quantico.className}`} href={href as string}>{children
                        }</Link>,
                        blockquote: ({ children }) => <blockquote className={`text-sm ${quantico.className}`}>{children
                        }</blockquote>,
                        code: ({ children }) => <code className={'text-sm '}>{children
                        }</code>,
                        pre: ({ children }) => <pre
                            className='m-2 my-3 border-[#ffffff30] border-[1px] rounded-lg p-2 glassmorphism '
                        >{children}</pre>,
                        table: ({ children }) => <table className='table-auto'>{children
                        }</table>,
                        thead: ({ children }) => <thead className='bg-gray-100'>{children
                        }</thead>,
                        tbody: ({ children }) => <tbody className=''>{children
                        }</tbody>,
                        tr: ({ children }) => <tr className=''>{children
                        }</tr>,
                        th: ({ children }) => <th className=''>{children
                        }</th>,
                        td: ({ children }) => <td className=''>{children
                        }</td>,
                        li: ({ children }) => <li className=''>{children
                        }</li>,
                        ul: ({ children }) => <ul className='list-disc'>{children
                        }</ul>,
                        ol: ({ children }) => <ol className='list-decimal'>{children
                        }</ol>,
                        hr: () => <hr className='border-b-2 border-gray-300' />,
                        img: ({ alt, src }) => <img className='w-[100%]' loading='lazy' src={src} alt={
                            alt
                        } />,


                    }}
                    rehypePlugins={[rehypeRaw]}
                >

                    {post?.content}
                </ReactMarkdown>
            </div>

        </TracingBeam>
    )
}

export default page