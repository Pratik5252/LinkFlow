import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import type { Url } from "@/types/url";
import DeleteUrl from "../Urls/DeleteUrl";

interface DeleteDialogProps {
  isOpen: boolean;
  url: Url | null;
}

interface DeleteProps {
  url: Url;
  deleteDialog: DeleteDialogProps;
  setDeleteDialog: React.Dispatch<React.SetStateAction<DeleteDialogProps>>;
}

const Delete: React.FC<DeleteProps> = ({ url, deleteDialog, setDeleteDialog }) => {
  const queryClient = useQueryClient();

  const handleDeleteClick = (url: Url) => {
    setDeleteDialog({
      isOpen: true,
      url: url,
    });
  };

  const handleDeleteDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      setDeleteDialog({
        isOpen: false,
        url: null,
      });
    }
  };

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["urls"] });
    setDeleteDialog({
      isOpen: false,
      url: null,
    });
  };
  return (
    <>
      <button
        onClick={() => handleDeleteClick(url)}
        className="p-1 cursor-pointer justify-between hover:text-red-400"
      >
        <Trash size={20} strokeWidth={1} />
      </button>
      {deleteDialog.url && (
        <DeleteUrl
          open={deleteDialog.isOpen}
          onOpenChange={handleDeleteDialogClose}
          onDeleteSuccess={handleDeleteSuccess}
          urlId={deleteDialog.url.id}
          shortLink={deleteDialog.url.shortLink}
          originalUrl={deleteDialog.url.originalUrl}
          title={deleteDialog.url.title ?? ""}
        />
      )}
    </>
  );
};

export default Delete;
