import Image from 'next/image'
import React from 'react'
import { TracingBeam } from './ui/tracing-beam'

const Background = ({ children }: { children: React.ReactNode }) => {
    return (<>
        <div
            className='fixed -z-10 lg:left-[200px] md:left-[200px] left-0 sm:left-0 sm:right-0 my-[auto] top-0 bottom-0 right-0 lg:right-[200px] md:right-[200px] mx-auto'
        >

            <div
                className="border-[1px] h-[90%] mt-24 flex flex-1 justify-center items-center overflow-hidden border-black max-w-[100%] relative after:absolute after:w-[5px] after:bg-black after:top-0 after:bottom-0 after:right-0 before:absolute before:w-[5px] before:bg-black before:top-0 before:bottom-0 before:left-0 before:-z-[1px] -z-10 after:-z-[1px]"
            >
                <div
                    className="w-[100%] flex justify-center items-center h-[100%] overflow-hidden"
                >

                    <Image
                        width={1500}
                        height={1500}
                        priority
                        src="/solana.gif"
                        style={{
                            objectFit: 'cover',
                            width: '180%',
                            maxWidth: '180%',
                            // height: '100% !important',
                            opacity: 1,
                            zIndex: -1
                        }}
                        unoptimized
                        alt="Solana"
                    />
                </div>

            </div>
        </div>
        <TracingBeam>
            {children}
        </TracingBeam>
    </>

    )
}

export default Background