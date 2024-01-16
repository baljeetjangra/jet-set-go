import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <Image
        className="my-4"
        src={"/logo.png"}
        width={100}
        height={50}
        alt="company logo"
      />
    </div>
  );
};

export default Logo;
