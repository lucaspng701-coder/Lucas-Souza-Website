"use client";

import { useEffect, useRef } from "react";

type Dot = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
};

type Ripple = {
  x: number;
  y: number;
  startedAt: number;
};

const SPACING = 21;
const RADIUS = 190;
const PULL = 1.2;
const RIPPLE_DURATION = 1450;
const RIPPLE_BAND = 82;

export function HeroKineticGrid() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const hero = host?.closest<HTMLElement>(".hero");

    if (!host || !canvas || !hero) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const accent = getComputedStyle(host).getPropertyValue("--acid").trim() || "#ff5a1f";

    let width = 1;
    let height = 1;
    let columnCount = 0;
    let rowCount = 0;
    let dots: Dot[] = [];
    let ripples: Ripple[] = [];
    let frameId = 0;
    let frameRunning = false;
    let heroVisible = true;
    let interactive = !reducedMotionQuery.matches && finePointerQuery.matches;

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const dotAt = (column: number, row: number) => dots[column * rowCount + row];

    const draw = (updatePhysics: boolean) => {
      const now = performance.now();
      const rippleDistance = Math.hypot(width, height) * 0.72;
      let moving = false;

      ripples = ripples.filter(
        (ripple) => now - ripple.startedAt < RIPPLE_DURATION,
      );

      context.clearRect(0, 0, width, height);

      if (updatePhysics) {
        for (const dot of dots) {
          let accelerationX = (dot.homeX - dot.x) * 0.08;
          let accelerationY = (dot.homeY - dot.y) * 0.08;

          if (pointer.active) {
            const deltaX = pointer.x - dot.x;
            const deltaY = pointer.y - dot.y;
            const distance = Math.hypot(deltaX, deltaY);

            if (distance < RADIUS && distance > 0.001) {
              const force = (1 - distance / RADIUS) * PULL;
              accelerationX += (deltaX / distance) * force;
              accelerationY += (deltaY / distance) * force;
            }
          }

          for (const ripple of ripples) {
            const progress = (now - ripple.startedAt) / RIPPLE_DURATION;
            const radius = progress * rippleDistance;
            const deltaX = dot.homeX - ripple.x;
            const deltaY = dot.homeY - ripple.y;
            const distance = Math.hypot(deltaX, deltaY);
            const distanceFromWave = Math.abs(distance - radius);

            if (distanceFromWave < RIPPLE_BAND && distance > 0.001) {
              const wave = 1 - distanceFromWave / RIPPLE_BAND;
              const strength = wave * (1 - progress) * 2.15;
              accelerationX += (deltaX / distance) * strength;
              accelerationY += (deltaY / distance) * strength;
            }
          }

          dot.velocityX = (dot.velocityX + accelerationX) * 0.82;
          dot.velocityY = (dot.velocityY + accelerationY) * 0.82;
          dot.x += dot.velocityX;
          dot.y += dot.velocityY;

          if (
            Math.abs(dot.velocityX) > 0.015 ||
            Math.abs(dot.velocityY) > 0.015 ||
            Math.abs(dot.homeX - dot.x) > 0.03 ||
            Math.abs(dot.homeY - dot.y) > 0.03
          ) {
            moving = true;
          }
        }
      }

      context.beginPath();
      for (let column = 0; column < columnCount; column += 1) {
        for (let row = 0; row < rowCount; row += 1) {
          const dot = dotAt(column, row);
          const right = column + 1 < columnCount ? dotAt(column + 1, row) : null;
          const down = row + 1 < rowCount ? dotAt(column, row + 1) : null;

          if (right) {
            context.moveTo(dot.x, dot.y);
            context.lineTo(right.x, right.y);
          }

          if (down) {
            context.moveTo(dot.x, dot.y);
            context.lineTo(down.x, down.y);
          }
        }
      }
      context.globalAlpha = 0.34;
      context.strokeStyle = "rgba(242, 240, 234, 0.075)";
      context.lineWidth = 0.65;
      context.stroke();

      context.beginPath();
      for (const dot of dots) {
        context.moveTo(dot.x + 0.75, dot.y);
        context.arc(dot.x, dot.y, 0.75, 0, Math.PI * 2);
      }
      context.globalAlpha = 0.28;
      context.fillStyle = "#f2f0ea";
      context.fill();

      if (pointer.active) {
        for (const dot of dots) {
          const distance = Math.hypot(pointer.x - dot.x, pointer.y - dot.y);
          if (distance >= RADIUS) continue;

          const proximity = 1 - distance / RADIUS;
          context.beginPath();
          context.arc(dot.x, dot.y, 0.8 + proximity * 1.8, 0, Math.PI * 2);
          context.globalAlpha = 0.25 + proximity * 0.65;
          context.fillStyle = "#f2f0ea";
          context.fill();
        }
      }

      if (ripples.length > 0) {
        for (const dot of dots) {
          let rippleIntensity = 0;

          for (const ripple of ripples) {
            const progress = (now - ripple.startedAt) / RIPPLE_DURATION;
            const radius = progress * rippleDistance;
            const distance = Math.hypot(dot.homeX - ripple.x, dot.homeY - ripple.y);
            const distanceFromWave = Math.abs(distance - radius);

            if (distanceFromWave < RIPPLE_BAND) {
              const wave = 1 - distanceFromWave / RIPPLE_BAND;
              rippleIntensity = Math.max(rippleIntensity, wave * (1 - progress));
            }
          }

          if (rippleIntensity <= 0) continue;

          context.beginPath();
          context.arc(dot.x, dot.y, 0.9 + rippleIntensity * 2.4, 0, Math.PI * 2);
          context.globalAlpha = 0.18 + rippleIntensity * 0.78;
          context.fillStyle = accent;
          context.fill();
        }
      }

      context.globalAlpha = 1;
      return moving || pointer.active || ripples.length > 0;
    };

    const runFrame = () => {
      frameRunning = false;
      if (!interactive || !heroVisible || document.hidden) return;

      if (draw(true)) {
        frameRunning = true;
        frameId = window.requestAnimationFrame(runFrame);
      }
    };

    const requestFrame = () => {
      if (frameRunning || !interactive || !heroVisible || document.hidden) return;
      frameRunning = true;
      frameId = window.requestAnimationFrame(runFrame);
    };

    const buildGrid = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      columnCount = Math.ceil(width / SPACING) + 1;
      rowCount = Math.ceil(height / SPACING) + 1;
      dots = [];

      for (let column = 0; column < columnCount; column += 1) {
        for (let row = 0; row < rowCount; row += 1) {
          const homeX = column * SPACING;
          const homeY = row * SPACING;
          dots.push({
            homeX,
            homeY,
            x: homeX,
            y: homeY,
            velocityX: 0,
            velocityY: 0,
          });
        }
      }

      draw(false);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!interactive) return;

      const bounds = hero.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
      requestFrame();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      requestFrame();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!interactive) return;

      const bounds = hero.getBoundingClientRect();
      ripples.push({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        startedAt: performance.now(),
      });

      if (ripples.length > 3) ripples.shift();
      requestFrame();
    };

    const handleMotionPreference = () => {
      interactive = !reducedMotionQuery.matches && finePointerQuery.matches;
      pointer.active = false;
      ripples = [];
      window.cancelAnimationFrame(frameId);
      frameRunning = false;

      for (const dot of dots) {
        dot.x = dot.homeX;
        dot.y = dot.homeY;
        dot.velocityX = 0;
        dot.velocityY = 0;
      }

      draw(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        frameRunning = false;
      } else {
        requestFrame();
      }
    };

    const resizeObserver = new ResizeObserver(buildGrid);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        if (!heroVisible) {
          window.cancelAnimationFrame(frameId);
          frameRunning = false;
        } else {
          draw(false);
          requestFrame();
        }
      },
      { threshold: 0.02 },
    );

    buildGrid();
    resizeObserver.observe(host);
    intersectionObserver.observe(hero);
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerdown", handlePointerDown, { passive: true });
    hero.addEventListener("pointerleave", handlePointerLeave);
    reducedMotionQuery.addEventListener("change", handleMotionPreference);
    finePointerQuery.addEventListener("change", handleMotionPreference);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerdown", handlePointerDown);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
      finePointerQuery.removeEventListener("change", handleMotionPreference);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={hostRef} className="hero-kinetic-grid" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
