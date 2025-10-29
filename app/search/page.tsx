// import React from 'react'
// import { usePosts } from '../context/PostContext';
// import { PostResult } from '../types/PostResult';
// import { useState } from 'react';
// import FilteredPost from '../components/blog/filterPost';

// const page = async ({ searchParams }: { searchParams: { query?: string } }) => {
//     const [filterpost, setFilterPost] = useState<PostResult[]>([])
//     const query = searchParams.query?.trim() || '';
//     const { posts } = usePosts()
//     const result : PostResult[] = posts.filter((post) => {
//         post.title.toLowerCase().includes(query.toLowerCase()) ||
//             post.body.toLowerCase().includes(query.toLowerCase())
//     })
//     setFilterPost(result)
//     return (
//         <div>
//             <FilteredPost postResult={FilteredPost}/>
//         </div>
//     )
// }

// export default page
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { usePosts } from '../context/PostContext';
// import { PostResult } from '../types/PostResult';
// import FilteredPost from '../components/blog/filterPost';

// interface PageProps {
//   searchParams: { query?: string };
// }

// const Page: React.FC<PageProps> = ({ searchParams }) => {
//   const [filteredPosts, setFilteredPosts] = useState<PostResult[]>([]);
//   const { posts } = usePosts();
//   const query = searchParams.query?.trim().toLowerCase() || '';

//   useEffect(() => {
//     if (posts && query) {
//       const results = posts.filter(
//         (post) =>
//           post.title.toLowerCase().includes(query) ||
//           post.body.toLowerCase().includes(query)
//       );
//       setFilteredPosts(results);
//     } else {
//       setFilteredPosts(posts || []);
//     }
//   }, [posts, query]);

//   return (
//     <div>
//       <FilteredPost postResult={filteredPosts} />
//     </div>
//   );
// };

// export default Page;

'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePosts } from '../context/PostContext';
import { PostResult } from '../types/PostResult';
import FilteredPost from '../components/blog/filterPost';

const Page: React.FC = () => {
  const [searchResult, setSearchResult] = useState<PostResult[]>([]);
  const { posts } = usePosts();
  const searchParams = useSearchParams();

  // ✅ Safely read query from URL
  const query = searchParams.get('query')?.trim().toLowerCase() || '';

  useEffect(() => {
    if (query.trim() !== '' && posts.length > 0) {
      const results = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  }, [posts, query]);

  console.log(searchResult)

  return (
    <div>
      {searchResult.length > 0 ? (
        <FilteredPost postResult={searchResult} />
      ) : (<div><p>No result found for this search</p></div>)
      }

    </div>
  );
};

export default Page;

