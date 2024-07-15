'use client';

import * as anchor from '@project-serum/anchor';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { getAvatarUrl } from '@/functions/getAvatarUrl';
import { getRandomName } from '@/functions/getRandomName';
import idl from '@/idl.json';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

interface BlogContextType {
  user: any;
  posts: any[];
  initialized: boolean;
  transactionPending: boolean;
  initUser: () => Promise<void>;
  createPost: (title: string, content: string, image: string) => Promise<void>;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const BlogContext = createContext<BlogContextType>({
  user: null,
  posts: [],
  transactionPending: false,
  initialized: false,
  initUser: async () => { },
  createPost: async () => { },
  showModal: false,
  setShowModal: () => { },
});

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [transactionPending, setTransactionPending] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [lastPostId, setLastPostId] = useState<number>(0);

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const program = useMemo(() => {
    // console.log(anchorWallet)
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
      return new anchor.Program(idl as anchor.Idl, PROGRAM_KEY, provider);
    }
    return null;
  }, [connection, anchorWallet]);

  useEffect(() => {
    const start = async () => {
      // console.log(publicKey,program)
      if (program && publicKey) {
        try {
          const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);
          const userAccount = await program.account.userAccount.fetch(userPda);
          // console.log('hi', userAccount)
          if (userAccount) {
            setInitialized(true);
            setUser(userAccount);
            setLastPostId(userAccount.lastPostId);
            const postAccounts = await program.account.postAccount.all(publicKey.toString() as any);
            setPosts(postAccounts);
          }
        } catch (error) {
          console.error(error);
          setInitialized(false);
        }
      }
    };

    start();
  }, [program, publicKey, transactionPending]);

  const initUser = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);
        const name = getRandomName();
        const avatar = getAvatarUrl(name);

        await program.methods
          .initUser(name, avatar)
          .accounts({
            userAccount: userPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        setInitialized(true);
        const userAccount = await program.account.userAccount.fetch(userPda);
        // console.log('User Account:', userAccount);
      } catch (error) {
        console.error(error);
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const createPost = async (title: string, content: string, image: string) => {
    if (program && publicKey) {
      setTransactionPending(true);
      try {
        const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);
        const lastPostIdArray = typeof lastPostId !== 'undefined' ? [lastPostId] : [0];
        const [postPda] = findProgramAddressSync(
          [
            utf8.encode('post'),
            publicKey.toBuffer(),
            Uint8Array.from(lastPostIdArray),
          ],
          program.programId
        );
        await program.methods
          .createPost(title, content, image, new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'UTC'
          }) as string)
          .accounts({
            userAccount: userPda,
            postAccount: postPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        setShowModal(false);
      } catch (error) {
        console.error(error);
      } finally {
        setTransactionPending(false);
      }
    }
  };

  return (
    <BlogContext.Provider
      value={{
        user,
        posts,
        transactionPending,
        initialized,
        initUser,
        createPost,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
