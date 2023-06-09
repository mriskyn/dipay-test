import * as mongoose from "mongoose";

const connectDB = (uri: string) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(uri);
};

export default connectDB;
