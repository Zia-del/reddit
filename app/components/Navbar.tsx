'use client'
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePosts } from "../context/PostContext"
import { PostResult } from "../types/PostResult"

const Navbar = () => {
  const [query, setQuery] = useState('')
  const { posts } = usePosts()
  const [filterPost, setFilterPost] = useState<PostResult[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (query.trim() === '') {
      setFilterPost([])
      return
    }

    const timer = setTimeout(() => {
      const result = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
      setFilterPost(result.slice(0, 5))
    }, 300)

    return () => clearTimeout(timer)
  }, [query, posts])

  const handleSearch = (postTitle: string) => {
    router.push(`/search?query=${encodeURIComponent(postTitle)}`)
    setQuery('')
    setIsSearchFocused(false)
  }

  return (
    <div>
      <div id='reddit' className='p-2 flex justify-between font-bold text-4xl text-red-600'>
        <h1>Reecho</h1>

        <div className='flex text-[15px] justify-around w-[20%] text-black items-center'>
          <p>AboutUs</p>
          <p>ContactUs</p>
          <p>Help?</p>
        </div>

        <div className='flex justify-around h-12 w-[20%]'>
          <button className='bg-red-600 w-[40%] p-1.5 text-[15px] rounded-sm text-white'>Signup</button>
          <button className='bg-black w-[40%] p-1.5 text-[15px] rounded-sm text-white'>Login</button>
        </div>
      </div>

      {/* Search Bar */}
      <input
        className='border border-gray-300 w-[50%] p-1.5 text-[15px] rounded-sm outline-black'
        type="search"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
      />

      {isSearchFocused && filterPost.length > 0 && (
        <div className='border border-gray-300 w-[50%] bg-white shadow-md rounded-sm mt-1'>
          <ul>
            {filterPost.map((post) => (
              <li
                key={post.id}
                onMouseDown={() => handleSearch(post.title)}
                className='p-2 hover:bg-gray-100 cursor-pointer'
              >
                {post.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
