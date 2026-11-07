import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { router } from "@/route/Router.tsx";
import type { RootState } from "@/store/Store";

function App() {
  const fontSize = useSelector((state: RootState) => state.fontSize.level);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("font-size--small", "font-size--medium", "font-size--large");
    html.classList.add(`font-size--${fontSize}`);
  }, [fontSize]);

  return <RouterProvider router={router} />;
}

export default App;
