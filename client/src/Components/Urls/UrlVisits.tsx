import type { Url } from "@/types/url";
import type { Visit } from "@/types/visits";
import { ChartLine } from "../Charts/ChartLine";
import { ChartPie } from "../Charts/CharPie";
import { WorldMapVisits } from "../Charts/WorldMapVisits";
import { ChartBar } from "../Charts/ChartBar";

interface UrlVisits {
  url: Url | null;
  visits: Visit[];
  visitCount: number;
  loading: boolean;
}

const UrlVisits = ({ url, visits, visitCount, loading }: UrlVisits) => {
  return (
    <div className=" w-full sm:max-w-6xl h-full flex justify-center items-center">
      <div className="h-full w-[70vw] gap-2">
        <div className="self-start mb-2">
          <h2>Visits History</h2>
        </div>
        <div className="flex h-fit w-[70vw] gap-2 justify-center">
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-card  border p-6 pt-2 text-left rounded-2xl shadow-2xs">
              <p className="text-3xl font-semibold">Total Visit</p>
              <p className="text-6xl">{visitCount}</p>
            </div>

            <div className="flex flex-col gap-2 h-full">
              <ChartPie visits={visits} />
              <div className="border rounded-2xl h-full p-6">
                Empty Container
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 w-full">
              <ChartBar visits={visits} />
              <WorldMapVisits visits={visits} />
            </div>
            <ChartLine visits={visits} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlVisits;
