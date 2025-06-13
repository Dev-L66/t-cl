import {useState } from "react";
import { Link } from "react-router";
import { FaTrash } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaRetweet } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";
import { formatPostDate } from "../../utils";
import { API } from "../../utils/index.js";
const Post = ({ post }) => {
  const {data: authUser} = useQuery({queryKey:["authUser"], queryFn:['authUser']});
  const [comment, setComment] = useState("");
  const postOwner = post.user;
  const isLiked = post.likes.includes(authUser?._id);
// console.log(API);
  const isMyPost = authUser?._id === post?.user?._id;
  let date = formatPostDate(post?.createdAt);  
const queryClient = useQueryClient();

  const {mutate:likePost, isPending:isLiking} = useMutation({
    mutationFn:async()=>{
      try{
        const res = await fetch(`${API}/api/posts/likes/${post._id}`,{
          method: "POST",
          credentials:"include"
        });
        const data = await res.json();
        if(!res.ok) throw new Error (data.message || "Something went wrong.");
        return data;
      }catch(error){
        console.error(error);
        throw new Error(error);
      }
    },
    onSuccess:(updatedLikes)=>{
      queryClient.setQueryData(["posts"], (oldData) => {
        return oldData.map((p) => {
          if (p._id.toString() === post._id.toString()) {
            return { ...p, likes: updatedLikes };
          }
          return p;
        });
      })
      
      
    }
  })

   
  const {mutate:deletePost, isPending:isDeleting} = useMutation({
    mutationFn: async() =>{
      try{
        const res = await fetch (`${API}/api/posts/${post._id}`,{
          method:"DELETE",
          credentials:"include"

        });
        const data = res.json();
        if(!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      }catch(error){
        console.error(error);
        throw new Error(error);
      }

    },
    onSuccess:()=>{
      toast.success("Post deleted successfully!");
      queryClient.setQueryData(["posts"], (oldData)=> oldData.filter((p)=> p._id !== post._id));

    }
  })

  const {mutate: commentPost, isPending:isCommenting} = useMutation({
    mutationFn: async ()=>{
      try{
        const res = await fetch (`${API}/api/posts/comment/${post._id}`,{
          method: "POST",
          credentials:"include",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({text: comment})
        })
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      }catch(error){
        console.error(error);
        throw new Error(error);
      }
    },
    onSuccess:()=>{
      toast.success("Comment added successfully!");
      setComment("");
     
      queryClient.invalidateQueries({queryKey:["posts"]});
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  })
   
  const {mutate: deleteComment, isPending: isDeletingComment} = useMutation({
    mutationFn: async(commentId)=>{
      try {
        const res = await fetch(`${API}/api/posts/${post._id}/comment/${commentId}`,{
          method: "DELETE",
          credentials:"include"
        });
        const data = await res.json();
        
        if(!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      }catch(error){
        console.error(error);
        throw new Error(error);
      }
    },
    onSuccess:()=>{
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({queryKey:["posts"]});
    }
  })

  
 
 
  const handleDeletePost = () => {
    deletePost();
  };
  const handlePostComment = (e) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost();
  };

  const handleDeleteComment = (commentId) => {
    if(isDeletingComment) return;
    deleteComment(commentId);
  };

  const handleLikedPost = () => {
    if(isLiking) return;
    likePost();
  };
 
  return (
    <>
      <div className="flex items-center py-3 px-5">
        <div className="flex gap-3 w-full">
          <Link to={`/profile/${postOwner.username}`}>
            <img
              src={postOwner.profileImg || "/avatars/boy1.png"}
              alt="ProfileImage"
              className="h-10 w-10"
              loading="lazy"
            />
          </Link>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col">
              <p className="text-secondary text-sm">{postOwner.fullName}</p>
              <p className="text-primary text-xs font-bold">@{postOwner.username}</p>
              <div>
              <span className="text-gray-700 text-xs">{date} ago</span>
              </div>
              {isMyPost && (
                <span className="flex justify-end flex-1">
                 {!isDeleting && <FaTrash
                    className="text-primary cursor-pointer hover:text-red-500 justify-end"
                    onClick={handleDeletePost}
                  />}
                  {isDeleting && <LoadingSpinner/>}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex gap-2  justify-end bg-amber-200"></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="px-5 flex flex-col justify-center">
        <p className="p-2 text-md text-secondary">{post.text}</p>
        {post.img && (
          <div>
            <figure className="p-2 flex justify-center items-center rounded-xl w-full h-fit">
              <img
                src={post.img}
                alt="postImg"
                className=" w-max-70 h-max-70 p-2 object-contain rounded-xl border border-primary"
                loading="lazy"
              />
            </figure>
          </div>
        )}
      </div>
      <div className="text-primary flex justify-between items-center">
        <button
          className="btn bg-transparent border-none text-primary"
          onClick={() =>
            document.getElementById(`my_modal_5${post._id}`).showModal()
          }
        >
          {" "}
          <FaRegComment />
          {post.comments.length}
        </button>
        <dialog
          id={`my_modal_5${post._id}`}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box border border-primary rounded-xl">
            <form method="dialog" onSubmit={handlePostComment}>
              <div className="w-full p-2">
                <div className="py-4">
                  <h1 className="text-secondary font-bold">COMMENTS</h1>
                </div>
                <div className="p-2">
                  <div className="text-secondary text-lg ">
                    {post.comments.length === 0
                      ? "No comments"
                      : post.comments.map((comment) => (
                          <div key={comment._id} className="flex flex-col gap-2 text-xs bordr border-b border-primary mb-5 w-full ">
                            <figure className="flex gap-2 text-sm text-secondary">
                              <img
                                src={
                                  postOwner.profileImg || "/avatars/boy1.png"
                                }
                                alt="ProfileImage"
                                className="h-8 w-8 rounded-full"
                                loading="lazy"
                              />
                              <div>
                                <p className="text-xs mb-2">
                                  {postOwner.fullName}{" "}
                                  <span className="text-primary">
                                    @{postOwner.username}
                                  </span>
                                </p>
                                <div className="flex gap-2 justify-between items-center">
                                <p className="mb-2">{comment.text}</p>
                                <FaTrash className="cursor-pointer text-xs text-primary"  onClick={() => handleDeleteComment(comment._id)}/>
                              </div>
                              </div>
                            </figure>
                          </div>
                        ))}
                  </div>
                </div>
                <textarea
                  className="p-3 w-full focus:outline-0 resize-none  rounded text-sm text-secondary h-20"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
               
               <button
                  className="btn btn-primary rounded-2xl"
                  type="submit"
                  
                >
                 Post
                </button>
                <button disabled={isCommenting} className="btn btn-danger rounded-2xl" onClick={(e) =>e.preventDefault() || document.getElementById(`my_modal_5${post._id}`).close()}>Close</button>
              </div>
            </form>


          </div>
        </dialog>
        <FaRetweet />
          <span className="flex items-center gap-1">
            {isLiking && <LoadingSpinner/>}
          {isLiked && !isLiking && (
            <FaHeart className="text-red-500" onClick={handleLikedPost} />
)}
            {!isLiked && !isLiking && (<CiHeart className="text-xl font-bold " onClick={handleLikedPost} />)}
          
          {post.likes.length}
        </span>

        <FaBookmark />
      </div>
    </>
  );
};

export default Post;
