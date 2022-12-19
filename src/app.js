import express from "express";
import contactsRouter from "./routes/contacts.routes.js";
import indexRouter from "./routes/index.routes.js";

const app = express();

app.use(express.json());
app.use(indexRouter);
app.use("/api", contactsRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found Page",
  });
});

export default app;