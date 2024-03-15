export default function Window({ title, children }) {
  return (
    <div className="window container">
      <h6 className="window__bar">{title}</h6>
      <div className="window__body">
        {children}
      </div>
    </div>
  );
}
