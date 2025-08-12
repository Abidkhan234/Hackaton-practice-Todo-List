import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import "./App.css";

import { Route, Routes } from "react-router";
import PageLayout from "./Components/Layout/PageLayout";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
