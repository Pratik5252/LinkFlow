import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import QRcode from "./Utils/QRcode";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { Button } from "./ui/button";
import { Share } from "lucide-react";
import Copy from "./Utils/Copy";
import { useRef } from "react";

interface shortUrlProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
}

const ShareDialog = ({ open, onOpenChange, value }: shortUrlProps) => {
  const qrRef = useRef(null);

  const downloadQR = () => {
    const svg = qrRef.current;
    if (!svg) return;

    // Create a canvas and draw the SVG onto it
    const canvas = document.createElement("canvas");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      // Download as PNG
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qrcode.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = url;
  };

  const shareQR = async () => {
    const svg = qrRef.current;
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob(async (blob) => {
        if (
          navigator.canShare &&
          navigator.canShare({
            files: [new File([blob], "qrcode.png", { type: "image/png" })],
          })
        ) {
          try {
            await navigator.share({
              files: [new File([blob], "qrcode.png", { type: "image/png" })],
              title: "QR Code",
              text: "Scan this QR code!",
            });
          } catch (err) {
            alert("Sharing failed: " + err.message);
          }
        } else {
          alert("Sharing images is not supported on this device/browser.");
        }
      }, "image/png");
    };
    img.src = url;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="w-fit h-fit" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center border p-2 rounded">
          <QRcode ref={qrRef} value={value} />
        </div>

        <div className="w-full flex gap-2">
          <Button className="flex-grow" variant="outline" onClick={downloadQR}>
            Download
          </Button>
          <Button className="flex-grow" variant="outline" onClick={shareQR}>
            <Share />
          </Button>
        </div>
        <div className="flex justify-between items-center border">
          <p className="text-sm pl-2 text-primary">{value}</p>
          <Copy url={value} />
        </div>

        {/* <div>
          <WhatsappShareButton url={value} title={value} separator=":: ">
            <WhatsappIcon
              className="border p-1 rounded-md"
              borderRadius={4}
              size={44}
            />
          </WhatsappShareButton>
        </div> */}
      </DialogContent>
      <DialogClose asChild>Close</DialogClose>
    </Dialog>
  );
};

export default ShareDialog;
