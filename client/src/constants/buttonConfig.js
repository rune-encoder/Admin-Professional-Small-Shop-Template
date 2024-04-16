import { FiEdit } from "react-icons/fi";
import { BsSave, BsTrash, BsEye } from "react-icons/bs";
import { TiCancelOutline } from "react-icons/ti";
import { GrClose } from "react-icons/gr";

import { IoHomeOutline } from "react-icons/io5";
import { RiListCheck3 } from "react-icons/ri";
import { PiUsersFourLight } from "react-icons/pi";
import {
  MdOutlineLocalShipping,
  MdQueryStats,
} from "react-icons/md";

export const btnActionConfig = {
  view: {
    className: "item-cell__btn--view",
    action: "View",
    icon: BsEye,
  },
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
  close: {
    className: "item-cell__btn--close",
    action: "Close",
    icon: GrClose,
  },
};

export const btnSidebarConfig = [
  { Icon: IoHomeOutline, text: "Home", menu: "home" },
  { Icon: RiListCheck3, text: "Listings", menu: "listings" },
  { Icon: MdOutlineLocalShipping, text: "Orders", menu: "orders" },
  { Icon: MdQueryStats, text: "Reports", menu: "reports" },
  { Icon: PiUsersFourLight, text: "Admins", menu: "admins" },
];