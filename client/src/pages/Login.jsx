import Auth from "../utils/auth";

import { useState, useEffect } from "react";

import { LOGIN_ADMIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";

export default function Login() {
  // const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  // !REVISIT IMPROVE IS FORM VALID - USE HELPERS IN UTILS
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      formState.username.trim() !== "" && formState.password.trim() !== ""
    );
  }, [formState.username, formState.password]);

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_ADMIN);

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          username: formState.username,
          password: formState.password,
        },
      });

      const token = data.adminLogin.token;

      Auth.login(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="login__section--wrapper">
        <section className="login__section">
          <h3 className="login__header">Admin Login</h3>
          <div className="login__form-group">
            <span className="login__welcome-text">
              Welcome. Please login...
            </span>
            <form onSubmit={handleFormSubmit}>
              <div className="login__form-section">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formState.username}
                  onChange={handleInputChange}
                  placeholder="Enter username..."
                />
              </div>
              <div className="login__form-section">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  placeholder="Enter password..."
                />
              </div>
              <button
                className={`login__button ${isFormValid ? "" : "disabled"}`}
                type="submit"
                disabled={!isFormValid}
              >
                Login
              </button>
            </form>
          </div>
          <span className="login__footer">Website by Christian Palacios</span>
        </section>
      </div>
    </>
  );
}
