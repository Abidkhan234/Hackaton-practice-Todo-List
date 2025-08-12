import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "../Context/AuthContext.jsx";
import { UIProvider } from "../Context/UIContext.jsx";
import { TodoProvider } from "../Context/TodoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>
          <TodoProvider>
            <App />
          </TodoProvider>
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  </StrictMode>
);
