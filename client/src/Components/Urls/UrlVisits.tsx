import type { Url } from "@/types/url";
import type { Visit } from "@/types/visits";
import { Dialog, DialogContent, DialogHeader } from "@/Components/ui/dialog";
import { ChartLine } from "../Charts/ChartLine";
import { ChartPie } from "../Charts/PieChart";
import { WorldMapVisits } from "../Charts/WorldMapVisits";

interface UrlVisits {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: Url | null;
  visits: Visit[];
  visitCount: number;
  loading: boolean;
}

const UrlVisits = ({
  open,
  onOpenChange,
  url,
  visits,
  visitCount,
  loading,
}: UrlVisits) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>Visits History</DialogHeader>
        <div className="flex h-fit w-full gap-2">
          <div className="border p-4 text-left rounded-2xl">
            <p className="text-3xl font-semibold">Total Visit</p>
            <p className="text-6xl">{url?._count.visits}</p>
            <ChartPie visits={visits} />
          </div>
          <div className="flex flex-col gap-2">
            <ChartLine visits={visits} />
            <WorldMapVisits visits={visits} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UrlVisits;
