import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { router } from "@/route/Router.tsx";
import type { RootState } from "@/store/Store";

function App() {
  const fontSize = useSelector((state: RootState) => state.fontSize.level);
  const isDark = useSelector((state: RootState) => state.darkMode.enabled);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("font-size--small", "font-size--medium", "font-size--large");
    html.classList.add(`font-size--${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark-mode");
    } else {
      html.classList.remove("dark-mode");
    }
  }, [isDark]);

  return <RouterProvider router={router} />;
}

export default App;
