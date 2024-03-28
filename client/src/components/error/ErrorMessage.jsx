// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Redux Actions
import { toggleErrorModal } from "../../features/errorSlice";

// Import Redux Selectors
import { selectLatestErrorMessage } from "../../features/errorSlice";

// Import React Icons
import { GrStatusWarning , GrClose } from "react-icons/gr";

export default function ErrorMessage() {
  const dispatch = useDispatch();

  const latestErrorMessage = useSelector(selectLatestErrorMessage);

  // ! Revisit: Keep or remove "container" class on "error__window" div
  return (
    <div className="error__window--wrapper">
      <div className="error__window container">
        <div className="error__window-tab">
          <h6>Error</h6>
          <button onClick={() => dispatch(toggleErrorModal(false))}>
            <GrClose />
          </button>
        </div>

        <div className="error__window-body">
          <GrStatusWarning />
          <p>{latestErrorMessage.message}</p>
        </div>
      </div>
    </div>
  );
}
