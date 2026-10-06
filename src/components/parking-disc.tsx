import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { timeLabelToDegrees } from "@/lib/blue-zone/time";

type Size = "hero" | "tile";

/** Point on the disc: 0° is 12 o'clock, clockwise. Radius is % of the disc. */
function polar(radiusPct: number, degFromTop: number) {
  const rad = ((degFromTop - 90) * Math.PI) / 180;
  return {
    left: `${50 + radiusPct * Math.cos(rad)}%`,
    top: `${50 + radiusPct * Math.sin(rad)}%`,
  };
}

export function ParkingDisc({
  timeLabel,
  animate = true,
  size = "hero",
  className,
}: {
  timeLabel: string | null;
  animate?: boolean;
  size?: Size;
  className?: string;
}) {
  const target = timeLabelToDegrees(timeLabel);
  const [angle, setAngle] = useState(animate ? 0 : target);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!animate || reduced) {
      setAngle(target);
      setSpinning(false);
      return;
    }

    setAngle(0);
    setSpinning(true);
    const id = window.setTimeout(() => setAngle(target), 80);
    const done = window.setTimeout(() => setSpinning(false), 1600);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(done);
    };
  }, [animate, target, timeLabel]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const ticks = Array.from({ length: 48 }, (_, i) => i);
  const dim = size === "hero" ? "h-60 w-60" : "h-16 w-16";

  return (
    <div
      className={cn("bz-disc relative shrink-0", dim, className)}
      role="img"
      aria-label={timeLabel ? `Parking disc set to ${timeLabel}` : "Parking disc"}
    >
      <div className="bz-disc-body absolute inset-0 rounded-full" />

      {size === "hero" &&
        ticks.map((i) => {
          const major = i % 2 === 0;
          return (
            <span
              key={`t-${i}`}
              className={cn(
                "bz-disc-tick absolute",
                major ? "h-2.5 w-0.5 bg-white/85" : "h-1.5 w-px bg-white/40",
              )}
              style={{
                ...polar(46.5, i * 7.5),
                transform: `translate(-50%, -50%) rotate(${i * 7.5}deg)`,
              }}
            />
          );
        })}

      {size === "hero" &&
        hours.map((h) => (
          <span
            key={h}
            className="bz-disc-hour absolute w-4 text-center text-[9px] leading-none tabular-nums"
            style={{
              ...polar(39.5, h * 15),
              transform: "translate(-50%, -50%)",
            }}
          >
            {String(h).padStart(2, "0")}
          </span>
        ))}

      <div
        className={cn(
          "bz-disc-wheel absolute left-1/2 top-1/2 rounded-full",
          size === "hero" ? "h-[68%] w-[68%]" : "h-[70%] w-[70%]",
          spinning && "bz-disc-spinning",
        )}
        style={{
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        }}
      >
        <span className="bz-disc-pointer" />
        <span className="bz-disc-window" />
      </div>

      <div className="bz-disc-hub absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full">
        {size === "hero" ? (
          <>
            <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Set to
            </span>
            <span className="font-sans text-3xl font-extrabold leading-none tracking-tight text-slate-900 tabular-nums">
              {timeLabel ?? "—"}
            </span>
          </>
        ) : (
          <span className="text-[8px] font-bold text-slate-800 tabular-nums">{timeLabel ?? "—"}</span>
        )}
      </div>
    </div>
  );
}
