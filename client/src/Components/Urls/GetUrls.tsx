import { deleteUrl, getUrls, getUrlVisits } from "@/services/url";
import type { Url } from "@/types/url";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Link as URL,
  Plus,
  Settings,
  Trash,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from "lucide-react";
import ShortUrl from "./ShortUrl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Copy from "../Utils/Copy";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSortableData } from "@/hooks/useSortableData";

const GetUrls = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: urls = [],
    isLoading,
    error,
  } = useQuery<Url[]>({
    queryKey: ["urls"],
    queryFn: getUrls,
    refetchInterval: 5000,
    staleTime: 5000,
  });

  const { items, requestSort, getSortIndicator } = useSortableData(urls);

  const renderSortIcon = (key: string) => {
    const sortState = getSortIndicator(key);
    switch (sortState) {
      case "ascending":
        return <ChevronUp size={12} />;
      case "descending":
        return <ChevronDown size={12} />;
      default:
        return <ChevronsUpDown size={12} />;
    }
  };

  const handleMouseEnter = (urlId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["visits", urlId],
      queryFn: () => getUrlVisits(urlId),
      staleTime: 1000 * 60 * 5,
    });
  };

  const handleDelete = async (e, urlId) => {
    e.stopPropagation();
    await deleteUrl(urlId);
  };

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(",", "");
  };

  const handleUrl = () => {
    setOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto h-full w-full mt-4">
      {/* Table Header */}
      <div className=" py-2 text-foreground">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-lg font-medium">
            URLs{" "}
            <span>
              <URL size={20} />
            </span>
          </div>
          <Button variant="default" onClick={handleUrl} className="rounded-xs">
            Add Url <Plus size={16} className="p-0 m-0" />{" "}
          </Button>
        </div>
      </div>
      {/* Table Rows */}

      <div className="mt-4 rounded-lg overflow-hidden ">
        <div className="table-grid bg-background text-secondary-foreground  text-sm font-light">
          <div className="px-4 py-3">Short URL</div>
          <div className="px-4 py-3">Original URL</div>
          <div className="px-4 py-3 flex items-center justify-center gap-1">
            <p>Analytics</p>
            <Tooltip>
              <TooltipTrigger className="h-full mt-0.5">
                <Info size={12} strokeWidth={1} />
              </TooltipTrigger>
              <TooltipContent className="bg-secondary text-secondary-foreground border text-xs">
                To enable analytics, go to the URL settings and verify your
                website ownership.
              </TooltipContent>
            </Tooltip>
          </div>
          <div
            className="px-4 py-3 whitespace-nowrap flex items-center justify-center gap-1"
            onClick={() => requestSort("_count.visits")}
          >
            Visits
            {renderSortIcon("_count.visits")}
          </div>
          <div
            className="px-4 py-3 whitespace-nowrap flex items-center justify-center gap-1"
            onClick={() => requestSort("createdAt")}
          >
            Date <span>{renderSortIcon("createdAt")}</span>
          </div>
          <div className="px-4 py-3 whitespace-nowrap flex items-center justify-center"></div>
        </div>

        {isLoading && <div>Loading...</div>}
        {error && <div>Error</div>}
        {urls && (
          <div className="">
            {items.map((url) => (
              <div
                className=" bg-background text-xs text-foreground border-t table-grid"
                key={url.originalUrl}
              >
                <div className="flex items-center px-4 py-4 gap-2">
                  <Link
                    to={url.shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {url.shortLink}
                  </Link>
                  <div className="flex items-center">
                    <Copy shortUrl={url.shortLink} />
                  </div>
                </div>

                <div className="flex items-center px-4 py-4">
                  <Link
                    to={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {url.originalUrl}
                  </Link>
                </div>

                <div className=" px-4 py-4 flex items-center justify-center">
                  <Link
                    to={`/visit/${url.id}`}
                    key={url.shortLink}
                    onMouseEnter={() => handleMouseEnter(url.id)}
                    className="hover:text-secondary-foreground transition-all duration-200"
                  >
                    {" "}
                    View
                  </Link>
                </div>

                <div className="px-4 py-4 flex items-center justify-center">
                  <p>{url._count.visits}</p>
                </div>

                <div className="px-4 py-4 flex items-center justify-center">
                  <p>{formatDate(url.createdAt)}</p>
                </div>

                <div className="flex items-center justify-center px-4 py-4 gap-4">
                  <button className="cursor-pointer">
                    <Settings
                      size={20}
                      strokeWidth={1}
                      className="hover:rotate-45 transition-transform duration-300"
                    />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, url.id)}
                    className="p-1 cursor-pointer justify-between hover:text-red-400"
                  >
                    <Trash size={20} strokeWidth={1} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ShortUrl open={open} onOpenChange={setOpen} />
    </div>
  );
};
export default GetUrls;
