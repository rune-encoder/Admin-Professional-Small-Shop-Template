// Summary: This hook is used to manage the state of a form. 
// It includes a function to handle input changes and a state to manage the form state.

import { useState } from "react";

export const useFormState = (initialState) => {
  // Initialize the form state with the initial state.
  const [formState, setFormState] = useState(initialState);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    let newValue;

    if (type === "checkbox") {
      // Checkbox values are boolean
      newValue = checked;
    } else if (name === "price") {
      // Round the price to 2 decimal places
      newValue = parseFloat(parseFloat(value).toFixed(2));
    } else if (name === "quantity") {
      // Whole numbers only
      newValue = parseInt(value, 10);
    } else {
      newValue = value;
    }

    // Update the form state with the new value
    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  return { formState, handleInputChange, setFormState };
};
