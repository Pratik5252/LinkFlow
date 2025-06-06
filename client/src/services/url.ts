import type { Url } from "@/types/url";
import type { VisitResponse } from "@/types/visits";

export const getUrls = async (): Promise<Url[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await fetch(`http://localhost:3000/api/url/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json() as Promise<Url[]>;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getUrlVisits = async (urlId: string): Promise<VisitResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await fetch(`http://localhost:3000/api/url/${urlId}/visits`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch visit data");
    }

    return res.json() as Promise<VisitResponse>;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
