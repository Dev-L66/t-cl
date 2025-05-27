import {  useEffect, useRef, useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { Link, useParams } from "react-router";
import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import useFollow from "../../hooks/useFollow";
import {  useQuery } from "@tanstack/react-query";
import { FaCalendarAlt } from "react-icons/fa";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { API } from "../../utils/index.js";

const ProfilePage = () => {
  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");

  const { username } = useParams();
  
  const { data:authUser } = useQuery({
    queryKey: ["authUser"],
   
  });
  
  const { followUnfollow, isPending } = useFollow();
  const {
    data: userProfile,
    isLoading,
    refetch,
    
  } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API}/api/users/profile/${username}`,{
          method: "GET",
          credentials: "include",});
        const data = await res.json();
       
        if (!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
  });

  const {updateProfile, isUpdatingProfile} = useUpdateProfile();

  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API}/api/posts/user/${username}`,{
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
  });
  const isMyProfile = authUser?._id === userProfile?._id;
  const amIFollowing = authUser?.following.includes(userProfile?._id);

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    refetch();
  }, [username, refetch]);
  return (
    <div className="border-r border-l border-primary min-h-screen">
      {isLoading && <ProfileHeaderSkeleton />}
      {!isLoading && !userProfile && <p>Profile not found</p>}
      {!isLoading && userProfile && (
        <>
          <div className="font-bold text-xl flex gap-5 text-secondary  items-center p-4 border-b border-primary">
            <div>
              <IoMdArrowRoundBack />
            </div>
            <div>
              <p>{userProfile?.fullName}</p>
              <p className="text-sm">
                {!isPostsLoading && posts?.length}{" "}
                {isPostsLoading && <LoadingSpinner />}{" "}
                {posts?.length === 1 ? "Post" : "Posts"}
              </p>
            </div>
          </div>

          <figure className="relative">
            <img
              accept="image/*"
              className="w-full object-cover h-80 border-b border-opacity-50  border-primary"
              src={coverImg || userProfile?.coverImg || "/cover.png"}
              alt="CoverImg"
              loading="lazy"
            />

            <div className="absolute top-3 right-2 rounded-full bg-primary p-2">
              <MdEdit
                fill="white"
                onClick={() => coverImgRef.current.click()}
                className="text-xl text-white cursor-pointer"
              />
              <input
                accept="image/*"
                type="file"
                ref={coverImgRef}
                className="hidden"
                onChange={(e) => handleImgChange(e, "coverImg")}
              />
            </div>

            <div className="absolute top-[250px] left-4">
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={
                  profileImg || userProfile?.profileImg || "/avatars/boy1.png"
                }
                alt="ProfileImg"
                loading="lazy"
              />

              <div className="absolute bottom-0 right-0 rounded-full bg-primary p-1">
                <MdEdit
                  fill="white"
                  onClick={() => profileImgRef.current.click()}
                  className="text-sm text-white cursor-pointer"
                />
              </div>
              <input
                type="file"
                ref={profileImgRef}
                className="hidden"
                onChange={(e) => handleImgChange(e, "profileImg")}
              />
            </div>
          </figure>
          <div className="flex flex-col py-10 px-5">
            <p className="text-secondary">{userProfile?.fullName}</p>
            <p className="text-primary text-sm">@{userProfile?.username}</p>
            <p className="text-secondary">{userProfile?.bio}</p>
            <div className="flex flex-col gap-2 pt-2 justify-center ">
              <div>
                <FaLink className="text-primary text-xs" />
                <Link
                  className="text-primary text-sm font-bold"
                  to={userProfile?.link}
                >
                  {userProfile?.link}
                </Link>
              </div>

              <div className="text-xs text-secondary flex gap-2 p-1">
                <FaCalendarAlt /> Joined{" "}
                {new Date(userProfile?.createdAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
              {isMyProfile && (
                <div className="flex flex-1 justify-end">
                  <EditProfileModal authUser={authUser} />
                </div>
              )}
              {!isMyProfile && (
                <div className="flex flex-1 justify-end">
                  <button
                    className="btn btn-primary rounded-full "
                    onClick={() => followUnfollow(userProfile?._id)}
                  >
                    {isPending && <LoadingSpinner />}
                    {!isPending && amIFollowing && "Unfollow"}
                    {!isPending && !amIFollowing && "Follow"}
                  </button>
                </div>
              )}
              {(coverImg || profileImg) && (
									<button
										className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
										onClick={async () => {
											await updateProfile({ coverImg, profileImg });
											setProfileImg(null);
											setCoverImg(null);
										}}
									>
										{isUpdatingProfile ? "Updating..." : "Update"}
									</button>
								)}
            </div>
            <div className="text-sm flex gap-5 mt-4 ">
              <p className="text-secondary">
                {userProfile?.following?.length}{" "}
                <span className="text-primary">Following</span>
              </p>
              <p className="text-secondary">
                {userProfile?.followers?.length}{" "}
                <span className="text-primary ">Followers</span>
              </p>
            </div>
            <div className="flex text-secondary font-bold justify-around items-center gap-5 mt-4 border-b border-primary w-full">
              <div
                onClick={() => setFeedType("posts")}
                className="hover:bg-secondary/10 w-80 h-10 flex justify-center items-center cursor-pointer"
              >
                <p
                  className={`${
                    feedType === "posts"
                      ? "w-8 border-b-2  pb-2 border-secondary"
                      : ""
                  }`}
                >
                  Posts
                </p>
              </div>
              <div
                onClick={() => setFeedType("likes")}
                className="hover:bg-secondary/10 w-80 h-10 flex justify-center items-center cursor-pointer"
              >
                <p
                  className={` ${
                    feedType === "likes"
                      ? "w-8 border-b-2 pb-2 border-secondary"
                      : ""
                  }`}
                >
                  Likes
                </p>
              </div>
            </div>
            <Posts
              feedType={feedType}
              username={username}
              userId={userProfile?._id}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
