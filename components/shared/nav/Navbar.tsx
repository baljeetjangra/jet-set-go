import React from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { UI } from "@/enums";
import clsx from "clsx";
import { HiHome } from "react-icons/hi";

const Navbar = () => {
  const sidebarWidth = UI.SIDEBAR_WIDTH;
  const sidebarClasses = clsx("bg-gray-200 h-screen fixed p-4 ", {
    [`w-${sidebarWidth}`]: sidebarWidth,
  });
  return (
    <nav className={sidebarClasses}>
      <Logo />

      <ul className="mt-8  ">
        <NavItem title="Home" href="/" iconComponent={<HiHome />} />
      </ul>
    </nav>
  );
};

export default Navbar;
