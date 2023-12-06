const { ForbiddenError } = require("apollo-server-express");

// ADMIN PERMISSION LEVELS
// IMPORTANT FOR ADMIN MODEL: CHANGES WILL AFFECT ADMIN MODEL
const adminLevels = {
  OWNER: "owner",
  MANAGER: "manager",
  EDITOR: "editor",
  VIEWER: "viewer",
};

// CHECKS IF THE ADMIN HAS THE REQUIRED PERMISSION
const checkPermission = (admin, requiredPermission) => {
  // PERMISSION LEVEL HIERARCHY
  const permissionLevel = {
    owner: 1,
    manager: 2,
    editor: 3,
    viewer: 4,
  };

  // IF THE ADMIN'S PERMISSION LEVEL IS LOWER IN HIERARCHY (HIGHER NUMBER) THAN THE REQUIRED PERMISSION LEVEL, THROW AN ERROR
  // IF THE ADMIN'S PERMISSION LEVEL IS HIGHER IN HIERARCHY (LOWER NUMBER OR EQUAL) THAN THE REQUIRED PERMISSION LEVEL, ALLOW ACCESS
  if (permissionLevel[admin.permission] > permissionLevel[requiredPermission]) {
    throw new ForbiddenError("You are not authorized to perform this action");
  }
};

module.exports = {
  checkPermission,
  adminLevels,
};
