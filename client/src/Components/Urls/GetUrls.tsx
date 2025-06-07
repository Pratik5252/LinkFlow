import { getUrls, getUrlVisits } from "@/services/url";
import type { Url } from "@/types/url";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import type { Visit } from "@/types/visits";
import UrlVisits from "@/Components/Urls/UrlVisits";

const GetUrls = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<Url | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUrl = async () => {
    const res = await getUrls();
    setUrls(res);
  };

  useEffect(() => {
    fetchUrl();

    const interval = setInterval(() => {
      fetchUrl();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleModel = async (url: Url) => {
    setSelectedUrl(url);
    setOpen(true);
    setLoading(true);
    try {
      const data = await getUrlVisits(url.id);
      setVisits(data.visits);
      setVisitCount(data.visitCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 h-full w-full">
      {/* Table Header */}
      <div className="font-semibold py-2 border-b text-secondary-foreground text-3xl">
        <div>
          <p>Your URLs 🔗</p>
        </div>
      </div>
      {/* Table Rows */}
      {urls.map((url) => (
        <div
          onClick={() => handleModel(url)}
          key={url.shortLink}
          className="flex items-center px-4 py-4 border-b rounded-md bg-gray-100 border my-2 text-secondary-foreground text-xs"
        >
          <div className="grid grid-cols-4 gap-4 grow">
            <div>
              <div className="text-gray-500 mb-0.5">Original URL</div>
              <a
                href={url.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-500"
                onClick={(e) => e.stopPropagation()}
              >
                {url.originalUrl}
              </a>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Short URL</div>
              <a
                href={url.shortLink}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-500"
                onClick={(e) => e.stopPropagation()}
              >
                {url.shortLink}
              </a>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Visits</div>
              <p>{url._count.visits}</p>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Created At</div>
              <p>{url.createdAt.split("T")[0]}</p>
            </div>
          </div>
          <div className="flex-none">
            <Dropdown />
          </div>
        </div>
      ))}
      <UrlVisits
        open={open}
        onOpenChange={setOpen}
        url={selectedUrl}
        visits={visits}
        visitCount={visitCount}
        loading={loading}
      />
    </div>
  );
};

export default GetUrls;
