import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { createShortUrl } from "@/services/url";
import { useState, type FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface shortUrlProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShortUrl = ({ open, onOpenChange }: shortUrlProps) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createShortUrl({ originalUrl, customUrl, title });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={originalUrl}
              required
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <Input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <Button type="submit">Create</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShortUrl;
