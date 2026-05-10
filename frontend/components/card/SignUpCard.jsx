"use client";

import React from "react";
import AnimatedButton from "../ui/AnimatedButton";
import SubscribeOverlay from "../../components/layout/SubscribeOverlay";

const SignUpCard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-6 bg-primary p-8 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <h1 className="text-2xl font-semibold">
        Subscribe to get the latest updates
      </h1>

      <p>Stay connected with the latest posts, projects, tutorials, and tech updates.</p>

      <SubscribeOverlay>
        <AnimatedButton
          type="button"
          text="Subscribe"
          w="w-fit"
        />
      </SubscribeOverlay>
    </div>
  );
};

export default SignUpCard;
