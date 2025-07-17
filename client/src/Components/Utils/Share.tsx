import { useState } from "react";
import ShareDialog from "../ShareDialog";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

const Share = ({value}) => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };
  return (
    <div>
      <Button variant="outline" onClick={handleOpen}>
        <Share2 />
      </Button>
      {open && (
        <ShareDialog open={open} onOpenChange={handleClose} value={value} />
      )}
    </div>
  );
};

export default Share;
