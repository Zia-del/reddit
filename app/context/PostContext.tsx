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
  export const usePosts = (): PostContextType => {
    const context = useContext(PostContext);
    if (context === undefined) {
      throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
  };
  