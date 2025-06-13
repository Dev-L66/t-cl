import { useEffect, useState } from "react";
import useUpdateProfile from "../../hooks/useUpdateProfile";



const EditProfileModal = ({ authUser}) => {
  
 
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    link: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (authUser) {
      setUser({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  await updateProfile(user);
  document.getElementById("edit_profile_modal").close();
};

  return (
    <div>
      <button
        className="btn btn-primary text-secondary rounded-full btn-sm"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>

      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box p-5 border border-primary rounded text-secondary ">
          <h1 className="text-2xl text-secondary">Update Profile</h1>

          <form
            onSubmit={handleSubmit}
          >
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
                  placeholder="new Password"
                  value={user.newPassword}
                  name="newPassword"
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

            <div className="flex justify-end gap-2">
              <button className="btn btn-primary rounded-full btn-sm text-white">
                {isUpdatingProfile ? "Updating..." : "Update"}
              </button>
              
            </div>
          </form>
<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("edit_profile_modal").close()}>✕</button>        
        </div>
       
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default EditProfileModal;
