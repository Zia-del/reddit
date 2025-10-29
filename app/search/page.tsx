'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePosts } from '../context/PostContext';
import { PostResult } from '../types/PostResult';
import FilteredPost from '../components/blog/filterPost';

//  This is your main search logic
const SearchContent: React.FC = () => {
  const [searchResult, setSearchResult] = useState<PostResult[]>([]);
  const { posts } = usePosts();
  const searchParams = useSearchParams();

  //  Safely read query from URL
  const query = searchParams.get('query')?.trim().toLowerCase() || '';

  useEffect(() => {
    if (query.trim() !== '' && posts.length > 0) {
      const results = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.body.toLowerCase().includes(query)
      );
      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  }, [posts, query]);

  console.log(searchResult);

  return (
    <div>
      {searchResult.length > 0 ? (
        <FilteredPost postResult={searchResult} />
      ) : (
        <div><p>No result found for this search</p></div>
      )}
    </div>
  );
};

//  The wrapper that adds Suspense
const Page: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <SearchContent />
    </Suspense>
  );
};

export default Page;
