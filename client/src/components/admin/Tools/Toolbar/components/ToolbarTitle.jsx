export function ToolbarTitle({ title, children }) {
  return (
    <div className="toolbar-title__section">
      {/* Title */}
      <span className="toolbar-title">{title}</span>

      {/* Toolbar Buttons */}
      {children}
    </div>
  );
}
