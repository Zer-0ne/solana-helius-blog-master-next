'use client'
import Image from "next/image";
import { Plaster, Quando, Press_Start_2P } from 'next/font/google'
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import { useBlog } from "@/context/Blog";

const plaster = Plaster({
  subsets: ['latin'],
  weight: '400'
})
const quando = Quando({
  subsets: ['latin'],
  weight: '400'
})
const pressfont = Press_Start_2P({
  subsets: ['latin'],
  weight: '400'
})

export default function Home() {
  const btnText = 'initialize user'
  const { connected, select } = useWallet()
  const { user, posts, initialized, initUser, createPost, showModal, setShowModal } = useBlog()

  const onConnect = async () => {
    // setConnecting(true)
    select(PhantomWalletName);
    // console.log(await initUser())
    await initUser()
    // initialized is for true connection
  }
  console.log(user,initialized)
  return (
    <>
      <main
        className="flex flex-1 justify-center items-center my-auto min-h-[80vh]"
      >
        <div
          className="border-[1px] border-black max-w-[100%] relative after:absolute after:w-[5px] after:bg-black after:top-0 after:bottom-0 after:right-0 before:absolute before:w-[5px] before:bg-black before:top-0 before:bottom-0 before:left-0 "
        >
          <Image
            width={700}
            height={700}
            src="/solana.gif"
            unoptimized
            alt="Solana"
          />


          <div
            className="absolute inset-0 flex flex-1 justify-center items-center gap-2 flex-col"
          >
            <div
              className="text-center heading-bg p-2"
            >
              <h1 className={`lg:text-5xl md:text-5xl sm:text-4xl text-4xl font-bold ${plaster.className}`}>EtherBlog</h1>
              <h3 className={`lg:text-lg md:text-lg sm:text-xs text-xs ${quando.className}`}>Decentralized Blogging on the Blockchain</h3>
            </div>
          </div>

          <div
            className="absolute -bottom-2 left-0 right-0 flex justify-center items-center"
          >
            <button
              onClick={onConnect}
              className={`relative box p-[10px] px-4 lg:text-[.7rem] md:text-[.7rem] text-[10px] sm:text-[10px] capitalize w-[auto] text-white rounded-2xl ${pressfont.className}`}
            >
              {btnText}</button>
          </div>
        </div>
      </main>
    </>
  );
}
