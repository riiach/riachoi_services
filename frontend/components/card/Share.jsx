"use client"

import React from "react";

const Share = () => {
  return (
    <>
      <div className="flex bg-primary w-20 h-auto rounded-2xl px-12 py-4 flex-col items-center justify-center gap-4 shadow-[0_2px_2px_rgba(0,0,0,0.08)]">
        <p className="font-semibold">Share</p>
        <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center p-1 hover:-translate-y-1 transition-all duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="fill-white">
            <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
          </svg>
        </div>
        <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center p-1 hover:-translate-y-1 transition-all duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-white">
            <circle fill="white" cx="4.983" cy="5.009" r="2.188"/>
            <path fill="#ffffff" d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118c1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783c-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"/>
          </svg>
        </div>
        <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center hover:-translate-y-1 transition-all duration-300 ease-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 20"
            className="fill-white"
          >
            <path d="M17.01 7.74c.83 0 1.5.67 1.5 1.5 0 .5-.25.95-.63 1.22.08.34.12.7.12 1.06 0 2.7-2.69 4.89-6 4.89s-6-2.19-6-4.89c0-.36.04-.72.12-1.06a1.5 1.5 0 1 1 1.67-2.44 7.2 7.2 0 0 1 3.72-1.13l.7-3.29 2.47.52a1.25 1.25 0 1 1-.08.4l-2.08-.44-.6 2.82a7.3 7.3 0 0 1 3.29 1.12c.28-.18.62-.28.99-.28ZM9.5 10.75a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm5 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm-5.25 3.1a.35.35 0 0 0-.25.6c.78.78 1.87 1.05 3 1.05s2.22-.27 3-1.05a.35.35 0 0 0-.5-.5c-.57.57-1.45.85-2.5.85s-1.93-.28-2.5-.85a.35.35 0 0 0-.25-.1Z" />
          </svg>
        </div>
        <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center p-1 hover:-translate-y-1 transition-all duration-300 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="fill-white">
            <g fill="#ffffff"><path d="M12.243 3.757a2 2 0 0 0-2.829 0L7.293 5.88L5.879 4.464L8 2.344a4 4 0 0 1 5.657 0l.707.706l-.09.09A4 4 0 0 1 13.658 8l-2.121 2.121l-1.415-1.414l2.122-2.121a2 2 0 0 0 0-2.829Zm-8.486 8.486a2 2 0 0 0 2.829 0l2.121-2.122l1.414 1.415L8 13.655a4 4 0 0 1-5.657 0l-.707-.706l.09-.09A4 4 0 0 1 2.342 8l2.121-2.121L5.88 7.293L3.757 9.414a2 2 0 0 0 0 2.829"/>
              <path d="M10.828 6.586L9.414 5.172L5.172 9.414l1.414 1.414z"/>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};
export default Share;
