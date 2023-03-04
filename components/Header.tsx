import { SearchIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  // I like the naming of the function that he used
  const handleScroll = () => setIsScrolled(window.scrollY > 0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        {/* no usamos Image de Next porque es un svg y tendriamos que configurar el setting allowDangerouslySVG al usarlo en una Image,con html puro no */}
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="h-6 w-6 hidden sm:inline "></SearchIcon>
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
          <img 
          onClick={logout}
          src="https://rb.gy/g1pwyx" alt="" className="cursor-pointer rounded" />
      </div>
    </header>
  );
};
export default Header;
