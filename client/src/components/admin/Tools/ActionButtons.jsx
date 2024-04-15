// Import Constraints
import { btnActionConfig as buttons } from "../../../constants/buttonConfig";

// Helper function: Render action buttons for the category list.
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
