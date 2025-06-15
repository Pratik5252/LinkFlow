import { useMemo, useRef, useState } from "react";
import type { Visit } from "@/types/visits";
import DottedMap from "dotted-map";

interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
}

interface MapProps {
  dots?: MapPoint[];
  dotColor?: string;
  theme?: "light" | "dark";
  visits: Visit[];
}

export default function WorldMap({
  dots = [],
  dotColor,
  theme = "light",
  visits,
}: MapProps) {
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 30, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: theme === "dark" ? "#FFFFFF40" : "#00000040",
      shape: "circle",
      backgroundColor: theme === "dark" ? "black" : "white",
    });
  }, [theme]);

  const svgRef = useRef<SVGSVGElement>(null);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);

  // Use the actual SVG size from DottedMap for correct projection
  const MAP_WIDTH = 810;
  const MAP_HEIGHT = 510;

  const projectPoint = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * MAP_WIDTH;
    const y = ((90 - lat) / 180) * MAP_HEIGHT;
    return { x, y };
  };

  const resolvedDotColor =
    dotColor || (theme === "dark" ? "#38bdf8" : "#2563eb");

  return (
    <div
      className="min-w-[30vw] w-fit max-h-[40vh] h-fit rounded-lg relative font-sans"
      style={{
        background: theme === "dark" ? "black" : "white",
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        alt="world map"
        height={MAP_HEIGHT}
        width={MAP_WIDTH}
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 800 400`}
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
      >
        {dots.slice(0, 100).map((dot, i) => {
          const pt = projectPoint(dot.lat, dot.lng);
          return (
            <g key={`point-${i}`}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="10"
                fill="transparent"
                onMouseEnter={() =>
                  dot.label &&
                  setTooltip({ x: pt.x, y: pt.y, label: dot.label })
                }
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: dot.label ? "pointer" : "default" }}
              />
              <circle cx={pt.x} cy={pt.y} r="3" fill={resolvedDotColor} />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="3"
                fill={resolvedDotColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="10"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 px-2 py-1 rounded bg-black text-white text-xs"
          style={{
            left: `calc(${(tooltip.x / MAP_WIDTH) * 100}% + 12px)`,
            top: `calc(${(tooltip.y / MAP_HEIGHT) * 100}% - 8px)`,
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.label}
        </div>
      )}
    </div>
  );
}
