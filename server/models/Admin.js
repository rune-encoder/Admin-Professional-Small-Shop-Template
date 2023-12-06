const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const { adminLevels } = require("../utils/adminPermissions");

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  permission: {
    type: String,
    enum: Object.values(adminLevels),
    default: adminLevels.VIEWER,
  },
});

// |===== MIDDLEWARE =====|
// ENCRYPTS PASSWORD BEFORE SAVING TO DB
adminSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// |===== METHODS =====|
// METHOD TO COMPARE AND VALIDATE PASSWORD FOR LOGGING IN
adminSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Admin = model("Admin", adminSchema);

module.exports = Admin;
