"use client";

import React, { useMemo } from "react";

export default function ShootingStars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        top: Math.random() * 90,
        left: Math.random() * 90,
        delay: Math.random() * 7,
        duration: 5 + Math.random() * 3,
        width: 160 + Math.random() * 120,
      })),
    []
  );

  return (
    <div className="shooting-stars-bg" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            "--star-width": `${star.width}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}