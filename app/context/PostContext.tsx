// // context/PostContext.tsx
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { getPost } from '@/service/postService'; // Adjust the import to your project structure
// import { PostResult } from '../types/PostResult'; // Make sure this type is defined

// type PostContextType = {
//   posts: PostResult[] | null;
//   loading: boolean;
//   error: string | null;
// };

// const PostContext = createContext<PostContextType | undefined>(undefined);

// export const PostProvider = ({ children }: { children: ReactNode }) => {
//   const [posts, setPosts] = useState<PostResult[] | >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const result:PostResult[] = await getPost();
//         setPosts(result);
//       } catch (err) {
//         setError('Failed to fetch posts');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <PostContext.Provider value={{ posts, loading, error }}>
//       {children}
//     </PostContext.Provider>
//   );
// };

// // Custom hook for using the context
// export const usePosts = () => {
//   const context = useContext(PostContext);
//   if (!context) {
//     throw new Error('usePosts must be used within a PostProvider');
//   }
//   return context;
// }


'use client'
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    FC,
  } from 'react';
  import { getPost } from '../service/popularPostService';
  import { PostResult } from '../types/PostResult';
  
  // ✅ Define the context type
  interface PostContextType {
    posts: PostResult[];
    loading: boolean;
    error: string | null; // <-- Changed to allow nullType>>
  };
  
  // ✅ Create the context with initial value undefined
  const PostContext = createContext<PostContextType | undefined>(undefined);
  
  // ✅ PostProvider component
  export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<PostResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredPost, setfilteredPost] = useState<PostResult |  null>(null)
  
    useEffect(() => {
      const fetchPosts = async (): Promise<void> => {
        try {
          const result = await getPost();
          console.log("result in context", result)
          if(Array.isArray(result)){
            console.log("array result in context", result)
            setPosts(result);
            console.log(result)

          }
        } catch (err: unknown) {
          setError('Failed to fetch posts');
          console.error('Fetch posts error:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, []);

    console.log("result in state", posts)
  
    return (
      <PostContext.Provider value={{ posts, loading, error}}>
        {children}
      </PostContext.Provider>
    );
  };
  
  // ✅ Custom hook to access PostContext
  // when you fall in love with the character you drew
  export const usePosts = (): PostContextType => {
    const context = useContext(PostContext);
    if (context === undefined) {
      throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
  };
  