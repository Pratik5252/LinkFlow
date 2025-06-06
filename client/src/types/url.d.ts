export interface Url {
  id: string;
  userId: string;
  originalUrl: string;
  shortUrl: string;
  title: string | null;
  createdAt: string;
  _count: {
    visits: number;
  };
  shortLink: string;
}

