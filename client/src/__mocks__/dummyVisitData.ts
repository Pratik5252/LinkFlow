// import type { Visit } from "@/types/visits";

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const cities = [
  {
    city: "Mumbai",
    region: "MH",
    country: "IN",
    ll: [19.07, 72.87],
    timezone: "Asia/Kolkata",
  },
  {
    city: "Delhi",
    region: "DL",
    country: "IN",
    ll: [28.61, 77.23],
    timezone: "Asia/Kolkata",
  },
  {
    city: "Bangalore",
    region: "KA",
    country: "IN",
    ll: [12.97, 77.59],
    timezone: "Asia/Kolkata",
  },
  {
    city: "Kolkata",
    region: "WB",
    country: "IN",
    ll: [22.57, 88.36],
    timezone: "Asia/Kolkata",
  },
  {
    city: "Chennai",
    region: "TN",
    country: "IN",
    ll: [13.08, 80.27],
    timezone: "Asia/Kolkata",
  },
  {
    city: "Pune",
    region: "MH",
    country: "IN",
    ll: [18.52, 73.85],
    timezone: "Asia/Kolkata",
  },
  {
    city: "Hyderabad",
    region: "TG",
    country: "IN",
    ll: [17.38, 78.48],
    timezone: "Asia/Kolkata",
  },
  {
    city: "Ahmedabad",
    region: "GJ",
    country: "IN",
    ll: [23.03, 72.58],
    timezone: "Asia/Kolkata",
  },
  {
    city: "Jaipur",
    region: "RJ",
    country: "IN",
    ll: [26.91, 75.79],
    timezone: "Asia/Kolkata",
  },
  {
    city: "London",
    region: "ENG",
    country: "GB",
    ll: [51.51, -0.13],
    timezone: "Europe/London",
  },
  {
    city: "New York",
    region: "NY",
    country: "US",
    ll: [40.71, -74.01],
    timezone: "America/New_York",
  },
  {
    city: "Berlin",
    region: "BE",
    country: "DE",
    ll: [52.52, 13.4],
    timezone: "Europe/Berlin",
  },
  {
    city: "Sydney",
    region: "NSW",
    country: "AU",
    ll: [-33.87, 151.21],
    timezone: "Australia/Sydney",
  },
];

const browsers = [
  "Chrome",
  "Firefox",
  "Edge",
  "Safari",
  "Opera",
  "Samsung Internet",
];
const desktopOS = ["Windows", "macOS", "Linux"];
const devices = ["Desktop", "Mobile"];

function randomIp() {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join(".");
}

const visits = Array.from({ length: 1000 }, (_, i) => {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const device = devices[Math.floor(Math.random() * devices.length)];
  const os =
    device === "Mobile"
      ? "Android"
      : desktopOS[Math.floor(Math.random() * desktopOS.length)];
  const browser = browsers[Math.floor(Math.random() * browsers.length)];
  const date = randomDate(new Date(2025, 1, 1), new Date());

  return {
    id: (i + 1).toString(),
    urlId: "url-1",
    ip: randomIp(),
    location: {
      city: city.city,
      region: city.region,
      country: city.country,
      timezone: city.timezone,
      ll: city.ll,
      area: Math.floor(Math.random() * 50) + 10,
      eu: city.country === "IN" ? "0" : "1",
      metro: 0,
      range: [
        Math.floor(Math.random() * 1000000000),
        Math.floor(Math.random() * 1000000000) + 1000,
      ],
    },
    browser,
    os,
    device,
    timestamp: date.toISOString(),
  };
});

export const dummyVisitData = {
  visits,
  visitCount: visits.length,
};
