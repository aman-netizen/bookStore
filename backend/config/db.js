import mongoose from "mongoose";

// connect to mongodb

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => {
      console.log(`Mongodb Database Connected Successfully`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connect;
