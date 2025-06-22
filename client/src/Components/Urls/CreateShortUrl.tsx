import { createShortUrl } from "@/services/url";
import { useState, type FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Link, Hash } from "lucide-react";
import { toast } from "sonner";

const CreateShortUrl = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [title, setTitle] = useState("");

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
      resetFields();
      toast.success("Created " + res.shortLink);
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to create short Url");
    }
  };

  return (
    <div className=" w-full h-full min-w-[30vw] border border-primary rounded-2xl">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center text-2xl font-medium p-4 border-b border-border shadow rounded-2xl">
            Short URL
            {/* <Plus size={24} className="p-0 m-0" />{" "} */}
          </AccordionTrigger>
          <AccordionContent className="p-4 ">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 min-w-[30vw] max-w-[50vw]"
            >
              <div className=" flex flex-col w-full">
                <Label htmlFor="originalurl" className="mb-2">
                  <Link size={12} /> Original Url{" "}
                  <span className="text-red-500">*</span>
                </Label>
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
              <div className=" flex flex-col w-full">
                <Label htmlFor="customurl" className="mb-2">
                  <Hash size={12} /> Custom Url{" "}
                </Label>
                <Input
                  id="customurl"
                  type="text"
                  maxLength={7}
                  minLength={3}
                  value={customUrl}
                  placeholder="Enter Custom Name"
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
                <p className="text-muted-foreground">
                  Leave empty for auto-generated slug
                </p>
              </div>
              {/* <div>
          <Label htmlFor="title" className="mb-2">
            Title{" "}
            <span className="text-muted-foreground text-xs">(optional)</span>
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div> */}
              {error && <div className="text-red-500">{error.message}</div>}
              <Button
                type="submit"
                className={`w-fit h-fit rounded-xs mt-6 ${
                  !originalUrl || isPending
                    ? "bg-muted text-muted-foreground"
                    : "bg-background text-foreground"
                }  border hover:border-ring hover:bg-accent  cursor-pointer`}
                disabled={!originalUrl || isPending}
              >
                {isPending ? "Creating..." : "Short Url"}
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CreateShortUrl;
