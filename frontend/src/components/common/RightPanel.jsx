import  useFollow  from "../../hooks/useFollow.jsx";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton.jsx";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import { API } from "../../utils/index.js";

const RightPanel = () => {
  const {data:suggestedUsers, isLoading}= useQuery({
    queryKey:["suggestedUsers"],
    queryFn:async ()=>{
      try{
        const res = await fetch(`${API}/api/users/suggested`,{
          method:"GET",
          credentials:"include"
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;

      }catch(error){
        console.log(error);
        throw new Error(error);
      }
    }
  });
  const {followUnfollow, isPending} = useFollow();
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-seconadary rounded-2xl p-4 ">
        <h2 className="font-bold text-lg mb-4 px-2">Who to follow</h2>
        {isLoading && (<div className="">
        <RightPanelSkeleton />
        <RightPanelSkeleton />
        <RightPanelSkeleton /> 
        <RightPanelSkeleton /> 
        <RightPanelSkeleton /> 
        </div>)}
        {!isLoading && !suggestedUsers?.length && <p className="text-sm text-gray-500">No suggested users</p>}
        {!isLoading && (suggestedUsers?.map((user) => (
          <div key={user._id} className="p-3 hover:bg-primary/10 rounded-lg transition">
            <Link to={`profile/${user?.username}`} className="flex items-center gap-3">
              <img
                src={user?.profileImg || "/avatars/boy1.png"}
                className="w-10 h-10 rounded-full object-cover"
                alt="profileImg"
              />
              <div className="text-xs  flex flex-col">
                <p className="font-medium">{user?.fullName}</p>
                <p className="text-sm text-gray-500">@{user?.username}</p>
              </div>
              <button 
                onClick={(e) => {e.preventDefault(); followUnfollow(user?._id)}}
                className="text-xs font-bold bg-primary text-white px-3 py-1 rounded-full hover:bg-primary/80 transition"
              >
                {isPending ? <LoadingSpinner /> : "Follow"}
              </button>
            </Link>
          </div>)
        ))}
      </div>
    </div>
  );
};
export default RightPanel;
