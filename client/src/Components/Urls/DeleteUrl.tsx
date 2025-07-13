import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { deleteUrl } from "@/services/url";
import { Button } from "../ui/button";
import { AlertTriangle, Trash2, Link } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface shortUrlProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteSuccess?: () => void;
  urlId: string;
  shortLink: string;
  originalUrl: string;
  title?: string;
}

const DeleteUrl = ({
  open,
  onOpenChange,
  onDeleteSuccess,
  urlId,
  shortLink,
  originalUrl,
  title,
}: shortUrlProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const queryClient = useQueryClient();

  const handleDelete = async (e: React.MouseEvent, urlId: string) => {
    e.stopPropagation();
    setIsDeleting(true);

    try {
      await deleteUrl(urlId);

      queryClient.setQueryData(["urls"], (oldData: any[]) => {
        return oldData ? oldData.filter((url) => url.id !== urlId) : [];
      });

      queryClient.invalidateQueries({ queryKey: ["urls"] });
      toast.success(`${shortLink} Deleted`);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      } else {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Failed to delete URL:", error);
      toast.error("Failed to delete URL");

      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    } finally {
      setIsDeleting(false);
    }
  };

  // Truncate long URLs for better display
  const truncateUrl = (url: string, maxLength: number = 40) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent
        className="w-fit min-w-[30vw] max-w-[90vw] h-fit rounded-lg border"
        showCloseButton={false}
        aria-describedby={undefined}
      >
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              Delete Short URL
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-2">
          {/* Warning Message */}
          <div className="space-y-2">
            <p className="font-medium">
              Are you sure you want to delete this URL?
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This action cannot be undone. All analytics data and the shortened
              link will be permanently removed.
            </p>
          </div>

          {/* URL Preview Card */}
          <div className="bg-popover text-popover-foreground border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Link className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 min-w-0 flex-1">
                <div>
                  <p className="text-xs uppercase tracking-wider font-medium">
                    Short URL
                  </p>
                  <p className="text-blue-400 font-mono text-sm break-all">
                    {shortLink}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-medium">
                    Original URL
                  </p>
                  <p
                    className="text-blue-400 text-sm break-all"
                    title={originalUrl}
                  >
                    {truncateUrl(originalUrl, 60)}
                  </p>
                </div>
                {title && (
                  <div>
                    <p className="text-xs uppercase tracking-wider font-medium">
                      Title
                    </p>
                    <p className="text-gray-300 text-sm">{title}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild>
              <Button variant="outline" className="" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={(e) => handleDelete(e, urlId)}
              disabled={isDeleting}
              className=" min-w-[100px]"
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUrl;
