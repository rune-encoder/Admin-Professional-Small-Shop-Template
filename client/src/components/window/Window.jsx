// Import Redux Hooks
import { useDispatch } from "react-redux";

// Import Redux Actions
import { toggleMenuItem } from "../../features/menuSlice";

// Import React Icons
import { GrClose } from "react-icons/gr";

export default function Window({ title, children }) {
  const dispatch = useDispatch();
  const itemName = title.toLowerCase();

  return (
    <div className="window--wrapper">
      <div className="window">
        <div className="window__tab">
          <h6>{title}</h6>
          <button
            onClick={() => dispatch(toggleMenuItem({ [itemName]: false }))}
          >
            <GrClose />
          </button>
        </div>

        <div className="window__body">{children}</div>
      </div>
    </div>
  );
}
