import { useState } from "react";
import { Link } from "react-router";
import { FaTrash } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaRetweet } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const Post = ({ post }) => {
  const [comment, setcomment] = useState("");
  const postOwner = post.user;
  const [isLiked, setLiked] = useState(false);
  const [isMyPost, setIsMyPost] = useState(true);
  const formattedDate = "1h";
  const isCommenting = false;

  const handleDeletePost = () => {};
  const handlePostComment = (e) => {
    e.preventDefault();
  };

  const handleLikedPost = () => {
    setLiked(!isLiked);
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
            />
          </Link>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <p className="text-secondary text-sm">{postOwner.fullName}</p>
              <p className="text-primary text-xs">@{postOwner.username}</p>
              <span className="text-secondary text-xs">{formattedDate}</span>
              {isMyPost && (
                <span className="flex justify-end flex-1">
                  <FaTrash
                    className="text-primary cursor-pointer hover:text-red-500 justify-end"
                    onClick={handleDeletePost}
                  />
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
            <figure className="p-2  flex justify-center items-center rounded-xl w-full h-fit">
              <img
                src={post.img}
                alt="postImg"
                className="h-80 p-2 object-contain rounded-lg border border-primary"
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
                          <div className="flex flex-col gap-2 text-xs bordr border-b border-primary mb-5 w-full ">
                            <figure className="flex gap-2 text-sm text-secondary">
                              <img
                                src={
                                  postOwner.profileImg || "/avatars/boy1.png"
                                }
                                alt="ProfileImage"
                                className="h-8 w-8 rounded-full"
                              />
                              <div key={comment._id}>
                                <p className="text-xs mb-2">
                                  {postOwner.fullName}{" "}
                                  <span className="text-primary">
                                    @{postOwner.username}
                                  </span>
                                </p>
                                <p className="mb-2">{comment.text}</p>
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
                  onChange={(e) => setcomment(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
               <button
                  className="btn btn-primary rounded-2xl"
                  type="submit"
                  disabled={isCommenting}
                >
                 {isCommenting ? "Posting..." : "Post"}
                </button>
                <button className="btn btn-danger rounded-2xl" onClick={() => document.getElementById(`my_modal_5${post._id}`).close()}>Close</button>
              </div>
            </form>
             
          </div>
        </dialog>
        <FaRetweet />
          <span className="flex items-center gap-1">
          {isLiked ? (
            <FaHeart className="text-red-500" onClick={handleLikedPost} />
          ) : (
            <CiHeart className="text-xl font-bold " onClick={handleLikedPost} />
          )}
          {post.likes.length}
        </span>

        <FaBookmark />
      </div>
    </>
  );
};

export default Post;
