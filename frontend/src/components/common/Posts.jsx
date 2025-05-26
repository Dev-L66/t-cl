import Post from './Post';
import PostSkeleton from '../skeletons/PostSkeleton';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';



const Posts = ({feedType, username, userId}) => {
 
  const getPostEndpoint = ()=>{
    if(feedType === "forYou"){
      return "/api/posts/all";
    }
    if(feedType === "following"){
      return "/api/posts/following";
    }
    if(feedType === "posts"){
      return `/api/posts/user/${username}`;
    }
    if(feedType === "likes"){
      return `/api/posts/likes/${userId}`;
    }
    if(feedType === ""){
      return "/api/posts/all";
    }
  }

  const POST_ENDPOINT = getPostEndpoint();

  const {data: posts, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ["posts"],
    queryFn: async ()=>{
      try{
        const res = await fetch(POST_ENDPOINT,{
          accept:{
            "Content-Type": "application/json",
          },
          credentials:"include"
        });
        const data = await res.json();
        
        if(!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      }catch(error){
        console.log(error);
        throw error;
      }
    },
  });

 useEffect(()=>{
  refetch();
 },[feedType, refetch]);
  return (
    <>
    {isLoading || isRefetching&& (
      <div>
      <PostSkeleton/>
      <PostSkeleton/>
      <PostSkeleton/>
      </div>
    )}
    {!isLoading &&!isRefetching && posts?.length === 0 &&
      (<p className='text-3xl text-secondary font-bold text-center flex justify-center items-center h-screen'>No posts found.</p>)
    }
    {!isLoading && !isRefetching && posts &&(
      <div className='flex flex-col'>
        {posts.map((post)=>(
          <div key={post._id} className='border-b border-primary border-opacity-100 p-2'>
          <Post post={post}/>
          </div>
        ))}
      </div>
    )}
    </>
  )
}

export default Posts;