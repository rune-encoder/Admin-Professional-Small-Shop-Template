import { FaHome, FaUser, FaUsers } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';

const sidebarContent = [
    {
        id: 1,
        path: "/Home",
        icon: FaHome,
        text: "Home",
    },
    {
        id: 2,
        path: "/User",
        icon: FaUser,
        text: "Profile",
    },
    {
        id: 3,
        path: "/Shop",
        icon: FaShop,
        text: "Store",
    },
    {
        id: 4,
        path: "/Admins",
        icon: FaUsers,
        text: "Admins",
    }
    ];

export default sidebarContent;
