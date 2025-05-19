import { useRef, useState } from "react";
import { POSTS } from "../../utils/db/dummy";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { Link } from "react-router";
import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";

const ProfilePage = () => {
  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");
  const isLoading = false;
  const isMyProfile = false;
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
  const user = {
    _id: "1",
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "/avatars/boy2.png",
    coverImg: "/cover.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "https://youtube.com/@asaprogrammer_",
    following: ["1", "2", "3"],
    followers: ["1", "2", "3"],
  };
  return (
    <div className="border-r border-l border-primary min-h-screen">
      {isLoading && <ProfileHeaderSkeleton />}
      {!isLoading && !user && (<p>Profile not found</p>)}
      {!isLoading && user && (
        <>
         <div className="font-bold text-xl flex gap-5 text-secondary  items-center p-4 border-b border-primary">
        <div>
          <IoMdArrowRoundBack />
        </div>
        <div>
          <p>{user?.fullName}</p>
          <p>{POSTS?.length} Posts</p>
        </div>
      </div>

      <figure className="relative">
        <img
        accept="image/*"
          className="w-full object-cover h-80 border-b border-opacity-50  border-primary"
          src={coverImg || user?.coverImg || "/cover.png"}
          alt="Cover"
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
            src={profileImg || user?.profileImg || "/avatars/boy1.png"}
            alt="Profile"
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
        <p className="text-secondary">{user?.fullName}</p>
        <p className="text-primary text-sm">@{user?.username}</p>
        <p className="text-secondary">{user?.bio}</p>
        <div className="flex gap-1 items-center">
          <FaLink className="text-primary text-xs" />
          <Link className="text-primary text-sm font-bold" to={user?.link}>
            {user?.link}
          </Link>
          {!isMyProfile && (<div className="flex flex-1 justify-end"><button className="btn btn-primary rounded-full ">follow</button></div>)}
          {isMyProfile && (<div className="flex flex-1 justify-end">
            <EditProfileModal />
          </div>)}
        </div>
        <div className="text-sm flex gap-5 mt-4 ">
          <p className="text-secondary">
            {user?.following?.length}{" "}
            <span className="text-primary">Following</span>
          </p>
          <p className="text-secondary">
            {user?.followers?.length}{" "}
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
        <Posts />
      </div>
      </>

      )}
     
    </div>
  );
};

export default ProfilePage;
