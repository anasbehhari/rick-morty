import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layouts";
import CharacterPage from "./pages/Character.page";
import { HomePage } from "./pages/Home.page";
import FavouritePage from "./pages/Favourite.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout className="font-Fira" />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/character/:id",
        element: <CharacterPage />,
      },
      {
        path: "/favourite",
        element: <FavouritePage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}
