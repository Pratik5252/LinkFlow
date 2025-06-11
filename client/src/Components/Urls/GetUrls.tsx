import { getUrls } from "@/services/url";
import type { Url } from "@/types/url";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Link as URL } from "lucide-react";
import ShortUrl from "./ShortUrl";
const GetUrls = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [open, setOpen] = useState<boolean>(false);

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

  const handleUrl = () => {
    setOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 h-full w-full">
      {/* Table Header */}
      <div className=" py-2 border-b text-secondary-foreground">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-xl font-semibold">
            Your URLs{" "}
            <span>
              <URL size={20} />
            </span>
          </div>
          <Button variant="link" onClick={handleUrl}>
            Add Url <Plus size={16} className="p-0 m-0" />{" "}
          </Button>
        </div>
      </div>
      {/* Table Rows */}
      <div className="mt-4 px-4">
        {urls.map((url) => (
          <Link to={`/visit/${url.id}`} key={url.shortLink}>
            <div className="flex items-center px-4 py-4 rounded-md bg-gray-100 border my-2 text-secondary-foreground text-xs motion-safe:hover:scale-x-[1.01] duration-200 motion-safe:hover:shadow-2xs transition-all">
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
                <Dropdown urlId={url.id} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ShortUrl open={open} onOpenChange={setOpen}/>
    </div>
  );
};
export default GetUrls;
