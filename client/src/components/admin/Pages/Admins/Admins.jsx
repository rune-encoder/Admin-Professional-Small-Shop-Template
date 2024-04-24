// Import React Hooks
import { useState, useEffect } from "react";

// Import Apollo Hooks
import { useQuery, useMutation } from "@apollo/client";

// Import Redux Hooks
import { useDispatch } from "react-redux";

// Import Redux Actions
import { setLatestErrorMessage } from "../../../../features/errorSlice";

// Import Queries
import { QUERY_ADMINS } from "../../../../utils/graphql/queries";

// Import Mutations
import {
  CREATE_ADMIN,
  UPDATE_ADMIN,
  DELETE_ADMIN,
} from "../../../../utils/graphql/mutations";

// Import Components
import { ActionButtons } from "../../.././../components/admin";

// Import React Icons
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

export function Admins({ children }) {
  // ==============================
  // useState Hooks Section
  // ==============================
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [adminMode, setAdminMode] = useState(null);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    permission: "viewer",
  });

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  // const dispatch = useDispatch();

  // ==============================
  // QUERY SECTION
  // ==============================
  const { loading, data: adminData, error } = useQuery(QUERY_ADMINS);

  // ==============================
  // MUTATION SECTION
  // ==============================
  const [createAdmin] = useMutation(CREATE_ADMIN, {
    refetchQueries: [{ query: QUERY_ADMINS }],
    onError: (error) => {
      console.error(error);
      //   dispatch(setLatestErrorMessage(error));
    },
  });

  const [updateAdmin] = useMutation(UPDATE_ADMIN, {
    refetchQueries: [{ query: QUERY_ADMINS }],
    onError: (error) => {
      console.error(error);
      // dispatch(setLatestErrorMessage(error));
    },
  });

  const [deleteAdmin] = useMutation(DELETE_ADMIN, {
    refetchQueries: [{ query: QUERY_ADMINS }],
    onError: (error) => {
      console.error(error);
      // dispatch(setLatestErrorMessage(error));
    },
  });

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

  // ==============================
  // Event Handlers Section
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleCreateAdminSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAdmin({ variables: { ...formState } });
      setFormState({
        username: "",
        email: "",
        password: "",
        permission: "viewer",
      });
      setAdminMode(null);
    } catch (error) {
      console.error(error);
      //   dispatch(setLatestErrorMessage(error));
    }
  };

  const handleUpdateAdminSubmit = async (e) => {
    e.preventDefault();

    const filteredFormState = Object.entries(formState).reduce(
      (newFormState, [key, value]) => {
        if (value !== "" && value !== false) {
          newFormState[key] = value;
        }
        return newFormState;
      },
      {}
    );

    try {
      await updateAdmin({
        variables: {
          id: selectedAdmin._id,
          ...filteredFormState,
        },
      });
      setFormState({
        username: "",
        email: "",
        password: "",
        permission: "viewer",
      });
      setAdminMode(null);
    } catch (error) {
      console.error(error);
      //   dispatch(setLatestErrorMessage(error));
    }
  };

  const handleDeleteAdmin = async (adminData) => {
    try {
      await deleteAdmin({ variables: { id: adminData._id } });
    } catch (error) {
      console.error(error);
      //   dispatch(setLatestErrorMessage(error));
    }
  };

  return (
    <>
      {adminMode === "create" && (
        <div className="window__content--wrapper col-sm-12 col-md-5">
          <form onSubmit={handleCreateAdminSubmit}>
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
          <form onSubmit={handleUpdateAdminSubmit}>
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
