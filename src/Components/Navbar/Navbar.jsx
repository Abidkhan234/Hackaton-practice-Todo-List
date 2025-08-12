import { NavLink } from "react-router";
import Button from "../UI/Button";
import useAuth from "../../../Context/AuthContext";
import useUIContext from "../../../Context/UIContext";
import { motion, AnimatePresence } from "motion/react";

const btns = [
  {
    text: "Sign In",
    path: "login",
  },
  {
    text: "Sign Up",
    path: "register",
  },
];
const Navbar = () => {
  const { handleAuthStateCleanUp, handleLogout } = useAuth();
  const { loginUserData, isModalOpen, setIsModalOpen } = useUIContext();

  return (
    <nav className="flex justify-between items-center py-2 sm:px-5 px-3">
      <div className="">
        <NavLink to={"/"}>
          <h1 className="font-bold text-3xl">Todo-app</h1>
        </NavLink>
      </div>
      <div className="flex sm:gap-5 gap-3 items-center">
        {loginUserData?.email ? (
          <>
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className={`w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full cursor-pointer select-none`}
              >
                {loginUserData?.email?.charAt(0).toUpperCase()}
              </button>

              {/* Animated Modal */}
              <AnimatePresence>
                {isModalOpen && (
                  <motion.div
                    key="modal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl p-4 w-40"
                  >
                    <button
                      onClick={() => handleLogout()}
                      className="w-full bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          btns.map((v, i) => (
            <NavLink
              to={v.path}
              className={({ isActive }) =>
                `sm:w-[100px] w-[80px] ${
                  isActive ? "bg-red-500 rounded-full text-white" : ""
                }`
              }
              key={i}
              onClick={() => handleAuthStateCleanUp()}
            >
              <>
                <Button btnText={v.text} isRounded={true} />
              </>
            </NavLink>
          ))
        )}
      </div>
    </nav>
  );
};

export default Navbar;
