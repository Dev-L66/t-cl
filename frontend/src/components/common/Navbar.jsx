import Logo from "../svgs/Logo";
import { FaBell, FaHome, FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from "react-router";

const Navbar = () => {
  const data = {
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "/avatars/boy1.png",
  };
  return (
    <>
      <div className="drawer sticky top-0 z-100">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn bg-black border-0 drawer-button">
            <IoIosMenu className="text-3xl text-primary" /> 
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu flex flex-col items-center bg-primary min-h-full w-40 ">
            <div className={`flex justify-start p-5`}>
              <Logo height="100" width="100" />
            </div>
            <div className="text-xl text-secondary flex flex-col gap-5 items-center pb-10 w-full h-fit">
              <NavLink to={`/profile/${data?.username}`}>
                <div className={`flex gap-2 items-center`}>
                  <FaHome className="text-xl" /> <p>Home</p>
                </div>
              </NavLink>
              <NavLink to={`/`}>
                <div className={`flex gap-2 items-center`}>
                  <FaBell className="text-lg" /> <p>Notification</p>
                </div>
              </NavLink>
              <NavLink to={`/notifications`}>
                <div className={`flex gap-2 items-center`}>
                  <FaUser className="text-lg" /> <p>Profile</p>
                </div>
              </NavLink>
            </div>
            <div className="flex gap-2 mb-2 absolute bottom-15 rounded-full bg-[#3a0738] p-2">
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
            <div className="flex justify-center items-center gap-2 mt-5 absolute bottom-5 " >
              Logout{" "}
              <span className="">
                <CiLogout className="font-bold text-2xl" />
              </span>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
