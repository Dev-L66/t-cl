import { Link } from "react-router";
import Logo from "../svgs/Logo";
import { FaBell, FaHome, FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const hide = isSidebarOpen ? "translate-x-0" : "-translate-x-40";
  const data = {
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "/avatars/boy1.png",
  };
  return (
    <>
      <IoIosMenu
        className="text-secondary md:hidden cursor-pointer text-3xl"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      {/* <div
        className={`transform duration-300 ease-in-out 
        -translate-x-full md:translate-x-0 ${
   isSidebarOpen ? "translate-x-0" : "-translate-x-full"
 }
   md:w-[50%] md:flex 
  mx-auto flex text-secondary justify-center h-screen fontColor`}
      > */}
      <div className="left-0 right-0 md:hidden bottom-0">
        <div className="flex flex-col h-screen">
          <div className={`flex justify-start`}>
            <Logo height="100" width="100" />
          </div>
          <div className="flex flex-col mx-auto gap-10 mt-5">
            <Link to="/">
              <div className={`flex gap-2 items-center`}>
                <FaHome className="text-xl" /> <p>Home</p>
              </div>
            </Link>
            <Link to="/notifications">
              <div className={`flex gap-2 items-center`}>
                <FaBell className="text-lg" /> <p>Notification</p>
              </div>
            </Link>
            <Link to={`/profile/${data?.username}`}>
              <div className={`flex gap-2 items-center`}>
                <FaUser className="text-lg" /> <p>Profile</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={` ${hide} bottom-5 absolute rounded-full   flex justify-center items-center p-2 gap-3`}
      >
        <figure>
          <img
            src={data?.profileImg || "/avatars/boy1.png"}
            className="w-[40px] h-[40px] rounded-full"
          />
        </figure>
        <div className="flex flex-col">
          <p className="text-sm">{data?.fullName}</p>
          <div className="flex gap-2">
            <p className="text-xs text-gray-500">@{data?.username}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        Logout{" "}
        <span>
          <CiLogout className="font-bold text-2xl" />
        </span>
      </div>
    </>
  );
};

export default Sidebar;
