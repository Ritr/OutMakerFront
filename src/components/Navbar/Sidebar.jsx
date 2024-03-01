import React, { useState  } from "react";
import { useNavigate } from 'react-router-dom';

import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = (data, isRegistering = false) => {
    let tempErrors = {};
    if (!data.user_email) tempErrors.user_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.user_email))
      tempErrors.user_email = "Email is not valid";
    if (!data.user_password) tempErrors.user_password = "Password is required";

    if (isRegistering) {
      if (!data.user_firstname)
        tempErrors.user_firstname = "First Name is required";
      if (!data.user_lastname)
        tempErrors.user_lastname = "Last Name is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      user_email: formData.get("login-email"),
      user_password: formData.get("login-password"),
    };

    if (!validate(data)) return;

    try {
      const response = await fetch(
        "https://theoutmaker.com/public/api/user/auth",
        // "http://127.0.0.1:8000/api/user/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok && result.Success) {
        // const { User_Id, csrf_token } = result;
        const { user_id } = result.User;
        localStorage.setItem("User_Id", user_id);
        localStorage.setItem("User", JSON.stringify(result.User));
        // localStorage.setItem("csrf_token", csrf_token);
        toggleSidebar();
        toast.success("Login successful!", "success");
        // Handle successful login, e.g., redirect or update app state
      } else {
        toast.error("Login failed. Please check your credentials.", "error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred during login.", "error");
    }
  };

  const handleRegistration = async (event) => {
    console.log("handleRegistration");
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      user_firstname: formData.get("register-first-name"),
      user_lastname: formData.get("register-last-name"),
      user_email: formData.get("register-email"),
      user_password: formData.get("register-password"),
      user_repassword: formData.get("register-password"),
      user_name:
        formData.get("register-first-name") +
        formData.get("register-last-name"),
    };
    console.log(data);
    if (!validate(data, true)) {
      toast.error("Validation failed", errors);
      return;
    }

    try {
      
      const response = await fetch(
        "https://theoutmaker.com/public/api/user/store",
        // "http://127.0.0.1:8000/api/user/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // 打印出完整的响应对象以供调试
      console.log("Response: ", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // 打印出服务器返回的具体结果
      console.log("Result from server: ", result);

      if (result && result.Success === 1) {
        toast.success(
          "Registration successful! You can now log in.",
          "success"
        );
        login({user_email:data.user_email,user_password:data.user_password});

      } else {
        // 如果有具体的错误信息则显示出来
        const errorMessage =
          result.Message || "Registration failed. Please try again.";
        toast.error(errorMessage, "error");
      }
    } catch (error) {
      console.error("Error registering:", error);

      // 显示更多关于异常的信息
      toast.error(
        `An error occurred during registration: ${error.message}`,
        "error"
      );
    }
  };
  const login = async (loginData)=>{
    try {
      
      const response = await fetch(
        "https://theoutmaker.com/public/api/user/auth",
        // "http://127.0.0.1:8000/api/user/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const result = await response.json();
      if (response.ok && result.Success) {
        // const { User_Id, csrf_token } = result;
        const { user_id } = result.User;
        localStorage.setItem("User_Id", user_id);
        localStorage.setItem("User", JSON.stringify(result.User));
        // localStorage.setItem("csrf_token", csrf_token);
        toggleSidebar();
        toast.success("Login successful!", "success");
        navigate("/Account", { replace: true });
        // Handle successful login, e.g., redirect or update app state
      } else {
        toast.error(
          "Login failed. Please check your credentials.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred during login.", "error");
    }
  }
  const switchForm = () => {
    setIsLoginForm(!isLoginForm);
    setErrors({});
  };

  return (
    <div
      style={{
        zIndex: 100,
      }}
      className={`fixed inset-y-0 right-0 w-80 bg-base-100 shadow-xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-5">
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-circle absolute top-5 right-5"
        >
          <FaTimes />
        </button>

        {isLoginForm ? (
          // Login Form
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="login-email"
                  name="login-email"
                  className="input input-bordered w-full"
                />
                {errors.user_email && (
                  <p className="text-red-500">{errors.user_email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="login-password"
                  className="input input-bordered w-full"
                />
                {errors.user_password && (
                  <p className="text-red-500">{errors.user_password}</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-full mt-4">
                Sign In
              </button>
            </form>
            <button
              onClick={switchForm}
              className="text-sm underline mt-4 block text-center"
            >
              Need an account? Register
            </button>
          </div>
        ) : (
          // Registration Form
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleRegistration} className="space-y-6">
              <div>
                <label
                  htmlFor="register-first-name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="register-first-name"
                  name="register-first-name"
                  className="input input-bordered w-full"
                />
                {errors.user_firstname && (
                  <p className="text-red-500">{errors.user_firstname}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="register-last-name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="register-last-name"
                  name="register-last-name"
                  className="input input-bordered w-full"
                />
                {errors.user_lastname && (
                  <p className="text-red-500">{errors.user_lastname}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="register-email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  id="register-email"
                  name="register-email"
                  className="input input-bordered w-full"
                />
                {errors.user_email && (
                  <p className="text-red-500">{errors.user_email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="register-password"
                  className="input input-bordered w-full"
                />
                {errors.user_password && (
                  <p className="text-red-500">{errors.user_password}</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Register
              </button>
            </form>
            <button
              onClick={switchForm}
              className="text-sm underline mt-4 block text-center"
            >
              Already have an account? Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
