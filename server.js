import { app } from "./app.js";

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server Running on Port ${process.env.PORT} in ${process.env.NODE_ENV} server`);
});

