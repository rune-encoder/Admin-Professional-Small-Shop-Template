// Import Constraints
import { btnActionConfig as buttons } from "../../../constants/buttonConfig";

// ActionButtons component
// This component creates an action button that can be used in a table row.
// See configuration object for the btnActionConfig for button types.
// Parameters:
// type - string: The type of button to render.
// onClick - function: The function to run when the button is clicked.
// stopPropagation - boolean: Whether to stop the event from propagating.
// emblaSlide - string: Used with Embla carousel to determine the slide size `.embla__slide(--modifier)`.
export const ActionButtons = ({ type, onClick, stopPropagation = true, emblaSlide = "" }) => {
  const { className, action, icon: Icon } = buttons[type];
  
  return (
    <div className={`item-cell--actions ${emblaSlide}`}>
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
