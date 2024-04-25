// Summary: This hook will encapsulate the logic for fetching the admins,
// creating a new admin, updating an existing admin, and deleting an existing admin,
// handling the form state for the admin form input, setting the selected admin and admin mode (create or update,
// sorting and filtering the admins based on the search term and sort type.

// Import React Hooks
import { useState } from "react";

// Import Apollo Hooks
import { useQuery, useMutation } from "@apollo/client";

// Import Redux Hooks
// !Revisit: Try to set up error using Redux Error Slice
import { useDispatch } from "react-redux";

// Import Redux Actions
import { setLatestErrorMessage } from "../../../../../features/errorSlice";

// Import Queries
import { QUERY_ADMINS } from "../../../../../utils/graphql/queries";

// Import Mutations
import {
  CREATE_ADMIN,
  UPDATE_ADMIN,
  DELETE_ADMIN,
} from "../../../../../utils/graphql/mutations";

/**
 * Custom hook to manage admins, including fetching, creating, updating, and deleting admins.
 * Provides an interface to get and set the selected admin and admin mode, form state, and admin data.
 *
 * @returns {Object} An object containing the selected admin, admin mode, form state, admin data, and functions for creating, updating, and deleting an admin.
 */
export function useAdmins() {
  // State for selected admin and admin mode
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [adminMode, setAdminMode] = useState(null);

  // State for admin form input
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    permission: "viewer",
  });

  // !Revisit: Try to set up error using Redux Error Slice
  // const dispatch = useDispatch();

  // Fetch admins from the server for the list
  const { loading, data: adminData, error } = useQuery(QUERY_ADMINS);

  // Mutations for creating, updating, and deleting an admin
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

  // Handle change for form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle submit for creating an admin
  const handleCreateAdmin = async (e) => {
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

  // Handle submit for updating an admin
  const handleUpdateAdmin = async (e) => {
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

  // Handle delete for a specific admin
  const handleDeleteAdmin = async (adminData) => {
    try {
      await deleteAdmin({ variables: { id: adminData._id } });
    } catch (error) {
      console.error(error);
      //   dispatch(setLatestErrorMessage(error));
    }
  };

  return {
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
    query: {
      loading: loading,
      data: adminData,
      error: error,
    },
    mutation: {
      create: handleCreateAdmin,
      update: handleUpdateAdmin,
      delete: handleDeleteAdmin,
    },
  };
}
