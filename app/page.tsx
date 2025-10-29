'use client'
import React from 'react'
import PostDisplay from './components/postDisplay'
import { useState, useEffect } from 'react'
import { PostResult } from './types/PostResult'
import { getPost } from './service/popularPostService'

const page = () =>{
  return (
    <div>
      <PostDisplay/>
    </div>
  )
}

export default page