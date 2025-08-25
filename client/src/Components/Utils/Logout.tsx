import { logout } from '@/utils/logout';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };
    return (
        <Button
            variant="ghost"
            className="cursor-pointer rounded-xs w-full flex items-center justify-between"
            onClick={handleLogout}
        >
            Logout <LogOut />
        </Button>
    );
};

export default Logout;
