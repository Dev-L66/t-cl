import { useState } from "react";

const EditProfileModal = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    currentPassword: "",
    password: "",
    link: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate=(e)=>{
   e.prevenDefault();
  }
  return (
    <div>
      <button
        className="btn btn-primary text-secondary rounded"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Edit Profile
      </button>
      <dialog id="my_modal_3" className="modal p-5 ">
        <div className="modal-box p-5 border border-primary rounded text-secondary ">
          <h1 className="text-2xl text-secondary">Update Profile</h1>
          <form method="dialog" onSubmit={handleUpdate}>
            <div className="flex flex-col gap-5 p-5 ">
                <div className="flex gap-2 justify-between items-center  ">
            <input
              placeholder="Full Name"
              value={user.fullName}
              name="fullName"
              onChange={handleChangeInput}
              className="focus:outline-none"
            />
            <input
              placeholder="Username"
              value={user.username}
              name="username"
              onChange={handleChangeInput}
              className="focus:outline-none"
            />
            </div>
            <div className="flex gap-2 justify-between items-center ">
            <input
              placeholder="Email"
              value={user.email}
              name="email"
              onChange={handleChangeInput}
              className="focus:outline-none"
            />
            <input
              placeholder="Bio"
              value={user.bio}
              name="bio"
              onChange={handleChangeInput}
              className="focus:outline-none"
            />
            </div>
            <div className="flex gap-2 justify-between items-center ">
            <input
              placeholder="Current Password"
              value={user.currentPassword}
              name="currentPassword"
              onChange={handleChangeInput}
              className="focus:outline-none"
            />
            <input
              placeholder="Password"
              value={user.password}
              name="password"
              onChange={handleChangeInput}
              className="focus:outline-none"

            />
            </div>
            <div className="flex gap-2 justify-between ">
            <input
              placeholder="Link"
              value={user.link}
              name="link"
              onChange={handleChangeInput}
              className="focus:outline-none w-full" 
            />
            </div>
            </div>
            
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <button className="btn btn-primary rounded-full" type="submit">Update</button>
            </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditProfileModal;
