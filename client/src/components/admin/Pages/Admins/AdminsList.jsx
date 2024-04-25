// Impport Custom Hooks
import { useAdmins } from "./hooks/useAdmins";

// Import Components
import { ActionButtons } from "../..";

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
      handleChange: handleChange,
    },
    query: { loading: loading, data: adminData, error: error },
    mutation: {
      create: handleCreateAdmin,
      update: handleUpdateAdmin,
      delete: handleDeleteAdmin,
    },
  } = useAdmins();

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

  return (
    <>
      {adminMode === "create" && (
        <div className="window__content--wrapper col-sm-12 col-md-5">
          <form onSubmit={handleCreateAdmin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formState.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="permission">Permission:</label>
              <select
                id="permission"
                name="permission"
                value={formState.permission}
                onChange={handleChange}
                required
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="manager">Manager</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <button type="submit">Create User</button>
          </form>
        </div>
      )}

      {adminMode === "update" && (
        <div className="window__content--wrapper col-sm-12 col-md-5">
          <form onSubmit={handleUpdateAdmin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formState.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="permission">Permission:</label>
              <select
                id="permission"
                name="permission"
                value={formState.permission}
                onChange={handleChange}
                required
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="manager">Manager</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <button type="submit">Update User</button>
          </form>
        </div>
      )}

      <button
        onClick={() => {
          setAdminMode("create");
        }}
      >
        Create + Button
      </button>

      {children}
      <div className="listings-wrapper">
        <div className="listings">
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
    </>
  );
}
