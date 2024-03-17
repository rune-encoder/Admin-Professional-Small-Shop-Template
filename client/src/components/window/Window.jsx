import { useDispatch } from "react-redux";
import { toggleMenuItem } from "../../features/menuSlice";

import { GrClose } from "react-icons/gr";

export default function Window({ title, children }) {
  const dispatch = useDispatch();
  const itemName = title.toLowerCase();

  return (
    <div className="window container">
      <div className="window__bar">
        <h6>{title}</h6>
        <button onClick={() => dispatch(toggleMenuItem({ [itemName]: false }))}>
          <GrClose />
        </button>
      </div>

      <div className="window__body">{children}</div>
    </div>
  );
}
