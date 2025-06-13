import LoadingSpinner from "../../components/common/LoadingSpinner";
import { CiSettings } from "react-icons/ci";
import { FaUser, FaHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../../utils/index.js";
const NotificationPage = () => {
const queryClient = useQueryClient();
  const {data: notifications, isLoading: notificationsLoading} = useQuery({
    queryKey: ["notifications"],
    queryFn: async()=>{
      try{
        const res = await fetch(`${API}/api/notifications`,{
          method:"GET",
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
  });
  const {mutate:deleteNotifications, isPending:isDeleting} = useMutation({
    mutationFn: async ()=>{
      try{
        const res = await fetch(`${API}/api/notifications`,{
          method:"DELETE",
          credentials:"include"
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      } catch (error){
        console.log(error);
        throw new Error(error)
      }
    },
    onSuccess:()=>{
      toast.success("All notifications deleted");
      queryClient.invalidateQueries({queryKey:["notifications"]});
    }
  });

  const {mutate: deleteNotificationId, isPending: isDeletingId} = useMutation({
    mutationFn: async(notificationId)=>{
      try{
        const res = await fetch(`${API}/api/notifications/${notificationId}`,{
          method:"DELETE",
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
      toast.success("Notification deleted");
      queryClient.invalidateQueries({queryKey:["notifications"]});
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  })


  const handleDeleteNotications = () => {
    deleteNotifications();
    alert("All notifications deleted");
  };
  const deleteNotification = (notificationId)=>{
    if(isDeletingId) return;
    deleteNotificationId(notificationId);
    
  }

  return (
    <>
      <div className="border-r border-l border-primary text-secondary min-h-screen">
        <div className="flex justify-between items-center border-b border-primary p-8 font-bold text-2xl">
          <h1>Notifications</h1>
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="m-1">
              <CiSettings className="w-10" />
            </div>
            <ul
              tabIndex={0}
              className="text-secondary dropdown-content z-[1] menu bg-primary rounded w-50 sm:right-6 right-0"
            >
              <li className="cursor-pointer ">
                <a onClick={handleDeleteNotications}>
                  Delete all notifications
                </a>
              </li>
            </ul>
          </div>
        </div>
        {notificationsLoading && (
          <div className="flex text-3xl flex-col justify-center h-screen items-center">
            Loading...
            <span>
              <LoadingSpinner />
            </span>
          </div>
        )}
        {!notificationsLoading && !notifications && (<p>No notifications found.</p>)}
        {!notificationsLoading &&
          notifications?.map((notification) => (
            <div key={notification._id}>
              <div className="gap-2 border-b border-primary p-8 font-bold text-2xl">
                <div className="flex gap-2 items-center">
                  {notification.type === "follow" && <FaUser color="purple" />}
                  {notification.type === "like" && <FaHeart color="red" />}
                  <Link to={`/profile/${notification?.from.username}` }>
                    <img
                      src={notification?.from.profileImg || "/avatar-placeholder.png"}
                      alt="ProfileImage"
                      className="h-10 w-10 rounded-full"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xl p-2">
                    <Link
                      to={`/profile/${notification.from.username}`}
                      className="text-primary"
                    >
                      @{notification.from.username}
                    </Link>{" "}
                    {notification.type === "follow"
                      ? "followed you."
                      : "liked your post."}
                  </h1>
                  <FaTrash  onClick={()=>{deleteNotification(notification._id)}} className="cursor-pointer text-primary text-sm"/>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default NotificationPage;
