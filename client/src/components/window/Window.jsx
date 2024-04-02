export default function Window({ title, children }) {
  return (
    <div className="window--wrapper">
      <div className="window">
        <div className="window__tab">
          <h6>{title}</h6>
        </div>

        <div className="window__body">{children}</div>
      </div>
    </div>
  );
}
