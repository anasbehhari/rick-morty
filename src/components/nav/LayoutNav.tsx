import { IconStarFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function LayoutNav() {
  return (
    <nav className="flex space-x-4">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <Link to="/favourite" className="hover:underline flex items-center gap-2">
        Favourites <IconStarFilled className="text-yellow-400 size-4" />
      </Link>
    </nav>
  );
}
