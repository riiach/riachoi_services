"use client"

import React from "react";
import NameCard from "../../../components/card/NameCard"
import ListCard from "../../../components/card/ListCard";
import TagsCard from "../../../components/card/TagsCard";
import SignUpCard from "../../../components/card/SignUpCard";

const SidePanel = () => {
  return (
    <div className="w-full md:w-2/4 xl:w-1/3 h-auto flex flex-col gap-6 items-center justify-start">
      <NameCard />
      <ListCard />
      <TagsCard />
      <SignUpCard />
    </div>
  );
};
export default SidePanel;
