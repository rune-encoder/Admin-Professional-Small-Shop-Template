import { useState } from "react";

export const useFormState = (initialState) => {
  const [formState, setFormState] = useState(initialState);

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

    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  return { formState, handleInputChange, setFormState };
};
