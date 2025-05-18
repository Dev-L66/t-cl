import Post from './Post';
import PostSkeleton from '../skeletons/PostSkeleton';
import {POSTS} from '../../utils/db/dummy';
import { useState } from 'react';

const Posts = () => {
  const[isLoading, setLoading] = useState(false);
  return (
    <>
    {isLoading && (
      <div>
      <PostSkeleton/>
      <PostSkeleton/>
      <PostSkeleton/>
      </div>
    )}
    {!isLoading && POSTS?.length === 0 &&
      <p>No posts found.</p>
    }
    {!isLoading && POSTS &&(
      <div className='flex flex-col'>
        {POSTS.map((post)=>(
          <div key={post._id} className='border-b border-primary border-opacity-100 p-10'>
          <Post post={post}/>
          </div>
        ))}
      </div>
    )}
    </>
  )
}

export default Posts;