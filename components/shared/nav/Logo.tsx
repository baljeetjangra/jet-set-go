import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex justify-center">
      <Image
        className="my-4"
        src={"/logo.png"}
        width={100}
        height={50}
        alt="company logo"
      />
    </Link>
  );
};

export default Logo;
