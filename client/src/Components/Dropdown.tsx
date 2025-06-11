import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { deleteUrl } from "@/services/url";
import { DynamicIcon } from "lucide-react/dynamic";

const Dropdown = (urlId: { urlId: string }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();

    await deleteUrl(urlId.urlId);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <DynamicIcon name="ellipsis" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            Share <DynamicIcon name="share" size={20} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer justify-between"
            onClick={handleDelete}
          >
            Delete
            <DynamicIcon name="trash" size={20} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
