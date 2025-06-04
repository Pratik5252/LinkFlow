import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
import { Request } from "express";

export const getClientDetails = (req: Request) => {
  const rawIp = (req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "") as string;
  const ip = rawIp.split(",")[0].trim();

  const geo = geoip.lookup(ip) || {};
  const ua = req.headers["user-agent"] || "";
  const parsedUA = new UAParser(ua).getResult();
  console.log(ip);
  console.log(geo);
  console.log(parsedUA);

  return {
    ip,
    location: geo,
    browser: parsedUA.browser.name || "Unknown",
    os: parsedUA.os.name || "Unknown",
    device: parsedUA.device.type || "Desktop",
  };
};
