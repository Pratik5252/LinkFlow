import { Dialog, DialogContent, DialogHeader } from "@/Components/ui/dialog";
import { createShortUrl } from "@/services/url";
import { useState, type FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { DialogTitle } from "@radix-ui/react-dialog";

interface shortUrlProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShortUrl = ({ open, onOpenChange }: shortUrlProps) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setError("");
      setOriginalUrl("");
      setCustomUrl("");
      setTitle("");
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await createShortUrl({ originalUrl, customUrl, title });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange} modal={true}>
        <DialogContent className="w-fit h-fit min-w-[40vw] min-h-[30vh] rounded">
          <DialogHeader>
            <DialogTitle>Create Short URL</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 min-w-[30vw]"
          >
            <div>
              <Label htmlFor="originalurl" className="mb-2">
                Original Url
              </Label>
              <Input
                id="originalurl"
                type="url"
                value={originalUrl}
                // required
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="customurl" className="mb-2">
                Custom Url
              </Label>
              <Input
                id="customurl"
                type="text"
                maxLength={7}
                minLength={3}
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="title" className="mb-2">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <Button
              type="submit"
              variant="outline"
              className="w-fit h-fit rounded-xs mt-6"
            >
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShortUrl;
