"use client"

import React from "react";
import NameCard from "../../components/card/NameCard"
import TagsCard from "../../components/card/TagsCard";
import SignUpCard from "../../components/card/SignUpCard";
import ListCard from "../../components/card/ListCard";

const SidePanel = ({ posts }) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-start min-w-0 md:flex-1 w-full">
      <div className="flex w-full shrink-0 flex-col gap-6">
      <NameCard />
      <ListCard posts={posts} />
      <TagsCard posts={posts} />
      </div>

      <div className="sticky top-24 w-full shrink-0 self-start">
        <SignUpCard />
      </div>
    </div>
  );
};
export default SidePanel;
