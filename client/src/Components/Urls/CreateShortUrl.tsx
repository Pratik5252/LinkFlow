import { createShortUrl } from "@/services/url";
import { useState, type FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";
import { Link, Hash, Loader2, AlertCircle, Plus } from "lucide-react";
import { toast } from "sonner";
const CreateShortUrl = ({ text }: { text: string }): string => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [title, setTitle] = useState("");
  // const [lastCreatedUrl, setLastCreatedUrl] = useState("");
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const resetFields = () => {
    setOriginalUrl("");
    setCustomUrl("");
    setTitle("");
  };

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: createShortUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await mutateAsync({ originalUrl, customUrl, title });
      // setLastCreatedUrl(res.shortLink);
      // setTimeout(() => {
      //   setLastCreatedUrl("");
      // }, 5000);
      resetFields();
      setOpen(false);
      toast.success("Created " + res.shortLink);
    } catch (error: unknown) {
      resetFields();
      console.log(error);
      // setLastCreatedUrl("");
      toast.error("Failed to create short Url");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="">
          <Plus className=" h-4 w-4" /> {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-fit h-fit" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Link size={20} className="text-primary" />
            <span>Short URL</span>
            {/* {lastCreatedUrl && (
              <div className="flex items-center gap-1 text-sm font-normal text-primary bg-background px-2 py-1 rounded border border-primary">
                <CheckCircle size={12} />
                Created
              </div>
            )} */}
          </DialogTitle>
          <DialogDescription>
            Create a new short URL by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 min-w-[30vw] max-w-[50vw]">
          {/* {lastCreatedUrl && (
            <div className=" bg-background">
              <div className="flex items-center gap-2 text-foreground mb-2">
                <Check size={16} className="text-primary" />
                <span className="text-sm font-medium">Short URL created!</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-accent border border rounded">
                <code className="flex-1 text-sm font-mono text-foreground break-all">
                  {lastCreatedUrl}
                </code>
                <Copy url={lastCreatedUrl} />
              </div>
            </div>
          )} */}

          {/* Original URL Input */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 min-w-[30vw] max-w-[50vw]"
          >
            <div className="flex flex-col w-full">
              <Label htmlFor="originalurl" className="mb-2 gap-2">
                <Link size={12} />
                Original URL
                <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="originalurl"
                  type="url"
                  value={originalUrl}
                  placeholder="https://example.com"
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="flex flex-col w-full">
              <Label htmlFor="customurl" className="mb-2 gap-2">
                <Hash size={12} />
                Custom URL
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                id="customurl"
                type="text"
                maxLength={20}
                minLength={3}
                value={customUrl}
                placeholder="Enter Custom Name"
                onChange={(e) =>
                  setCustomUrl(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))
                }
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>Leave empty for auto-generated slug</span>
                <span>{customUrl.length}/20</span>
              </div>
              {customUrl && (
                <div className="text-sm text-muted-foreground bg-popover p-2 rounded border mt-2">
                  Preview:{" "}
                  <span className="font-mono text-foreground">
                    short.ly/{customUrl}
                  </span>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle size={12} />
                <span className="text-sm">{error.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="outline"
              className={`w-fit h-fit mt-6 transition-all duration-200 ${
                !originalUrl || isPending
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-background text-foreground border hover:border-ring hover:bg-accent cursor-pointer"
              } border`}
              disabled={!originalUrl || isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link size={16} />
                  Short URL
                </div>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShortUrl;
