import { FiEdit } from "react-icons/fi";
import { BsSave, BsTrash } from "react-icons/bs";
import { TiCancelOutline } from "react-icons/ti";

export const buttonConfig = {
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
