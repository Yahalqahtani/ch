import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type User = {
    id: number;
    username: string;
    isAdmin: boolean;
};

// Assuming Card is your existing component
const Card: React.FC<{ user: User; onEdit: () => void }> = ({ user, onEdit }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2 ">
            <div className="flex items-center p-4">
                <div className="flex-shrink-0">
                    <IconButton>
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>
                </div>
                <div className="flex-1 min-w-0 px-4">
                    <p className="text-xl font-medium text-gray-900">{user.username}</p>
                    <p className="text-sm text-gray-500">Status: {user.isAdmin ? 'Admin' : 'User'}</p>
                </div>
            </div>
            <div className="bg-gray-100 p-4">
                <button onClick={onEdit} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                </button>
            </div>
        </div>
    );
};

export default Card;
