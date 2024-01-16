import Link from "next/link";
import React from "react";

const NavItem = ({
  title,
  href,
  iconComponent,
}: {
  title: string;
  href: string;
  iconComponent: React.ReactNode;
}) => {
  return (
    <li
      className={`font-bold flex items-center space-x-2 bg-white px-2 rounded-xl`}
    >
      {iconComponent} <Link href={href}>{title}</Link>
    </li>
  );
};

export default NavItem;
