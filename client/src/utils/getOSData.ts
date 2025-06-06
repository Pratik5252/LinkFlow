const osColorMap: Record<string, string> = {
  android: "var(--chart-android)",
  windows: "var(--chart-windows)",
  macos: "var(--chart-macos)",
  linux: "var(--chart-linux)",
  ios: "var(--chart-ios)",
  other: "var(--chart-other)",
};

export function getOSChartData(visits: { os: string }[]) {
  const osCounts: Record<string, number> = {};
  for (const visit of visits) {
    const key = visit.os?.toLowerCase() || "other";
    osCounts[key] = (osCounts[key] || 0) + 1;
  }
  return Object.entries(osCounts).map(([os, visitors]) => ({
    os,
    visitors,
    fill: osColorMap[os] || osColorMap.other,
  }));
}
