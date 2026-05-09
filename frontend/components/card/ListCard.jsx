"use client"

import React from "react";
import Image from "next/image";

const ListCard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-start justfity-center gap-6 p-8 bg-primary rounded-2xl">
      <h1 className="text-2xl font-semibold">
        Popular posts
      </h1>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full h-auto flex flex-row items-center gap-4">
          <div className="relative h-full max-w-1/5 aspect-square overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1768970052519-3560f0f704c7?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="thumbnail"
              fill
              unoptimized
              className="object-cover"
          />
          </div>
          <div className="w-4/5 flex flex-col items-start justify-between gap-4">
            <h1 className="text-lg font-semibold">How to build tasty meals with just a few simple ingridients</h1>
            <p className="font-semibold">Sep 28, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCard;
