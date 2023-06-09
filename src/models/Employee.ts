import * as mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 2,
      maxlength: 50,
      allowNull: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      minlength: 2,
      maxlength: 255,
      allowNull: false,
      validate: [validator.isEmail, "invalid email"],
    },
    phone_number: {
      type: String,
      default: null,
      minlength: 8,
      maxlength: 16,
      allowNull: true,
    },
    jobtitle: {
      type: String,
      enum: ["manager", "director", "staff"],
      default: "staff",
      allowNull: false,
    },
    companies: {
      type: mongoose.Types.ObjectId,
      ref: "companies",
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("employees", UserSchema);
