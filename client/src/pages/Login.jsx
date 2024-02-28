export default function Login({ onLogin }) {
  return (
    <>
      <div className="login__section--wrapper">
        <section className="login__section">
          <h3 className="login__header">Admin Login</h3>
            <div className="login__form-group">
              <span className="login__welcome-text">
                Welcome. Please login...
              </span>
              <form className="">
                <div className="login__form-section">
                  <label>Username:</label>
                  <input type="text" placeholder="Enter username..." />
                </div>
                <div className="login__form-section">
                  <label>Password:</label>
                  <input type="password" placeholder="Enter password..." />
                </div>
                <button className="login__button">Login</button>
              </form>
            </div>
          <span className="login__footer">Website by Christian Palacios</span>
        </section>
      </div>
    </>
  );
}
