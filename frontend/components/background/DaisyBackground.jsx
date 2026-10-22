"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DepthDirectionToggle from "../ui/DepthDirectionToggle";

const BACKGROUND = "/Plastic%20Daisy%20BG.png";
const DEPTH_MAP = "/Plastic%20Daisy%20BG%20DepthMap.png";

export default function DaisyBackground() {
  const hostRef = useRef(null);
  const directionRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let dispose = () => {};

    function sync() {
      dispose();
      directionRef.current = 0;
      setReady(false);
      if (!media.matches) return;

      let cancelled = false;
      let app;
      let observer;
      let filter;
      let initialized = false;
      const cleanupInstance = () => {
        cancelled = true;
        observer?.disconnect();
        if (initialized) {
          app.destroy(true, { children: true });
          filter?.destroy();
          initialized = false;
        }
      };
      dispose = cleanupInstance;

      async function start() {
        const { Application, Assets, Sprite, DisplacementFilter } = await import("pixi.js");
        if (cancelled) return;
        const [texture, depthTexture] = await Promise.all([
          Assets.load(BACKGROUND), Assets.load(DEPTH_MAP),
        ]);
        if (cancelled) return;
        const host = hostRef.current;
        app = new Application();
        await app.init({
          width: host.clientWidth, height: host.clientHeight,
          preference: "webgl", backgroundAlpha: 0,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: true, autoStart: false,
        });
        initialized = true;
        if (cancelled) {
          cleanupInstance();
          return;
        }

        const photo = new Sprite(texture);
        const depth = new Sprite(depthTexture);
        photo.anchor.set(0.5);
        depth.anchor.set(0.5);
        app.stage.addChild(photo, depth);
        filter = new DisplacementFilter({ sprite: depth, scale: { x: 0, y: 0 } });
        photo.filters = [filter];

        const resize = () => {
          const width = host.clientWidth;
          const height = host.clientHeight;
          app.renderer.resize(width, height);
          // Match normalized image coordinates despite different source aspect ratios.
          // Overscan keeps displaced edges outside the visible canvas.
          const scale = Math.max(width / texture.width, height / texture.height) * 1.08;
          photo.width = texture.width * scale;
          photo.height = texture.height * scale;
          depth.width = photo.width;
          depth.height = photo.height;
          photo.position.set(width / 2, height / 2);
          depth.position.copyFrom(photo.position);
          app.render();
        };
        resize();
        observer = new ResizeObserver(resize);
        observer.observe(host);
        host.appendChild(app.canvas);
        app.canvas.style.width = "100%";
        app.canvas.style.height = "100%";
        let current = 0;
        let velocity = 0;
        app.ticker.add((ticker) => {
          const target = directionRef.current;
          // Damped spring: return past center slightly, then settle.
          const dt = Math.min(ticker.deltaMS / 1000, 1 / 30);
          velocity += ((target - current) * 180 - velocity * 17) * dt;
          current += velocity * dt;
          if (Math.abs(target - current) < 0.001 && Math.abs(velocity) < 0.01) {
            current = target;
            velocity = 0;
          }
          filter.scale.x = current * Math.min(36, app.screen.width * 0.025);
          if (current === target && velocity === 0) app.stop();
        });
        // Restart rendering only for a direction change; idle backgrounds use no ticker.
        host.addEventListener("depth-direction-change", wake);
        function wake() { app.start(); }
        const cleanup = dispose;
        dispose = () => {
          host.removeEventListener("depth-direction-change", wake);
          cleanup();
        };
        app.start();
        setReady(true);
      }

      start().catch((error) => {
        if (cancelled) return;
        console.warn("Daisy depth effect unavailable; using static background.", error);
        dispose();
        setReady(false);
      });
    }

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      dispose();
    };
  }, []);

  function changeDirection(value) {
    directionRef.current = value;
    hostRef.current?.dispatchEvent(new Event("depth-direction-change"));
  }

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 scale-105 bg-[#a5c2d5] blur-md md:hidden" style={{ backgroundImage: `url('${BACKGROUND}')`, backgroundSize: "100% 800%", backgroundPosition: "center top" }} />
        <div className="absolute inset-x-0 bottom-0 h-168 max-h-1/2 md:hidden" style={{ maskImage: "linear-gradient(to bottom, transparent, black 25%)" }}>
          <Image src={BACKGROUND} alt="" fill sizes="100vw" className="object-cover object-bottom" />
        </div>
        <Image src={BACKGROUND} alt="" fill priority sizes="100vw" className="hidden object-cover object-center md:block" />
        <div ref={hostRef} className="absolute inset-0 hidden md:block" />
      </div>
      {ready && (
        <div className="absolute top-6 right-6 z-30 hidden md:block">
          <DepthDirectionToggle onDirectionChange={changeDirection} />
        </div>
      )}
    </>
  );
}
