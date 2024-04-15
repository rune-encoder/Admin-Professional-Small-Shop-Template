// Import React Icons
import { IoMdRemoveCircleOutline } from "react-icons/io";
import {
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
  FaSortNumericDown,
  FaSortNumericUpAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaLongArrowAltUp,
  FaLongArrowAltDown,
} from "react-icons/fa";

export const getSortOptions = (listType) => {
  if (listType === "products") {
    return [
      { Icon: IoMdRemoveCircleOutline, value: "none", label: "None" },
      { Icon: FaSortAlphaDown, value: "name-asc", label: "Name" },
      { Icon: FaSortAlphaUpAlt, value: "name-desc", label: "Name" },
      { Icon: FaLongArrowAltUp, value: "date-asc", label: "Date" },
      { Icon: FaLongArrowAltDown, value: "date-desc", label: "Date" },
      { Icon: FaSortNumericDown, value: "price-asc", label: "Price" },
      { Icon: FaSortNumericUpAlt, value: "price-desc", label: "Price" },
      { Icon: FaSortAmountUp, value: "stock-asc", label: "Stock" },
      { Icon: FaSortAmountDown, value: "stock-desc", label: "Stock" },
    ];
  }

  if (listType === "categories") {
    return [
      { Icon: IoMdRemoveCircleOutline, value: "none", label: "None" },
      { Icon: FaSortAlphaDown, value: "name-asc", label: "Name" },
      { Icon: FaSortAlphaUpAlt, value: "name-desc", label: "Name" },
    ];
  }
};
