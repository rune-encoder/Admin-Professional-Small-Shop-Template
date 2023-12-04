const chalk = require("chalk");

// COLOR STYILING PRE-SET OPTIONS: BOLD WITH RED OR GREEN TEXT
const setRed = { bold: true, color: "red" };
const setGreen = { bold: true, color: "green" };

// HELPER FUNCTION TO LOG A MESSAGE WITH STYLING
const logMessage = (message, styling = {}, borderStyling = {}) => {
  const border = "===========================================================";

  const defaultStyling = { bold: true, color: "yellow" };

  // MERGE THE DEFAULT STYLING WITH THE STYLING PASSED IN AS AN ARGUMENT (IF ANY)
  const appliedStyling = { ...defaultStyling, ...styling };
  const appliedBorderStyling = { ...defaultStyling, ...borderStyling };

  // REPLACE NUMBERS IN MESSAGE WITH MAGENTA-COLORED NUMBERS
  const magentaMessage = message.replace(/\d+/g, (match) =>
    chalk.magenta(match)
  );

  // APPLY THE STYLING TO THE MESSAGE AND BORDER
  const styledMessage =
    chalk[appliedStyling.color][appliedStyling.bold ? "bold" : "visible"](
      magentaMessage
    );
  const styledBorder =
    chalk[appliedBorderStyling.color][
      appliedBorderStyling.bold ? "bold" : "visible"
    ](border);

  // LOG THE STYLED MESSAGE TO THE CONSOLE
  console.log(styledBorder);
  console.log(styledMessage);
  console.log(styledBorder);
};

module.exports = { logMessage, setRed, setGreen };
