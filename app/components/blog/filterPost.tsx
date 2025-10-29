import React from 'react'
import { getPost } from '@/app/service/popularPostService';
import { useState, useEffect } from 'react';
import { PostResult } from '@/app/types/PostResult';
import Image from 'next/image';
interface SearchProps {
  postResult: PostResult[]
}

const FilteredPost = ({ postResult }: SearchProps) => {
  console.log('post result in serch result', postResult)
  if (!postResult) {
    return []
  }
  return (
    <ul className='border border-purple-800'>
      {
        postResult.map((item: any, index: any) => (
          <li className='dataholder rounded-2xl mt-7 h-64 border border-red-600 ' key={index}>
            <div>
              <div className='w-[78%] font-bold text-[16px] mt-5  flex justify-center'>
                {item.title}
              </div>
              <div className='flex justify-center '>
                <p className=' w-[50%]'>{item.body}</p>
              </div>
              
              <div className='gap-4 flex justify-center mt-7 w-[85%]'>
                <p><strong>Views:</strong> {item.views}</p>
                <p><strong>Likes:</strong> {item.reactions.likes}</p>
                <p><strong>Dislikes:</strong> {item.reactions.dislikes}</p>
                <p><strong>Tags:</strong> {item.tags.join(', ')}</p>
              </div>
            </div>
          </li>

        ))
      }


    </ul>

  )
}

export default FilteredPost