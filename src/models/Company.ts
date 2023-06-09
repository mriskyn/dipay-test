import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, "company_name is required"],
      minlength: 3,
      maxlength: 50,
      allowNull: false,
    },
    telephone_number: {
      type: String,
      minlength: 8,
      maxlength: 16,
      allowNull: true,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      minlength: 10,
      maxlength: 50,
      allowNull: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("companies", UserSchema);
