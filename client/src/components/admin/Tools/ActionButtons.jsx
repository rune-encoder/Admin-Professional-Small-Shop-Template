// Import Constraints
import { btnActionConfig as buttons } from "../../../constants/buttonConfig";

// ActionButtons component
// This component creates an action button that can be used in a table row.
// See configuration object for the btnActionConfig for button types.
export const ActionButtons = ({ type, onClick, stopPropagation = true }) => {
  const { className, action, icon: Icon } = buttons[type];
  return (
    <div className="item-cell--actions">
      <button
        className={className}
        data-action={action}
        onClick={(event) => {
          if (stopPropagation) event.stopPropagation();
          onClick(event);
        }}
      >
        <Icon />
        {action}
      </button>
    </div>
  );
};
