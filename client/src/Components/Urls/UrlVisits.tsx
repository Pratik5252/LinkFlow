import type { Url } from "@/types/url";
import type { Visit } from "@/types/visits";
import { Dialog, DialogContent, DialogHeader } from "@/Components/ui/dialog";
import { ChartLine } from "../Charts/ChartLine";
import { ChartPie } from "../Charts/CharPie";
import { WorldMapVisits } from "../Charts/WorldMapVisits";
import { ChartBar } from "../Charts/ChartBar";

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
      <DialogContent className="h-fit w-fit">
        <DialogHeader>Visits History</DialogHeader>
        <div className="flex h-fit w-full gap-2">
          <div className="flex flex-col gap-2">
            <div className="border p-6 pt-2 text-left rounded-2xl shadow-2xs">
              <p className="text-3xl font-semibold">Total Visit</p>
              <p className="text-6xl">{url?._count.visits}</p>
            </div>
            <div className="flex flex-col gap-2 h-full">
              <ChartPie visits={visits} />
              <div className="border rounded-2xl h-full p-6">Empty Container</div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <ChartBar visits={visits} />
              <WorldMapVisits visits={visits} />
            </div>
            <ChartLine visits={visits} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UrlVisits;
