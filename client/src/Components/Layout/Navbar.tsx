import { logout } from '@/utils/logout';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { ModeToggle } from '../Utils/modeToggle';
import UserSettings from '../UserSettings';

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };
    return (
        <div className="w-full border-b bg-background rounded-t-2xl overflow-hidden">
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
                    <p>Site Insight</p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="cursor-pointer rounded-xs"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                        <ModeToggle />
                        <UserSettings />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
