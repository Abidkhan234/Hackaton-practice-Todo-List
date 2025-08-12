import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../src/Utils/localStorageHelper.js";
import axios from "axios";

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
    return Date.now() >= payload.exp * 1000; // exp in seconds → convert to ms
  } catch (error) {
    return true; // Invalid token
  }
};

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1])); // JWT payload as object
  } catch {
    return null;
  }
};

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [loginUserData, setLoginUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateAndRefreshToken = useCallback(async () => {
    setIsModalOpen(false);
    const accessToken = getFromLocalStorage("accessToken");
    const refreshToken = getFromLocalStorage("refreshToken");

    if (!accessToken || !refreshToken) {
      return null;
    }

    if (!isTokenExpired(accessToken)) {
      return decodeToken(accessToken);
    }

    if (!isTokenExpired(refreshToken)) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/user/refreshAccessToken`,
          { refreshToken }
        );

        const newAccessToken = response.data.accessToken;

        const decodedAccess = decodeToken(newAccessToken);

        saveToLocalStorage("accessToken", newAccessToken);
        return decodedAccess;
      } catch (error) {
        console.error("Refresh token API failed:", error);
        clearLocalStorage();
        return null;
      }
    }

    clearLocalStorage();
    return null;
  }, []);

  const validateUserLogin = useCallback(async () => {
    const userData = await validateAndRefreshToken();

    if (!userData) {
      setLoginUserData({});
      return;
    }

    setLoginUserData({
      email: userData?.email || "",
    });
  }, [validateAndRefreshToken]); // ✅ depends only on this

  useEffect(() => {
    validateUserLogin();
  }, [validateUserLogin]); // ✅ properly listens to changes

  const memorizedUIContext = useMemo(
    () => ({
      loginUserData,
      setLoginUserData,
      isModalOpen,
      setIsModalOpen,
      validateUserLogin,
    }),
    [loginUserData, isModalOpen] // ✅ only values, not functions
  );

  return (
    <UIContext.Provider value={memorizedUIContext}>
      {children}
    </UIContext.Provider>
  );
};

const useUIContext = () => useContext(UIContext);

export default useUIContext;
