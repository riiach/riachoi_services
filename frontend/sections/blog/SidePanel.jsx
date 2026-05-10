"use client"

import React from "react";
import NameCard from "../../components/card/NameCard"
import TagsCard from "../../components/card/TagsCard";
import SignUpCard from "../../components/card/SignUpCard";
import ListCard from "../../components/card/ListCard";

const SidePanel = ({ posts }) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-start h-full">
      <NameCard />
      <ListCard posts={posts} />
      <TagsCard posts={posts} />

      <div className="sticky top-6 w-full self-start">
        <SignUpCard />
      </div>
    </div>
  );
};
export default SidePanel;
