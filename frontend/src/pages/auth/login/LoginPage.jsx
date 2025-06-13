import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Logo from "../../../components/svgs/Logo";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { API } from "../../../utils/index.js";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate:loginMutation, isPending, isError, error } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch(`${API}/api/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Something went wrong");
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Logged in successfully!");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (data) => {
      toast.error(data.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-between items-center   container p-5">
      <div className="hidden md:w-[50%]   md:flex justify-center items-center h-screen p-3">
        <Logo width="500" height="700" />
      </div>
      <div className="flex justify-center items-center w-full md:w-[50%]  p-3">
        <div>
          <h1 className="text-6xl font-bold p-3 fontColor">Join today.</h1>
          <form onSubmit={handleFormSubmit}>
            <div>
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
                  disabled={isPending}
                >
                  {isPending ? <LoadingSpinner /> : "Login"}
                </button>
              </div>
              <div>
                <h2 className="font-bold">Already have an account?</h2>
                <Link
                  to="/signup"
                  className="w-full btn bg-none border-primary rounded-xl fontColor"
                  type="submit"
                >
                  Signup
                </Link>
              </div>
            </div>
            {isError && <p className="text-red-500">{error.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
