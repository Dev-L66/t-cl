import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Logo from "../../../components/svgs/Logo";
import { useState } from "react";

const SignupPage = () => {
  const [Login, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  const loginSignupHandler = () => {
    setLogin(!Login);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-around items-center w-[100%] container p-5">
      <div className="hidden md:w-[50%] md:flex justify-center items-center h-screen p-3">
        <Logo width="500" height="700" />
      </div>
      <div className="flex justify-center items-center w-full md:w-[50%] p-3">
        <div>
          <h1 className="text-6xl font-bold p-3 fontColor">
            {Login ? "Login." : "Join today."}
          </h1>
          <form onSubmit={handleFormSubmit}>
            <div>
              {!Login && (
                <div className="p-3">
                  <label className="input validator rounded-xl focus-within:outline-none focus-within:border-primary">
                    <CiMail />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      minLength="3"
                      maxLength="30"
                      title="enter a valid email"
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              )}
              <div className="p-3">
                <label className="input validator rounded-xl focus-within:outline-none focus-within:border-primary">
                  <FaRegUser />
                  <input
                    className="bg-none"
                    type="text"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength="3"
                    maxLength="30"
                    title="Only letters, numbers or dash"
                    value={formData.username}
                    name="username"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              {!Login && (
                <div className="p-3">
                  <label className="input validator rounded-xl focus-within:outline-none focus-within:border-primary">
                    <MdDriveFileRenameOutline />
                    <input
                      className="bg-none"
                      type="text"
                      required
                      placeholder="Full Name"
                      pattern="[A-Za-z0-9\-]{2,}( [A-Za-z0-9\-]{2,})*"
                      minLength="3"
                      maxLength="30"
                      title="Only letters, numbers or dash"
                      value={formData.fullname}
                      name="fullname"
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              )}
              <div className="p-3">
                <label className="input validator rounded-xl focus-within:outline-none focus-within:border-primary">
                  <RiLockPasswordLine />
                  <input
                    className="bg-none"
                    type="password"
                    required
                    placeholder="Password"
                    minLength="3"
                    maxLength="30"
                    value={formData.password}
                    name="password"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <div className="flex justify-center items-center p-3">
                <button
                  className="w-full btn btn-primary rounded-xl fontColor"
                  type="submit"
                >
                  {Login ? "Login" : "Signup"}
                </button>
              </div>
              <div>
                <h2 className="font-bold">
                  {Login
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </h2>
                <button
                  onClick={loginSignupHandler}
                  className="w-full btn bg-none border-primary rounded-xl fontColor"
                  type="submit"
                >
                  {Login ? "Signup" : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
