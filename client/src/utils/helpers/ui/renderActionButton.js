// Helper function: Render action buttons for the category list.
// See configuration object for the buttonConfig for button types.
export const renderButton = (type, onClick, stopPropagation = true) => {
  const { className, action, icon: Icon } = buttonConfig[type];
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
