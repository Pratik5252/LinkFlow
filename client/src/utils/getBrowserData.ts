import type { Visit } from "@/types/visits";

export function getBrowserPieData(visits: Visit[]) {
  const browserMap: Record<
    string,
    { browser: string; visitors: number; fill: string }
  > = {
    chrome: { browser: "chrome", visitors: 0, fill: "var(--chart-chrome)" },
    safari: { browser: "safari", visitors: 0, fill: "var(--chart-safari)" },
    firefox: { browser: "firefox", visitors: 0, fill: "var(--chart-firefox)" },
    edge: { browser: "edge", visitors: 0, fill: "var(--chart-edge)" },
    other: { browser: "other", visitors: 0, fill: "var(--chart-other)" },
  };

  visits.forEach((visit) => {
    const b = visit.browser.toLowerCase();
    if (b.includes("chrome")) browserMap.chrome.visitors += 1;
    else if (b.includes("safari")) browserMap.safari.visitors += 1;
    else if (b.includes("firefox")) browserMap.firefox.visitors += 1;
    else if (b.includes("edge")) browserMap.edge.visitors += 1;
    else browserMap.other.visitors += 1;
  });

  return Object.values(browserMap);
}
