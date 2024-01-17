import React from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { HiHome } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav
      className={
        "bg-gray-200 h-screen fixed p-4 w-56 hidden md:flex md:flex-col"
      }
    >
      <Logo />

      <ul className="mt-8">
        <NavItem title="Home" href="/" iconComponent={<HiHome />} />
      </ul>
    </nav>
  );
};

export default Navbar;
