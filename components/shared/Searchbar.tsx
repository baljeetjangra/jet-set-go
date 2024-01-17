import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Searchbar = () => {
  return (
    <div className="flex gap-4">
      <Input
        type="text"
        placeholder="Where are you going?"
        className="w-[350px] rounded-full"
        disabled
      />
      <Button disabled className="rounded-full">
        Search
      </Button>
    </div>
  );
};

export default Searchbar;
