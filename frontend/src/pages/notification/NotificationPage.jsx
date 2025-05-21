import { useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { CiSettings } from "react-icons/ci";
import { FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router";
const NotificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notifications = [
    {
      _id: "1",
      from: {
        _id: "1",
        username: "johndoe",
        profileImg: "/avatars/boy2.png",
      },
      type: "follow",
    },
    {
      _id: "2",
      from: {
        _id: "2",
        username: "janedoe",
        profileImg: "/avatars/girl1.png",
      },
      type: "like",
    },
  ];
  const handleDeleteNotications = () => {
    alert("All notifications deleted");
  };
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
        {isLoading && (
          <div className="flex text-3xl flex-col justify-center h-screen items-center">
            Loading...
            <span>
              <LoadingSpinner />
            </span>
          </div>
        )}
        {notifications.length === 0 && <p>No notifications found.</p>}
        {!isLoading &&
          notifications?.map((notification) => (
            <div key={notification._id}>
              <div className="gap-2 border-b border-primary p-8 font-bold text-2xl">
                <div className="flex gap-2 items-center">
                  {notification.type === "follow" && <FaUser color="purple" />}
                  {notification.type === "like" && <FaHeart color="red" />}
                  <Link to={`/profile/${notification.from.username}`}>
                    <img
                      src={notification.from.profileImg}
                      alt="ProfileImage"
                      className="h-10 w-10"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div>
                  <h1>
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
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default NotificationPage;
