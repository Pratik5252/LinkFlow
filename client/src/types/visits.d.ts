export interface Visit {
  id: string;
  urlId: string;
  ip: string;
  location: {
    city: string;
    region: string;
    country: string;
    timezone: string;
    ll: number[];
    area: number;
    eu: string;
    metro: number;
    range: number[];
  };
  browser: string;
  os: string;
  device: string;
  timestamp: string;
}

export interface VisitResponse {
  visits: Visit[];
  visitCount: number;
}
