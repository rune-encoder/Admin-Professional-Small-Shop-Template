// ! Revisit: Working and Refactoring
// ! Note: Adjust rules for deleting admin and on backend
// Impport Custom Hooks
import { useAdmins } from "./hooks/useAdmins";

// Import Components
import { ActionButtons } from "../../Tools";
import { Toolbar } from "../../Tools";

import { useEffect } from "react";

// Import React Icons
import { IoArrowBack } from "react-icons/io5";

export function AdminsList({ children }) {
  const {
    admin: {
      selected: selectedAdmin,
      setSelected: setSelectedAdmin,
      mode: adminMode,
      setMode: setAdminMode,
    },
    form: {
      state: formState,
      setState: setFormState,
      handleChange: handleInputChange,
    },
    query: { loading: loading, data: adminData, error: error },
    mutation: {
      create: handleCreateAdmin,
      update: handleUpdateAdmin,
      delete: handleDeleteAdmin,
    },
  } = useAdmins();

  useEffect(() => {
    console.log(selectedAdmin);
    console.log(adminMode);
    console.log(formState);
  }, [selectedAdmin, adminMode, formState]);

  // ==============================
  // DATA PREPROCESSING SECTION
  // ==============================
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    // dispatch(setLatestErrorMessage(error));
    return <div>Error: {error.message}</div>;
  }

  const admins = adminData?.getAdmins || [];

  const dataBoolean = adminMode === "update" || adminMode === "create";

  return (
    <>
      <div className="admin-page--wrapper">
        <div className="control-item--wrapper" data-boolean={dataBoolean}>
          {adminMode === "create" || adminMode === "update" ? (
            <div className="control-item">
              {/* Back Button */}
              <button className="control__btn-back">
                <IoArrowBack
                  onClick={() => {
                    setAdminMode(null);
                    setSelectedAdmin(null);
                  }}
                />
              </button>

              <form
                className="control__item-details"
                onSubmit={
                  adminMode === "update" ? handleUpdateAdmin : handleCreateAdmin
                }
              >
                <section className="control__item-row--grid">
                  <label htmlFor="username" className="control__item-label">
                    Admin Username:
                  </label>

                  <input
                    className="control__item-value"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formState.username}
                    onChange={handleInputChange}
                    required
                  />
                </section>

                <section className="control__item-row--grid">
                  <label htmlFor="permission" className="control__item-label">
                    Admin Level:
                  </label>

                  <select
                    className="control__item-value"
                    id="permission"
                    name="permission"
                    value={formState.permission}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="manager">Manager</option>
                    <option value="owner">Owner</option>
                  </select>
                </section>

                <section className="control__item-row--grid">
                  <label htmlFor="email" className="control__item-label">
                    Email:
                  </label>

                  <input
                    className="control__item-value"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                </section>

                <section className="control__item-row--grid">
                  <label className="control__item-label">Confirm Email:</label>

                  <input
                    className="control__item-value"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                </section>

                <section className="control__item-row--grid">
                  <label className="control__item-label">Password:</label>

                  <input
                    htmlFor="password"
                    className="control__item-value"
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleInputChange}
                  />
                </section>

                <section className="control__item-row--flex-col">
                  <button className="control__btn-action" type="submit">
                    {adminMode === "update" ? "Save" : "Create"}
                  </button>
                </section>
              </form>
            </div>
          ) : null}
        </div>

        <div className="list--wrapper" data-boolean={dataBoolean}>
          <Toolbar title={"Admins"} mode={adminMode} setMode={setAdminMode} />
          <div className="list">
            {admins.map((admin) => (
              <div
                className="item-row--admins"
                key={admin._id}
                onClick={() => {
                  // dispatch(setAdminMode({ mode: "view", admin }));
                }}
              >
                {/* USERNAME & LEVEL CELL SECTION */}
                <div className="item-cell">
                  <div className="item-wrapper">
                    <div className="item-group">
                      <div className="item-label">Username:</div>
                      <div className="item-value">{admin.username}</div>
                    </div>

                    <div className="item-group">
                      <div className="item-label">Level:</div>
                      <div className="item-value">{admin.permission}</div>
                    </div>
                  </div>
                </div>

                {/* EMAIL CELL SECTION */}
                <div className="item-cell">
                  <div className="item-label">Email:</div>
                  <div className="item-value">{admin.email}</div>
                </div>

                {/* UPDATE CELL SECTION */}
                <ActionButtons
                  type="update"
                  onClick={() => {
                    setSelectedAdmin(admin);
                    setAdminMode("update");
                    setFormState({
                      username: admin.username,
                      email: admin.email,
                      password: "",
                      permission: admin.permission,
                    });
                  }}
                />

                {/* DELETE CELL SECTION */}
                <ActionButtons
                  type="delete"
                  onClick={() => handleDeleteAdmin(admin)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
