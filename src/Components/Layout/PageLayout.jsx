import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const PageLayout = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 1000,
          },
          error: {
            duration: 1000,
          },
        }}
      />

      <header>
        <Navbar />
      </header>
      <main className="h-[100vh] max-h-[90vh] w-full flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
