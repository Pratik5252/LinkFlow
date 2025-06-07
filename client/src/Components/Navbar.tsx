import { logout } from "@/utils/logout";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };
  return (
    <div className="w-full border-b border">
      <div className="w-full flex justify-between items-center px-4 py-2">
        <div>
          <p>Dashboard</p>
        </div>
        <div>
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
