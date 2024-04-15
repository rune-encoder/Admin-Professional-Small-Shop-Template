import { FiEdit } from "react-icons/fi";
import { BsSave, BsTrash } from "react-icons/bs";
import { TiCancelOutline } from "react-icons/ti";

import { IoHomeOutline } from "react-icons/io5";
import { RiListCheck3 } from "react-icons/ri";
import { PiUsersFourLight } from "react-icons/pi";
import {
  MdOutlineLocalShipping,
  MdQueryStats,
} from "react-icons/md";

export const btnActionConfig = {
  save: {
    className: "item-cell__btn--save",
    action: "Save",
    icon: BsSave,
  },
  cancel: {
    className: "item-cell__btn--cancel",
    action: "Cancel",
    icon: TiCancelOutline,
  },
  update: {
    className: "item-cell__btn--update",
    action: "Update",
    icon: FiEdit,
  },
  delete: {
    className: "item-cell__btn--delete",
    action: "Delete",
    icon: BsTrash,
  },
};

export const btnSidebarConfig = [
  { Icon: IoHomeOutline, text: "Home", menu: "home" },
  { Icon: RiListCheck3, text: "Listings", menu: "listings" },
  { Icon: MdOutlineLocalShipping, text: "Orders", menu: "orders" },
  { Icon: MdQueryStats, text: "Reports", menu: "reports" },
  { Icon: PiUsersFourLight, text: "Admins", menu: "admins" },
];