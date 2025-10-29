
import axiosInstance from '../libs/axios';
import { PostResult } from '../types/PostResult';

export const getPost = async (): Promise<PostResult[]> => {
  const response = await axiosInstance.get<{ posts: PostResult[] }>('/posts', {
    params: { limit: 10, sort: 'new' },
  });

  return response.data.posts; // ✅ Only return the array, not the whole Axios response
};
