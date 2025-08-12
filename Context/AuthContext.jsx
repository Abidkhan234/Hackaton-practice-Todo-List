import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  clearLocalStorage,
  saveToLocalStorage,
} from "../src/Utils/localStorageHelper";
import useUIContext from "./UIContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // States
  const [userNameValue, setUserNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const { validateUserLogin } = useUIContext();
  // States

  const navigate = useNavigate();

  const handleAuthStateCleanUp = () => {
    setEmailValue("");
    setPasswordValue("");
    setUserNameValue("");
    setTogglePassword(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userNameValue) {
      return alert("User Name is required");
    } else if (!emailValue) {
      return alert("Email is required");
    } else if (!emailRegex.test(emailValue)) {
      return alert("Incorrect email format");
    } else if (!passwordValue) {
      return alert("Password is required");
    } else {
      try {
        await toast.promise(
          axios.post(`${import.meta.env.VITE_URL}/user/register`, {
            userName: userNameValue,
            email: emailValue,
            password: passwordValue,
          }),
          {
            loading: "Signing up...",
            success: (res) => res.data.message,
            error: (err) => err.response?.data?.message || "Sign Up Failed",
          }
        );

        handleAuthStateCleanUp();

        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
      return alert("Email is required");
    } else if (!emailRegex.test(emailValue)) {
      return alert("Incorrect email format");
    } else if (!passwordValue) {
      return alert("Password is required");
    } else {
      try {
        await toast.promise(
          axios.post(`${import.meta.env.VITE_URL}/user/login`, {
            email: emailValue,
            password: passwordValue,
          }),
          {
            loading: "Signing In...",
            success: ({ data }) => {
              saveToLocalStorage("accessToken", data.accessToken);
              saveToLocalStorage("refreshToken", data.refreshToken);
              return data.message;
            },
            error: (err) => err.response?.data?.message || "Login Failed",
          }
        );

        handleAuthStateCleanUp();

        validateUserLogin();

        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogout = () => {
    clearLocalStorage();
    validateUserLogin();
  };

  return (
    <AuthContext.Provider
      value={{
        userNameValue,
        emailValue,
        passwordValue,
        setUserNameValue,
        setEmailValue,
        setPasswordValue,
        togglePassword,
        setTogglePassword,
        handleLogin,
        handleLogout,
        handleRegister,
        handleAuthStateCleanUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
