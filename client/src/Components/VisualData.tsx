import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Visit } from "@/types/visits";
import type { Url } from "@/types/url";
import { getUrlVisits } from "@/services/url";
import UrlVisits from "./Urls/UrlVisits";

const VisualData = () => {
  const { urlId } = useParams();
  const [selectedUrl, setSelectedUrl] = useState<Url | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      setLoading(true);
      try {
        const data = await getUrlVisits(urlId!);
        setVisits(data.visits);
        setVisitCount(data.visitCount);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, [urlId]);

  return (
    <div className="w-full h-full flex justify-center items-center mt-4">
      <UrlVisits
        url={selectedUrl}
        visits={visits}
        visitCount={visitCount}
        loading={loading}
      />
    </div>
  );
};

export default VisualData;
