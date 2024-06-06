import { LOGO } from "@/common";
import { Link } from "react-router-dom";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { LayoutNav } from "../nav";

export function LayoutHeader() {
  return (
    <header className="w-full z-20 bg-meeseeksBlue sticky top-0 text-white py-4 shadow-lg w-phone:relative">
      <div className="px-14 w-full flex items-center justify-between w-phone:flex-col w-phone:gap-3">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 p-0.5 bg-white rounded-full flex justify-center items-center">
            <img
              src={LOGO}
              alt="Rick and Morty Logo"
              className="w-full h-full"
            />
          </div>
          <Link to={"/"}>
            <span className="text-2xl font-bold">Rick and Morty</span>
          </Link>
        </div>
        <LayoutNav />
        <ColorSchemeToggle />
      </div>
    </header>
  );
}
