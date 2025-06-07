import { logout } from "@/utils/logout";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };
  return (
    <div className="w-full border-b">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center h-full">
          <div className="flex justify-between items-center border-r h-14 w-14">
            <SidebarTrigger
              className="w-full h-full flex items-center justify-center cursor-pointer"
              size="default"
            />
          </div>
        </div>
        <div className="w-fit flex justify-between items-center grow px-4">
          <p>Dashboard</p>
          <Button
            variant="outline"
            className="cursor-pointer rounded-xs"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
