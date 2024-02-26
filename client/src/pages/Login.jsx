export default function Login({ onLogin }) {
  return (
    <>
      <div className="login__section--wrapper">
        <section className="login__section">
          <h3 className="login__header">Admin Login</h3>
          <div className="login__main">
            <span className="login__welcome-text">Welcome. Please login...</span>
            <button className="login__button">Login</button>
          </div>
          <span className="login__footer">Website by Christian Palacios</span>
        </section>
      </div>
    </>
  );
}
