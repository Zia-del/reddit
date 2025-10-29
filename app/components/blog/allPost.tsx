'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { PostResult } from '@/app/types/PostResult';

interface PostProps {
  posts: PostResult[]
}
const AllPosts: React.FC<PostProps> = ({ posts }) => {
  console.log('post in all posts', posts)


  return (
    <div className='  p-3 '>
      <h2 className='  text-2xl font-bold'>Popular Posts</h2>
      <ul>
        {posts.map((post) => (

          <li className='dataholder rounded-2xl mt-7 h-64 border border-red-600   ml-7' key={post.id}>
            <div>
              <div className='w-[78%] font-bold text-[16px] mt-5  flex justify-center'>
                {post.title}
              </div>
              <div className='flex justify-center '>
                <p className=' w-[50%]'>{post.body}</p>
              </div>
              <div className='gap-4 flex justify-center mt-7 w-[85%]'>
                <p><strong>Views:</strong> {post.views}</p>
                <p><strong>Likes:</strong> {post.reactions.likes}</p>
                <p><strong>Dislikes:</strong> {post.reactions.dislikes}</p>
                <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
              </div>
            </div>
          </li>

        ))}
      </ul>
    </div >
  );
}

export default AllPosts