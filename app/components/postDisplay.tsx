'use client'
import React, { useState } from 'react'
import { CurrentTabProbs } from '../types'
import AllPosts from './blog/allPost'
import { PostResult } from '../types/PostResult'
import FilteredPost from './blog/filterPost'
import { usePosts } from '../context/PostContext'
// Define props type
interface SearchProps {
  postResult: PostResult[]
}

const PostDisplay = () => {
  const [activeForm, setActiveForm] = useState<CurrentTabProbs>('post')
const {posts} = usePosts()
  const handleFormChange = (currentTab: CurrentTabProbs) => {
    setActiveForm(currentTab)
  }

  return (
    <div className='p-4 rounded-lg border border-pink-500 mt-2 flex-col align-middle'>
      <div className='ml-72 flex justify-around align-middle h-14 p-2 gap-1.5 w-[25%] bg-gray-200 rounded-sm'>
        <button
          onClick={() => handleFormChange('post')}
          className={`${activeForm === 'post' && 'bg-black text-white'} btn w-28 rounded-md flex items-center justify-center p-2 h-full cursor-pointer gap-2 font-semibold text-[14px]`}
        >
          All Post
        </button>

        <button
          onClick={() => handleFormChange('searchresult')}
          className={`${activeForm === 'searchresult' && 'bg-red-600 text-white'} btn w-32 rounded-md flex items-center justify-center p-2 h-full cursor-pointer gap-2 font-semibold text-[14px]`}
        >
          Search result
        </button>
      </div>

      <div>
        {activeForm === 'post' && <AllPosts  posts ={posts}/>}
        {activeForm === 'searchresult' && <FilteredPost postResult={posts} />}
      </div>
    </div>
  )
}

export default PostDisplay
