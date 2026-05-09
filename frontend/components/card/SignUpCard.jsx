"use client"

import React from "react";
import AnimatedButton from "../ui/AnimatedButton";

const SignUpCard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-6 bg-primary p-8 rounded-2xl">
      <h1 className="text-2xl font-semibold">
        Sign up to get the latest updates
      </h1>
      <p>This is the inner description of the namecard</p>
      <AnimatedButton
        type="button"
        text="Subscribe"
        w="w-fit"
      />
    </div>
  );
};
export default SignUpCard;
